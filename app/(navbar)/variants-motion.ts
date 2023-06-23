import { Variants } from "framer-motion";

// list variants
export const parentList: Variants = {
	open: {
		transition: {
			bounce: 0,
			delayChildren: 0.9,
			staggerChildren: 0.1,
		},
	},
	closed: {
		transition: {
			type: "spring",
			bounce: 0,
		},
	},
};
export const itemVariants: Variants = {
	open: {
		opacity: 1,
		x: 0,
		transition: { type: "spring", stiffness: 300, damping: 24 },
	},
	closed: { opacity: 0, x: -30, transition: { duration: 0.2 } },
};
