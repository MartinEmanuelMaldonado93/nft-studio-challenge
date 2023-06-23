"use client";
import { Object3DNode } from "@react-three/fiber";
import { Color, ShaderMaterial } from "three";
import { shaderMaterial } from "@react-three/drei";


export const PlaneShaderMaterial = shaderMaterial(
	{
		uAlpha: 0.5,
		uMultiplier: 42,
		uColorA: new Color(0x48a11d),
		uColorB: new Color(0x48a11d),
		uColorC: new Color(0x000000),
		uTime: 0,
	},
	`
			varying vec2 vUv;
			void main() {
				vUv = uv;//texture
				gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
			}
		`,
	`
			varying vec2 vUv;
			uniform float uMultiplier;
			uniform float uAlpha;
			uniform vec3 uColorA;
			uniform vec3 uColorB;
			uniform float uTime;

			void main() {
				vec2 mulvUv = mod(vUv * uMultiplier, 2.0);
				float strength = step(0.5, mod(mulvUv.y + uTime, 1.0)) * step(0.5, mod(mulvUv.x + uTime, 1.0));
				vec3 mixColor = mix(uColorA, uColorB, step(0.5, mulvUv.y) * step(0.5, mulvUv.x));
				gl_FragColor.rgba = vec4(mixColor, min(strength, uAlpha));
			}
		`
);

// class MyPlaneShaderMaterial extends ShaderMaterial  {}

declare module "@react-three/fiber" {
	interface ThreeElements {
		planeShaderMaterial: Object3DNode<
			typeof PlaneShaderMaterial,
			typeof PlaneShaderMaterial
		>;
	}
}
