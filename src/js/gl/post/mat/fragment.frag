precision highp float;

uniform float u_time;
// uniform sampler2D u_texture;
uniform float u_a_trans;

// RTs
uniform sampler2D u_current;
uniform sampler2D u_next;


varying vec2 v_uv;

void main() {

    // to texture
    vec4 curr = texture2D(u_current, v_uv);
    vec4 next = texture2D(u_next, v_uv);

    // mix
    // vec4 final = curr + next;
    vec4 final = mix(curr, next, u_a_trans);

    gl_FragColor.rgb = final.rgb;
    gl_FragColor.a = final.a;
}
