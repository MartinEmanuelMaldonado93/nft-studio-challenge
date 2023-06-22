"use client";
import { useEffect, useRef, useState } from "react";
import style from "./Navbar.module.scss";

export default function Navbar() {
	const ref = useRef<HTMLHeadingElement>(null);
	const [isScrolling, setIsScrolling] = useState(false);

	return (
		<header ref={ref} className={`${style.header}`}>
			<div className={style.header__menu}>
				<button className={style.header__menu_icon}>Menu</button>
				<button className={style.header__menu_title}>
					3 years of Nft studios
				</button>
			</div>
			<div className={style.header__logo_center}>NFT STUDIOS</div>
			<div className={style.header__wallet}>conect your wallet</div>
		</header>
	);
}

function ModalMenu() {
	return <div></div>;
}
