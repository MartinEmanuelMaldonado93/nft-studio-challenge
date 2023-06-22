import styles from "./page.module.scss";
import CanvasGallery from "./(three)/CanvasGallery";

export default function Home() {
	return (
		<main className={styles.main}>
			<CanvasGallery />
			{/* <div
				id="container"
				style={{
					position: "absolute",
					height: "100%",
					width: "100%",
					overflow: "auto scroll",
				}}
			></div> */}
		</main>
	);
}
