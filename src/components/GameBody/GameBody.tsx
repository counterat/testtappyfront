import { TouchEvent, useCallback, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import YourSquad from 'components/YourSquad';
import { useAppSelector } from 'store';
import { EGGS } from 'constants/eggsSource';

import c from './GameBody.module.scss';

interface GameBodyProps {
	handleClickEgg: (e: TouchEvent<HTMLDivElement>) => void;
}

function GameBody({ handleClickEgg }: GameBodyProps) {
	const { exp, level, limitExp } = useAppSelector((state) => state.user.user);
	const controls = useAnimation();
	const wrapperRef = useRef<HTMLDivElement>(null);

	const handleClick = async (e: TouchEvent<HTMLDivElement>) => {
		e.preventDefault();
		handleClickEgg(e);

		await controls.start({
			rotate: [0, 0, 5, -5, 0],
			scale: [1, 0.9, 0.93, 0.95, 1],
			transition: { duration: 0.4, repeat: 0 },
		});
	};

	useEffect(() => {
		const handleTouchStart = (event: TouchEvent) => {
			if (
				wrapperRef.current &&
				wrapperRef.current.contains(event.target as Node)
			) {
				event.preventDefault();
			}
		};
		const handleTouchMove = (event: TouchEvent) => {
			if (
				wrapperRef.current &&
				wrapperRef.current.contains(event.target as Node)
			) {
				event.preventDefault();
			}
		};

		const handleTouchEnd = (event: TouchEvent) => {
			if (
				wrapperRef.current &&
				wrapperRef.current.contains(event.target as Node)
			) {
				event.preventDefault();
			}
		};

		window.addEventListener(
			'touchstart',
			handleTouchStart as unknown as EventListener,
			{
				passive: false,
			}
		);
		window.addEventListener(
			'touchmove',
			handleTouchMove as unknown as EventListener,
			{ passive: false }
		);
		window.addEventListener(
			'touchend',
			handleTouchEnd as unknown as EventListener,
			{ passive: false }
		);

		return () => {
			window.removeEventListener(
				'touchstart',
				handleTouchStart as unknown as EventListener
			);
			window.removeEventListener(
				'touchmove',
				handleTouchMove as unknown as EventListener
			);
			window.removeEventListener(
				'touchend',
				handleTouchEnd as unknown as EventListener
			);
		};
	}, [exp]);

	const getImageToShow = useCallback(() => {
		let eggs;
		if (level == 0){
			 eggs = EGGS.slice(-2)[0]
		}
		else{
		 eggs = EGGS[level - 1];}
		const checkDamage = (exp * 100) / limitExp;
		console.log([level-1, eggs])
		if (checkDamage === 0) {
			return <img src={eggs.egg1} alt="Image 1" className={c.bodyEggImg} />;
		} else if (checkDamage > 0 && checkDamage < 25) {
			return <img src={eggs.egg2} alt="Image 2" className={c.bodyEggImg} />;
		} else if (checkDamage >= 25 && checkDamage < 75) {
			return <img src={eggs.egg3} alt="Image 3" className={c.bodyEggImg} />;
		} else if (checkDamage >= 75 && checkDamage < 100) {
			return <img src={eggs.egg4} alt="Image 4" className={c.bodyEggImg} />;
		} else {
			return <img src={eggs.egg5} alt="Image 5" className={c.bodyEggImg} />;
		}
	}, [exp, level, limitExp]);

	return (
		<div className={c.body}>
			<div className={c.bodyEggLvl}>
				<h2 className={c.bodyEggLvlTitle}>{level == 0 ? 'EXCLUSIVE EGG' :  (level == 8 ?  'LEGENDARY EGG' :  `EGG LVL ${level}`)}</h2>
				<div className={c.bodyEggLvlExpBar} data-count={`${exp}`}>
					<div
						className={c.bodyEggLvlExpBarStrip}
						style={{ width: `${(exp * 100) / limitExp}%` }}
					/>
					<div className={c.bodyEggLvlExpBarTxt}>
						{exp}/{limitExp}
					</div>
				</div>
			</div>
			<motion.div
				animate={controls}
				className={c.bodyEgg}
				onTouchEnd={handleClick}
				ref={wrapperRef}
			>
				{getImageToShow()}
			</motion.div>
			<YourSquad isLinked />
		</div>
	);
}

export default GameBody;
