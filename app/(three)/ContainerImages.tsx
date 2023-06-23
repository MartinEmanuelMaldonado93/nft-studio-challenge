"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MeshProps, useFrame, useLoader } from "@react-three/fiber";
import { Color, Group, Mesh, TextureLoader, Vector3 } from "three";
import { useScroll } from "@react-three/drei";
import useSWR, { useSWRConfig } from "swr";
import { Artwork_SR } from "./(types)/types";
import { artwork_data } from "./(constants)/data";
import style from "./container.module.scss";
import { motion } from "framer-motion-3d";
import { getRandomPosition, randomPos } from "./(helpers)";

export default function ContainerImages() {
	const containerRef = useRef<Group>(null!);
	const scroll = useScroll();
	const [img, setImg] = useState<Artwork_SR[]>();
	const static_img = [
		"nft0.jpg",
		"nft1.jpg",
		"nft2.jpg",
		"nft3.jpg",
		"nft4.jpg",
		"nft5.jpg",
		"nft6.jpg",
	];
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

	return (
		<group ref={containerRef}>
			{static_img.map((url, i) => (
				<PlaneImage
					key={Math.random().toString()}
					img_url={url}
					pos={getRandomPosition()}
				/>
			))}
			{randomPos.map((pos, i) => (
				<PlaneImage
					key={Math.random().toString()}
					img_url="/nft0.jpg"
					pos={pos}
				/>
			))}
		</group>
	);
}

function PlaneImage({ img_url, pos }: { img_url: string; pos: Vector3 }) {
	const meshRef = useRef<MeshProps>(null!);
	const colorMap = useLoader(TextureLoader, img_url);
	const [isHovered, setHovered] = useState(false);
	const transparentColor = new Color(0xffffff);
	transparentColor.set(transparentColor.getHex() + "00"); // '00' para el canal alfa a 0 (transparente)

	return (
		<motion.mesh
			ref={meshRef}
			position={pos}
			rotation={[0, 0, pos.x < 0 ? 0.03 : -0.05]}
			onPointerOver={() => setHovered(true)}
			onPointerOut={() => setHovered(false)}
			whileTap={{ scale: 1.2 }}
			whileHover={{ rotateZ: 0 }}
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
