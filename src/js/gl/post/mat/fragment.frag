#define MTAU 6.28318530718
precision highp float;

uniform float u_time;
// uniform sampler2D u_texture;
uniform float u_a_trans;
uniform float u_a_vel;
uniform float u_a_mv;


// RTs
uniform sampler2D u_current;
uniform sampler2D u_next;

varying vec2 v_uv;

// chunks
#include ../../mat/_/classic-perlin.glsl


void main() {
    // float osc = sin(u_a_trans * MTAU);
    float g_cent = smoothstep(.5, 0., (distance(vec2(.5), v_uv)));
    float ns = cnoise(vec3(v_uv * 10., u_time * .005));
    
    // >>>> mixing
    vec2 n_uv = v_uv + ns;
    vec2 uv1 = mix(v_uv, n_uv, u_a_trans + u_a_vel + u_a_mv);
    vec2 uv2 = mix(v_uv, n_uv, 1. - u_a_trans);

    // to texture
    vec4 curr = texture2D(u_current, uv1);
    vec4 next = texture2D(u_next, uv2);
    vec4 final = mix(curr, next, u_a_trans); // mix

    gl_FragColor.rgb = final.rgb;
    // gl_FragColor.rgb = vec3(osc);
    gl_FragColor.a = final.a;
}


/*
// >>>> mixing
vec2 n_uv = v_uv - (v_uv * ns * .2) * abs(0. * .05);
float _disp = u_a_trans;
float _power = .07;
float _mult = 3.;

vec2 uv1 = vec2(
    n_uv.x - (1.0 - _disp) * (cos(ns * _mult) * _power), 
    n_uv.y - (1.0 - _disp) * (sin(ns * _mult) * _power)
);

vec2 uv2 = vec2(
    n_uv.x + _disp * (cos(ns * _mult) * _power), 
    n_uv.y + _disp * (sin(ns * _mult) * _power)
);

*/