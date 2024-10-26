import { PRIZES } from 'constants/fortune';
import c from './WheelFortune.module.scss';
import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { setPrize } from 'store/reducers/wheelReducer';
import { changeIsModalPrize } from 'store/reducers/modalsReducer';
import { changeTicket, setLimitExp, setTickets } from 'store/reducers/userReducer';
import { FetchUser } from 'api/user';
import { setLevel, setTappyCoin, changeCoin, changeExp, } from 'store/reducers/userReducer';
import { setBirds } from 'store/reducers/squadLeadersReducer';
import { EGGS_LIMITS } from 'constants/eggsSource';


function WheelFortune() {
	const dispatch = useAppDispatch();
	const { ticket } = useAppSelector((state) => state.user.user);
	const { user } = useAppSelector(state=>state.user)
	const spinWheelHandler = async (userId: number, sign: string) => {
		try {
			const result = await FetchUser.spinWheel(userId, sign);

			console.log('spinWheel successful:', result);
			return result;
		} catch (error) {
			console.error('spinWheel failed:', error);
		}
	};

	const animationConfig = {
		animationsSpins: 5,
		animationTime: 5000,
		degreases: 360 / PRIZES.length,
	};
	const imageRef = useRef<HTMLDivElement>(null);
	const [currentPrize, setCurrentPrize] = useState(0);
	const [isSpinning, setIsSpinning] = useState(false);

	const easeInOut = (time: number) => {
		return 0.5 * (1 - Math.cos(Math.PI * time));
	};

	const startAnimation = (
		duration: number,
		callback: (value: number) => void,
		finish: () => void
	) => {
		let startAnimationTime: null | number = null;
		requestAnimationFrame(function measure(time) {
			if (!startAnimationTime) {
				startAnimationTime = time;
			}

			const progress = (time - startAnimationTime) / duration;

			callback(progress);

			if (progress < 1) {
				requestAnimationFrame(measure);
			} else {
				callback(1);
				finish();
			}
		});
	};

	const spin = (index: number) => {
		setIsSpinning(true);
		const segmentDegreases = animationConfig.degreases * index - 90;
		const randomDegreases = (animationConfig.degreases - 6) * Math.random() + 3;
		const animationRotate = 360 * animationConfig.animationsSpins;
		const rotate = -segmentDegreases - randomDegreases - animationRotate;
		startAnimation(
			animationConfig.animationTime,
			(progress) => {
				if (imageRef.current) {
					imageRef.current.style.transform = `rotate(${
						currentPrize + (rotate - currentPrize) * easeInOut(progress)
					}deg)`;
				}
			},
			() => {
				dispatch(changeIsModalPrize({ isOpen: true, isTicket: true }));
				setCurrentPrize(rotate % 360);
				setIsSpinning(false);
			}
		);
	};

	function getRandomIndex() {
		const totalWeight = PRIZES.reduce((sum, prize) => sum + prize.weight, 0);

		let randomNum = Math.random() * totalWeight;

		for (let i = 0; i < PRIZES.length; i++) {
			if (randomNum < PRIZES[i].weight) {
				return i;
			}
			randomNum -= PRIZES[i].weight;
		}
	}
	const handleClick = () => {
		if (ticket === 0) {
			dispatch(changeIsModalPrize({ isOpen: true }));
			return;
		}
		spinWheelHandler(user.id, user.sign).then(json=>{
			const index = json.prize
			if (index) {
				spin(index);
				dispatch(setPrize(index));
				dispatch(changeTicket());
				dispatch(setLevel(json.current_level_of_egg))
				dispatch(changeExp(json.exp))
				dispatch(changeCoin(json.coins))
				dispatch(setTappyCoin(json.balance_in_tappycoin))
				dispatch(setBirds(json.birds))
				dispatch(setTickets(json.tickets))
				if (json.current_level_of_egg === 0) {
					dispatch(setLimitExp(EGGS_LIMITS.slice(-2)[0]['hp']));
				}
				else{ 
				dispatch(setLimitExp( EGGS_LIMITS[json.current_level_of_egg - 1].hp))
				}
		}

		})
		
	};

	return (
		<div className={c.wheel}>
			<div className={c.wheelFortune}>
				<div className={c.wheelFortuneHead}>
					<img src="/assets/spin/fortune-head.png" alt="fortune-head" />
				</div>
				<div className={c.wheelFortuneArrow}>
					<img src="/assets/spin/arrow.png" alt="arrow fortune" />
				</div>
				<div className={c.wheelFortuneCircle}>
					<img src="/assets/spin/circle.png" alt="circle fortune" />
				</div>
				<div className={c.wheelFortuneImage} ref={imageRef}>
					<img src="/assets/spin//spinner.png" alt="spinner" />
				</div>
			</div>
			<button
				className={c.wheelButton}
				onClick={handleClick}
				disabled={isSpinning}
			>
				<span className={c.wheelButtonText}>Spin</span>
				<div className={c.wheelButtonLine} />
				<div className={c.wheelButtonTicket}>
					<img
						className={c.wheelButtonTicketImage}
						src="/assets/shop/rowTicket.png"
						alt="ticket"
					/>
					<span className={c.wheelButtonText}>1 TICKET</span>
				</div>
			</button>
		</div>
	);
}

export default WheelFortune;
