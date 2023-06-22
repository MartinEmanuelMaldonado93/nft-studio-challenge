import styles from "./page.module.scss";
import CanvasGallery from "./(three)/CanvasGallery";
import Navbar from "./(navbar)/Navbar";

export default function Home() {
	return (
		<main className={styles.main}>
			<Navbar />
			<CanvasGallery />
		</main>
	);
}
