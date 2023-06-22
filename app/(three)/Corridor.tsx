"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
	DoubleSide,
	Group,
	Mesh,
	MeshStandardMaterial,
	ShaderMaterial,
} from "three";
import { useControls } from "leva";
import { OrbitControls, useScroll } from "@react-three/drei";
import ContainerImages from "./ContainerImages";

export function Corridor() {
	const groupRef = useRef<Group>(null!);
	const data = useScroll();

	useFrame((state, delta) => {
		if (groupRef.current) {
			const offset = data.offset.toFixed(2);
			const prev = groupRef.current.position.z;
			groupRef.current.position.setZ(Number(offset));
		}
	});

	useEffect(() => {
		/** Custom scroll event that inverts scroll direction effect */
		function Scroll(event: Event) {
			const { scrollTop, clientHeight, scrollHeight } = data.el;
			const diff = Math.floor(scrollTop + clientHeight) - scrollHeight;

			if (diff < 0 && diff > -1.5) {
				const damp = 1 - data.offset;
				data.el.scrollTop = data.offset = -damp;
			}
		}

		data.el.addEventListener("scroll", Scroll, {
			passive: true,
		});

		return () => data.el.removeEventListener("scroll", Scroll);
	}, []);

	// const { position } = useControls({
	// 	position: [0, 0, 0],
	// });

	const material = new ShaderMaterial({
		vertexShader: `
			varying vec2 vUv;
			void main() {
				vUv = uv;//texture
				gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
			}
		`,
		fragmentShader: `
			varying vec2 vUv;

			void main() {
				vec2 grid = fract( vUv * 15.0 );
				vec3 color = vec3( 0.6, 0.8, 0.8 );

				// from 0 to 1
				if (grid.x < 0.1 || grid.x > 0.9 
				|| grid.y < 0.1 || grid.y > 0.9) {
					color = vec3(0.1, 0.7, 0.02);
				}
				gl_FragColor = vec4(color, 0.7);
			}
		`,
	});
	const largeBottomTop = 6;
	const largeSides = 16;

	return (
		<>
			<group ref={groupRef}>
				{/* bottom */}
				<mesh
					material={material}
					position={[0, -1.5, 0]}
					rotation={[-(Math.PI / 2), 0, 0]}
				>
					<planeBufferGeometry args={[largeBottomTop, largeSides, 3]} />
				</mesh>
				{/* top */}
				<mesh
					material={material}
					position={[0, 1.5, 0]}
					rotation={[Math.PI / 2, 0, 0]}
				>
					<planeBufferGeometry args={[largeBottomTop, largeSides, 3]} />
				</mesh>
				{/* left */}
				<mesh
					material={material}
					rotation={[0, Math.PI / 2, 0]}
					position={[-3.0, 0, 0]}
				>
					<planeBufferGeometry args={[largeSides, 3, 3]} />
				</mesh>
				{/* right */}
				<mesh
					material={material}
					rotation={[0, -(Math.PI / 2), 0]}
					position={[3, 0, 0]}
				>
					<planeBufferGeometry args={[largeSides, 3, 3]} />
				</mesh>
			</group>
			{/* background - fixed */}
			<mesh material={material} rotation={[0, 0, 0]} position={[0, 0, -4]}>
				<planeBufferGeometry args={[6, 3, 3]} />
			</mesh>
			{/* <OrbitControls /> */}
		</>
	);
}
