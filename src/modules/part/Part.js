import Transform from '../transform/Transform'

class Part {
  constructor({
    indices,
    normals,
    recursionCount = 10,
    transform,
    vertices,
  }) {
    this.transform = transform || new Transform()
    this.vertices = vertices
    this.normals = normals
    this.indices = indices
    if (recursionCount > 0) {
      const newTransform = this.transform.copy()
      newTransform.translate(0.1, 0.1, 0)
      this.child = new Part({
        indices,
        normals,
        recursionCount: recursionCount - 1,
        transform: newTransform,
        vertices,
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
