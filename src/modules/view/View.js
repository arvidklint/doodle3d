import PicoGL from 'picogl'

import Camera from '../camera/Camera'

import vertexShaderSource from '../../shaders/vertex'
import fragmentShaderSource from '../../shaders/fragment'

import cubeGenerator from '../buffers/cubeGenerator'

import Part from '../part/Part'

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

    const vertices = cubeGenerator({
      size: 1,
      pivot: {
        x: 0.5,
        y: 0.5,
        z: 0.5,
      },
    })

    this.part = new Part({
      vertices,
    })

    this.run = this.run.bind(this)
    this.draw = this.draw.bind(this)
  }

  setBuffers(part) {
    const positions = this.app.createVertexBuffer(PicoGL.FLOAT, 3, new Float32Array(part.vertices))

    const vertexArray = this.app.createVertexArray()
      .vertexAttributeBuffer(0, positions)

    this.uniformBuffer = this.app.createUniformBuffer([
      PicoGL.FLOAT_MAT4,
      PicoGL.FLOAT_MAT4,
    ])


    this.modelBuffer = this.app.createUniformBuffer([
      PicoGL.FLOAT_MAT4,
    ])

    this.drawCall = this.app.createDrawCall(this.program, vertexArray)
      .uniformBlock('CameraUniforms', this.uniformBuffer)
      .uniformBlock('ModelUniforms', this.modelBuffer)
  }

  run() {
    this.app.clear()
    this.camera.update()
    this.draw(this.part)
    window.requestAnimationFrame(this.run)
  }

  draw(part) {
    this.setBuffers(part)

    this.uniformBuffer
      .set(0, this.camera.viewMatrix)
      .set(1, this.camera.projectionMatrix)
      .update()
    
    this.modelBuffer
      .set(0, part.transform.matrix)
      .update()

    this.drawCall.draw()

    if(part.child) {
      this.draw(part.child)
    }
  }
}

export default View
