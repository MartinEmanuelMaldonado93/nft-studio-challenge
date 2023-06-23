"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import {
	Color,
	Group,
	TextureLoader,
	Vector3,
} from "three";
import { useScroll } from "@react-three/drei";
import useSWR, { useSWRConfig } from "swr";
import { Artwork_SR } from "./(types)/types";
import { artwork_data } from "./(constants)/data";
import style from "./container.module.scss";
import { motion } from "framer-motion-3d";
import { randomPos } from "./(helpers)";

export default function ContainerImages() {
	const groupRef = useRef<Group>(null!);
	const scroll = useScroll();
	const [img, setImg] = useState<Artwork_SR[]>();
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
		if (groupRef.current) {
			const prev = groupRef.current.position.z;
			groupRef.current.position.setZ(prev + scroll.delta);
			if (prev > 5) {
				groupRef.current.position.setZ(1);
			}
		}
	});

	return (
		<group ref={groupRef}>
			{randomPos.map((pos, i) => (
				<PlaneImage
					key={Math.random().toString()}
					img_url="/nft.jpg"
					pos={pos}
				/>
			))}
		</group>
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
			onPointerOver={() => setHovered(true)}
			onPointerOut={() => setHovered(false)}
			whileTap={{ scale: 1.2 }}
		>
			<planeBufferGeometry args={[0.6, 1, 1]} />
			<motion.meshBasicMaterial
				map={colorMap}
				color={isHovered ? "hotpink" : transparentColor}
			/>
		</motion.mesh>
	);
}
