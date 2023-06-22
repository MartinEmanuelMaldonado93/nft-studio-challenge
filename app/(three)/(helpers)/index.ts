import { Vector3 } from "three";

export function generateRandomPositions({
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
