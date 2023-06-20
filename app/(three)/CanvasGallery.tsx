"use client";
import { OrbitControls, Scroll, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Mesh } from "three";
import style from "./CanvasGallery.module.scss";
import { useControls } from "leva";
import { Corridor } from "./Corridor";

export default function CanvasGallery() {
	const canvasRef = useRef<HTMLCanvasElement>(null!);

	return (
		<Canvas
			ref={canvasRef}
			className={style.canvas}
			camera={{ far: 500, fov: 80, position: [0, 0.5, 4] }}
		>
			<ambientLight />
			<ScrollControls infinite>
				<Scroll>
					<Corridor />
				</Scroll>
			</ScrollControls>
		</Canvas>
	);
}
