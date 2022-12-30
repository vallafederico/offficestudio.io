#define MPI 3.1415926538
#define MTAU 6.28318530718

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

uniform float u_time;
varying float v_time;

varying vec3 v_normal;
varying vec3 v_view;
varying vec2 v_uv;


void main() {
  vec3 pos = position;


  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

  v_normal = normalize(normalMatrix * normal);
  v_view = normalize(- gl_Position.xyz);

  v_uv = uv;
  v_time = u_time;
}
