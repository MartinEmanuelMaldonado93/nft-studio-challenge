import { useRef, useEffect } from "react";
import { GridHelper } from "three";
import { Object3DNode, extend } from "@react-three/fiber";
import {
	EffectComposer,
	DepthOfField,
	Vignette,
} from "@react-three/postprocessing";
import { useControls } from "leva";
import { BlendFunction } from "postprocessing";

export default function EffectsProcessing() {
	const config = useControls({
		focusDistance: 0,
		bokeScale: 1.2,
		height: 450,
		focalLength: 0.02,
	});
	return (
		<EffectComposer disableNormalPass>
			<DepthOfField
				focusDistance={config.focusDistance}
				focalLength={config.focalLength}
				bokehScale={config.bokeScale}
				height={config.height}
			/>
			<Vignette
				offset={0.5} // vignette offset
				darkness={0.5} // vignette darkness
				eskil={false} // Eskil's vignette technique
				blendFunction={BlendFunction.NORMAL} // blend mode
			/>
		</EffectComposer>
	);
}

// // Create our custom element
// class CustomElement extends GridHelper {}

// // Extend so the reconciler will learn about it
// extend({ CustomElement });
// // <customElement />
// // Add types to ThreeElements elements so primitives pick up on it
// declare module "@react-three/fiber" {
// 	interface ThreeElements {
// 		customElement: Object3DNode<CustomElement, typeof CustomElement>;
// 	}
// }
