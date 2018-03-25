import PicoGL from 'picogl'

import Camera from '../camera/Camera'

import vertexShaderSource from '../../shaders/vertex'
import fragmentShaderSource from '../../shaders/fragment'

import cube from '../../obj/cube.obj'

class View {
  constructor(canvas) {
    this.canvas = canvas

    this.camera = new Camera({
      fov: 30,
      zNear: 1,
      zFar: 1000,
      aspect: this.canvas.clientWidth / this.canvas.clientHeight,
    })
    this.camera.translate(0, 0, 4)

    this.app = PicoGL.createApp(this.canvas).clearColor(0.0, 0.0, 0.0, 1.0).defaultViewport().depthTest()

    this.program = this.app.createProgram(vertexShaderSource, fragmentShaderSource)

    
    const positions = this.app.createVertexBuffer(PicoGL.FLOAT, 3, new Float32Array(cube.vertices))
    const normals = this.app.createVertexBuffer(PicoGL.FLOAT, 3, new Float32Array(cube.vertexNormals))
    const indices = this.app.createIndexBuffer(PicoGL.UNSIGNED_SHORT, 3, new Uint16Array(cube.indices))

    const vertexArray = this.app.createVertexArray()
      .vertexAttributeBuffer(0, positions)
      .vertexAttributeBuffer(1, normals)
      .indexBuffer(indices)

    this.uniformBuffer = this.app.createUniformBuffer([
      PicoGL.FLOAT_MAT4,
      PicoGL.FLOAT_MAT4,
    ])

    this.drawCall = this.app.createDrawCall(this.program, vertexArray)
      .uniformBlock('CameraUniforms', this.uniformBuffer)

    this.run = this.run.bind(this)
    this.draw = this.draw.bind(this)
  }

  run() {
    this.draw()
    window.requestAnimationFrame(this.run)
  }

  draw() {
    this.camera.update()
    this.app.clear()

    this.uniformBuffer
      .set(0, this.camera.viewMatrix)
      .set(1, this.camera.projectionMatrix)
      .update()

    this.drawCall.draw()
  }
}

export default View
