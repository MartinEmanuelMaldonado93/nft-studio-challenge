import { Vector3 } from "three";


const AMOUNT_PHOTOS = 20;
export const randomPos = generateRandomPositions({
	count: AMOUNT_PHOTOS,
	rangeX: 4.5,
	rangeY: 1.5,
	rangeZ: 6,
});


function generateRandomPositions({
	count,
	rangeX,
	rangeY,
	rangeZ,
}: {
	count: number;
	rangeX: number;
	rangeY: number;
	rangeZ: number;
}): Vector3[] {
	const positions: Vector3[] = [];

	for (let i = 0; i < count; i++) {
		const x = Math.random() * rangeX - rangeX / 2; //2.5
		const y = Math.random() * rangeY - 0.4; // 0.5 base floor
		const z = Math.random() * rangeZ + 1 - rangeZ / 2;

		positions.push(new Vector3(x, y, z));
	}
	return positions;
}
