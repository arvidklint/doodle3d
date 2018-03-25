export default `#version 300 es

layout(location=0) in vec4 position;

layout(std140) uniform CameraUniforms {
  mat4 viewMatrix;
  mat4 projectionMatrix;
};

layout(std140) uniform ModelUniforms {
  mat4 modelViewMatrix;
};

void main() {
  gl_Position = projectionMatrix * viewMatrix * modelViewMatrix * position;
}
`
