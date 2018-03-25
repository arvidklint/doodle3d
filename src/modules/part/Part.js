import Transform from '../transform/Transform'

class Part {
  constructor({
    vertices,
    recursionCount = 10,
    transform,
  }) {
    this.transform = transform || new Transform()
    this.vertices = vertices
    if (recursionCount > 0) {
      const newTransform = this.transform.copy()
      newTransform.translate(0.1, 0.1, 0)
      this.child = new Part({
        vertices,
        recursionCount: recursionCount - 1,
        transform: newTransform,
      })
    }

    this.getVertices = this.getVertices.bind(this)
  }

  getVertices() {
    if (this.child) {
      return new Float32Array([
        ...this.vertices,
        ...this.child.getVertices(),
      ])
    } else {
      return this.vertices
    }
  }
}

export default Part
