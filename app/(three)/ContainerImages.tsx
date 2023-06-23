"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Color, Group, TextureLoader, Vector3 } from "three";
import { useScroll, FaceLandmarker, FaceControls, FaceControlsApi } from "@react-three/drei";
import useSWR, { useSWRConfig } from "swr";
import { Artwork_SR } from "./(types)/types";
import { artwork_data } from "./(constants)/data";
import style from "./container.module.scss";
import { motion } from "framer-motion-3d";
import { randomPos } from "./(helpers)";
import { useControls } from "leva";

export default function ContainerImages() {
	const containerRef = useRef<Group>(null!);
	const scroll = useScroll();
	const [img, setImg] = useState<Artwork_SR[]>();
	const faceRef = useRef<FaceControlsApi>(null!);

	// const { data, error, isLoading } = useSWR("artists", () =>
	// 	fetch(
	// 		"https://most-expensive-nft-artworks.p.rapidapi.com/artworks?page=1&sort=usd_price",
	// 		{
	// 			method: "GET",
	// 			headers: {
	// 				"X-RapidAPI-Key":
	// 					"617e3a44bfmsh068af74f6f9a92bp19a375jsn678322e5767d",
	// 				"X-RapidAPI-Host": "most-expensive-nft-artworks.p.rapidapi.com",
	// 			},
	// 		}
	// 	)
	// );

	// useEffect(() => {
	// 	(async () => {
	// 		const imgs: Artwork_SR[] = await data?.json();
	// 		img && setImg(img);
	// 		console.log(imgs);
	// 	})();
	// }, [data]);

	useFrame((state, delta) => {
		if (containerRef.current) {
			const prev = containerRef.current.position.z;
			containerRef.current.position.setZ(prev + scroll.delta);
			if (prev > 5) {
				containerRef.current.position.setZ(1);
			}
		}
	});
	
	useEffect(()=>{
		if(faceRef.current){
			// faceRef.current.computeTarget
		}
	},[]);
	
	const faceCtrl = useControls({
		webCam: false,
		offsetScalar: 120,
	});

	return (
		<FaceLandmarker>
			<group ref={containerRef}>
				{randomPos.map((pos, i) => (
					<PlaneImage
						key={Math.random().toString()}
						img_url="/nft.jpg"
						pos={pos}
					/>
				))}
			</group>
			<FaceControls
				ref={faceRef}
				webcam={faceCtrl.webCam}
				// autostart={false}
				// offset={false}
				offsetScalar={120}
			/>
		</FaceLandmarker>
	);
}

function PlaneImage({ img_url, pos }: { img_url: string; pos: Vector3 }) {
	const colorMap = useLoader(TextureLoader, img_url);
	const [isHovered, setHovered] = useState(false);
	const transparentColor = new Color(0xffffff);
	transparentColor.set(transparentColor.getHex() + "00"); // '00' para el canal alfa a 0 (transparente)

	return (
		<motion.mesh
			position={pos}
			rotation={[0, 0, pos.x < 0 ? 0.03 : -0.05]}
			onPointerOver={() => setHovered(true)}
			onPointerOut={() => setHovered(false)}
			whileTap={{ scale: 1.2 }}
			transition={{ damping: 4 }}
		>
			<planeBufferGeometry args={[0.6, 1, 1]} />
			<motion.meshBasicMaterial
				map={colorMap}
				color={isHovered ? "hotpink" : transparentColor}
				transition={{ stiffness: 50 }}
			/>
		</motion.mesh>
	);
}
