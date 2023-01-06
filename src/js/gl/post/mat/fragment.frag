#define MTAU 6.28318530718
precision highp float;

uniform float u_time;
// uniform sampler2D u_texture;
uniform float u_a_trans;
uniform float u_a_vel;
uniform float u_a_mv;
uniform float u_a_distort;


// RTs
uniform sampler2D u_current;
uniform sampler2D u_next;

varying vec2 v_uv;

const vec4 WHITE = vec4(.95, .95, .95, 1);
const vec4 DARK =  vec4(.05, .05, .05, 1);

// chunks
#include ../../mat/_/classic-perlin.glsl


void main() {
    // float osc = sin(u_a_trans * MTAU);
    float g_cent = smoothstep(.5, 0., (distance(vec2(.5), v_uv)));
    float ns = cnoise(vec3(v_uv * 10., u_time * .001));
    
    // >>>> mixing
    float DIST = u_a_distort * .5;
    float INF = u_a_vel + u_a_mv + DIST;
    vec2 n_uv = v_uv + ns * g_cent;
    vec2 uv1 = mix(v_uv, n_uv, u_a_trans + INF);
    vec2 uv2 = mix(v_uv, n_uv, 1. - u_a_trans);

    // to texture
    vec4 curr = texture2D(u_current, uv1);
    vec4 next = texture2D(u_next, uv2);
    vec4 final = mix(curr, next, u_a_trans); // mix

    final.rgb = mix(final, DARK, u_a_distort * .8).rgb;

    gl_FragColor.rgb = final.rgb;
    gl_FragColor.a = final.a;
}