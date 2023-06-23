"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import {
	Object3DNode,
	ShaderMaterialProps,
	extend,
	useFrame,
} from "@react-three/fiber";
import {
	Color,
	DoubleSide,
	Group,
	IUniform,
	Mesh,
	MeshStandardMaterial,
	ShaderMaterial,
	Vector3,
} from "three";
import { useControls } from "leva";
import {
	OrbitControls,
	Sparkles,
	shaderMaterial,
	useScroll,
} from "@react-three/drei";
import ContainerImages from "./ContainerImages";
import { PlaneShaderMaterial } from "./PlaneShaderMaterial";

extend({ PlaneShaderMaterial });

export function Corridor() {
	const corridorRef = useRef<Group>(null!);
	const shaderRef = useRef<any>(null!);
	const data = useScroll();

	useFrame((state, delta) => {
		if (corridorRef.current) {
			const offset = data.offset.toFixed(2);
			const prev = corridorRef.current.position.z;
			corridorRef.current.position.setZ(Number(offset));
		}
		if (shaderRef.current) {
			shaderRef.current.uTime = state.clock.elapsedTime;
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

	const stripesControls = useControls("stripes", {
		alpha: {
			min: 0,
			max: 1,
			value: 0.5,
		},
		multiplier: {
			min: 1,
			max: 142,
			value: 42,
		},
		colorA: "#48a11d",
		colorB: "#82f55c",
	});
	const sparklesControls = useControls("sparkles", {
		count: 100,
		speed: 1,
		opacity: 1,
		color: "white",
		scale: [3, 2, 5],
		position: [0, 0, 1],
	});
	const largeBottomTop = 6;
	const largeSides = 16;

	return (
		<>
			<group ref={corridorRef}>
				{/* bottom */}
				<mesh position={[0, -1.5, 0]} rotation={[-(Math.PI / 2), 0, 0]}>
					<planeBufferGeometry args={[largeBottomTop, largeSides, 3]} />
					<planeShaderMaterial
						//@ts-ignore
						uAlpha={stripesControls.alpha}
						uMultiplier={stripesControls.multiplier}
						uColorA={stripesControls.colorA}
						uColorB={stripesControls.colorB}
					/>
				</mesh>
				{/* top */}
				<mesh position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
					<planeShaderMaterial
						//@ts-ignore
						uAlpha={stripesControls.alpha}
						uMultiplier={stripesControls.multiplier}
						uColorA={stripesControls.colorA}
						uColorB={stripesControls.colorB}
					/>
					<planeBufferGeometry args={[largeBottomTop, largeSides, 3]} />
				</mesh>
				{/* left */}
				<mesh rotation={[0, Math.PI / 2, 0]} position={[-3.0, 0, 0]}>
					<planeShaderMaterial
						//@ts-ignore
						uAlpha={stripesControls.alpha}
						uMultiplier={stripesControls.multiplier}
						uColorA={stripesControls.colorA}
						uColorB={stripesControls.colorB}
					/>
					<planeBufferGeometry args={[largeSides, 3, 3]} />
				</mesh>
				{/* right */}
				<mesh rotation={[0, -(Math.PI / 2), 0]} position={[3, 0, 0]}>
					<planeShaderMaterial
						//@ts-ignore
						uAlpha={stripesControls.alpha}
						uMultiplier={stripesControls.multiplier}
						uColorA={stripesControls.colorA}
						uColorB={stripesControls.colorB}
					/>
					<planeBufferGeometry args={[largeSides, 3, 3]} />
				</mesh>
			</group>
			{/* background - fixed */}
			<mesh rotation={[0, 0, 0]} position={[0, 0, -4]}>
				<planeShaderMaterial
					//@ts-ignore
					uAlpha={stripesControls.alpha}
					uMultiplier={stripesControls.multiplier}
					uColorA={stripesControls.colorA}
					uColorB={stripesControls.colorB}
				/>
				<planeBufferGeometry args={[6, 3, 3]} />
			</mesh>
			<Sparkles
				color={sparklesControls.color}
				speed={sparklesControls.speed}
				count={sparklesControls.count}
				scale={[3, 2, 5]}
				position={[0, 0, 1]}
			/>
		</>
	);
}
