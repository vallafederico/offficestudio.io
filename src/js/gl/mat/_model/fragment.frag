precision highp float;

uniform sampler2D u_mtc;
uniform sampler2D u_diffuse;

varying vec3 v_normal;
varying vec3 v_view;

varying vec2 v_uv;
varying vec4 v_color;
varying float v_time;

// animation
uniform float u_a_texture;
uniform float u_a_on;


void main() {

    // * lights
    vec3 h_sky = vec3(1., 1., 1.);
    vec3 h_ground = vec3(.1, .1, .1);
    vec3 h_dir = normalize(vec3(1., -1., 1.));
    vec3 hlight = mix(h_ground, h_sky, 1. - dot(h_dir, v_normal));
    // * matcap uvs
    vec3 x = normalize( vec3(v_view.z, 0., -v_view.x));
    vec3 y = cross(v_view, x);
    vec2 fakeUv = vec2( dot(x, v_normal), dot(y, v_normal)) * .495 + .5;

    // textures
    vec4 mtc = texture2D(u_mtc, fakeUv);
    mtc.rgb += hlight * .15; // light

    vec4 diffuse = texture2D(u_diffuse, v_uv).rgba;
    diffuse.rgb -= hlight * .1; // light
    diffuse.rgb += mtc.rgb; // light

    vec4 white_diff = diffuse.bbba;
    vec4 light_diff = diffuse.rrra;
    diffuse = mix(white_diff, light_diff, u_a_on);

    // final mix
    vec4 final = mix(mtc, diffuse, u_a_texture);




    // gl_FragColor.rgb = final.rgb;
    gl_FragColor.rgb = final.rgb;
    gl_FragColor.a = 1.0;
}
