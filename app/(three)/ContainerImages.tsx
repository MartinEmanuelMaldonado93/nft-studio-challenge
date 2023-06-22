"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import {
	DoubleSide,
	Group,
	Mesh,
	MeshStandardMaterial,
	ShaderMaterial,
	TextureLoader,
	Vector3,
} from "three";
import { useControls } from "leva";
import { Html, Image, Plane, useScroll } from "@react-three/drei";
import useSWR, { useSWRConfig } from "swr";
import { Artwork_SR } from "./(types)/types";
import { artwork_data } from "./(constants)/data";
import style from "./container.module.scss";
import {
	DepthOfField,
	EffectComposer,
	Vignette,
} from "@react-three/postprocessing";
import { generateRandomPositions } from "./(helpers)";

const randomPos = generateRandomPositions({
	count: 20,
	rangeX: 4.5,
	rangeY: 1.5,
	rangeZ: 6,
});

export default function ContainerImages() {
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
	// 		const imgs: Artwork_sr[] = await data?.json();
	// 		console.log(imgs);
	// 	})();
	// }, [data]);

	const featured = artwork_data.slice(0, 10);
	const groupRef = useRef<Group>(null!);
	const scroll = useScroll();

	useFrame((state, delta) => {
		if (groupRef.current) {
			const prev = groupRef.current.position.z;
			// const zet = data.delta >0.
			// console.log(data.delta.toFixed(2), "prev", prev);
			groupRef.current.position.setZ(prev + scroll.delta);
			if (prev > 5) {
				groupRef.current.position.setZ(1);
			}
		}
	});

	return (
		<group ref={groupRef}>
			{randomPos.map((pos) => (
				<PlaneImage
					key={Math.random().toString()}
					img_url="/nft.jpg"
					pos={pos}
				/>
			))}
			{/* <gridHelper /> */}
		</group>
	);
}

function PlaneImage({ img_url, pos }: { img_url: string; pos: Vector3 }) {
	const colorMap = useLoader(TextureLoader, img_url);
	return (
		<mesh position={pos}>
			<planeBufferGeometry args={[0.6, 1, 1]} />
			<meshBasicMaterial map={colorMap} />
		</mesh>
	);
}
