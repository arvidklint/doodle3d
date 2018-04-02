import {
  vec3,
  mat4,
} from 'gl-matrix'

const defaultParams = {
  x: 0,
  y: 0,
  z: 0,
}

class Transform {
  constructor(inputParams) {
    const finalParams = {
      ...defaultParams,
      ...inputParams,
    }

    const {
      x,
      y,
      z,
      matrix,
    } = finalParams

    if (matrix) {
      this.matrix = matrix
    } else {
      const position = vec3.fromValues(x, y, z)
      this.matrix = mat4.create()
      mat4.fromTranslation(this.matrix, position)
    }
  }

  translate(x, y, z) {
    const delta = vec3.fromValues(x, y, z)
    mat4.translate(this.matrix, this.matrix, delta)
  }

  get position() {
    const t = vec3.create()
    mat4.getTranslation(t, this.matrix)
    return t
  }

  rotateY(value) {
    mat4.rotateY(this.matrix, this.matrix, value)
  }

  lookAt(x, y, z) {
    console.log(this.matrix)
    console.log(this.position)
    const la = mat4.create()
    mat4.targetTo(this.matrix, this.position, vec3.fromValues(x, y, z), vec3.fromValues(0, 1, 0))
    console.log(la)
    // mat4.multiply(this.matrix, la, this.matrix)
    console.log(this.position)
    console.log(this.matrix)
  }

  get invert() {
    const inverted = mat4.create()
    mat4.invert(inverted, this.matrix)
    return inverted
  }

  copy() {
    const t = mat4.clone(this.matrix)
    return new Transform({
      matrix: t,
    })
  }
}

export default Transform
