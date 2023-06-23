"use client";
import { Loader, OrbitControls, PerformanceMonitor, Scroll, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Mesh } from "three";
import style from "./CanvasGallery.module.scss";
import { useControls } from "leva";
import { Corridor } from "./Corridor";
import ContainerImages from "./ContainerImages";

export default function CanvasGallery() {
	const canvasRef = useRef<HTMLCanvasElement>(null!);
	const [enabled, enable] = useState(true);

	return (
		<>
			<Canvas
				ref={canvasRef}
				className={style.canvas}
				camera={{ far: 500, fov: 80, position: [0, 0.5, 4] }}
				gl={{ antialias: true }}
			>
				<ambientLight intensity={0.01} />
				<fog attach="fog" args={[0x000000, 1, 9]} />
				<ScrollControls infinite>
					<Scroll>
						<Corridor />
						<ContainerImages />
					</Scroll>
				</ScrollControls>
				{/** If PerfMon detects a low framerate it will switch back to harsh shadows */}
				{/* <PerformanceMonitor onDecline={() => enable(false)} /> */}
				{/* <OrbitControls /> */}
			</Canvas>
			<Loader />
		</>
	);
}
