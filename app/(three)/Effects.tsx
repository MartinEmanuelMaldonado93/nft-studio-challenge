import { useRef, useEffect } from "react";
import { GridHelper } from "three";
import { Object3DNode, extend } from "@react-three/fiber";

// Create our custom element
class CustomElement extends GridHelper {}

// Extend so the reconciler will learn about it
extend({ CustomElement });
// <customElement />
// Add types to ThreeElements elements so primitives pick up on it
declare module "@react-three/fiber" {
	interface ThreeElements {
		customElement: Object3DNode<CustomElement, typeof CustomElement>;
	}
}

// react-three-fiber will create your custom component and TypeScript will understand it
export default function Effects() {
	return (
		<>
			<customElement />
			<div>Effects</div>
		</>
	);
}
