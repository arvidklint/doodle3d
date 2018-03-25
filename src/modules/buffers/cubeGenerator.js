export default function cubeGenerator({
  size,
  pivot = {
    x: 0,
    y: 0,
    z: 0,
  }
}) {

  const px = -pivot.x / size
  const py = -pivot.y / size
  const pz = -pivot.z / size

  const leftBottomFront = [0 + px, 0 + py, 0 + pz]
  const rightBottomFront = [size + px, 0 + py, 0 + pz]
  const leftTopFront = [0 + px, size + py, 0 + pz]
  const rightTopFront = [size + px, size + py, 0 + pz]

  const leftBottomBack = [0 + px, 0 + py, -size + pz]
  const rightBottomBack = [size + px, 0 + py, -size + pz]
  const leftTopBack = [0 + px, size + py, -size + pz]
  const rightTopBack = [size + px, size + py, -size + pz]

  return new Float32Array([
    // front
    ...leftBottomFront,
    ...rightBottomFront,
    ...leftTopFront,
    ...leftTopFront,
    ...rightBottomFront,
    ...rightTopFront,
    // left
    ...leftBottomBack,
    ...leftBottomFront,
    ...leftTopFront,
    ...leftTopBack,
    ...leftBottomBack,
    ...leftTopFront,
    // right
    ...rightTopFront,
    ...rightBottomFront,
    ...rightTopBack,
    ...rightBottomFront,
    ...rightBottomBack,
    ...rightTopBack,
    // back
    ...rightBottomBack,
    ...leftBottomBack,
    ...leftTopBack,
    ...rightBottomBack,
    ...leftTopBack,
    ...rightTopBack,
  ])
}
