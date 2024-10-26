import { TouchEvent, useCallback, useEffect, useState } from 'react';
import {
	changeSquad,
	setIsHammer,
	setPhotoUrl,
	setSign,
	setTap,
	setUserId,
	setUsername,
} from 'store/reducers/userReducer';
import GameHeader from 'components/GameHeader';
import GameBody from 'components/GameBody';
import GameFooter from 'components/GameFooter';
import { useAppDispatch, useAppSelector } from 'store';
import { useRef } from 'react';
import { setLeaders } from 'store/reducers/userleadersReducer';
import { setFriends } from 'store/reducers/friendsReducer';
import EggsEmptyModal from 'components/modals/EggsEmptyModal';
import {
	setTickets,
	setBoosters,
	setHammers,
	changeCoin,
	changeEnergy,
	changeExp,
	changeLevel,
	setTappyCoin,
	setLimitenergy,
	setLevel,
	setLimitExp,
	setCompletedtasks,
	setInviteLink,
	setUsersBirds,
} from 'store/reducers/userReducer';
import { FetchUser } from 'api/user';
import { setTasks } from 'store/reducers/tasksReducer';
import 'styles/damage.scss';
import c from './GamePage.module.scss';
import ConfirmBirdModal from 'components/modals/ConfirmBirdModal';
import { EGGS_LIMITS } from 'constants/eggsSource';
import { setBirds } from 'store/reducers/inventoryReducer';
import { testBird } from 'constants/cardsList';
import { setSquads } from 'store/reducers/squadsReducer';
import { socket } from 'index';
import TopUpModal from 'components/TopUpModal/TopUpModal';
import { useNavigate } from 'react-router-dom';
import { addTap, setTaps } from 'store/reducers/tapsReducer';
import TapBotModal from 'components/modals/TapBotModal';
import {
	changeIsModalDailyReward,
	changeIsModalTapBot,
} from 'store/reducers/modalsReducer';
import DailyRewardModal from 'components/modals/DailyRewardModal';

interface GamePageProps {
	
}

function GamePage() {
	const dispatch = useAppDispatch();
	const [tapbotcoins, settapbotcoins] = useState(0)
	const { user } = useAppSelector((state) => state.user);
	const [isGotref, setIsGotRef] = useState(false);
	const { tasks } = useAppSelector((state) => state.tasks);
	const [isEggsEmptyModal, setIsEggsEmptyModal] = useState(false);
	const navigate = useNavigate();
	const userLeaders = useAppSelector((state) => state.userLeaders);
	const { tap } = useAppSelector((state) => state.tap);
	const tapRef = useRef(tap)
	useEffect(() => {
		tapRef.current = tap;
		console.log(tapRef)
	  }, [tap]);
	const [streak, setStreak] = useState(0)
	const { friends } = useAppSelector((state) => state.friends);
	const { isModalTapBot, isModalDailyReward } = useAppSelector(
		(state) => state.modals
	);
	console.log(userLeaders.leaders);
	const [confirmItem, setConfirmItem] = useState(false);
	const [userData, setUserData] = useState(null);
	let invitCode: number = 0;
	if (window.location.pathname.includes('/game/')) {
		invitCode = Number(window.location.pathname.split('/game/')[1]);
	}
	const [newBird, setNewBird] = useState({
		id: 1,
		src: '/assets/inventory/Exclusive_1.jpg',
		title: 'Bird #1',
		tier: 'Exclusive',
	});
	const [isConnected, setIsConnected] = useState(false);
	const fetchTasksForGeo = async (userId: number, sign: string) => {
		try {
			const result = await FetchUser.fetchTasksForGeo(userId, sign);

			console.log('fetchTasksForGeo successful:', result);
			return result;
		} catch (error) {
			console.error('fetchTasksForGeo failed:', error);
		}
	};

	console.log(user);
	if (user.id != 0 && tasks.length == 0) {
		fetchTasksForGeo(user.id, user.sign).then((json) => {
			console.log(json);
			dispatch(setTasks(json));
		});
	}

	const showDamage = useCallback(
		(coords: { coordX: number; coordY: number }, tap: number) => {
			const damage = document.createElement('div');
			damage.classList.add(`damage`);
			damage.textContent = `+${tap}`;
			damage.style.top = `${coords.coordY - 10}px`;
			damage.style.left = `${coords.coordX - 10}px`;
			document.body.append(damage);

			setTimeout(() => {
				damage.remove();
			}, 1000);
		},
		[]
	);
	const fetchMinecoin = async (
		userId: number,
		taps: number,
		isIgnoreHammer: boolean = false
	) => {
		try {
			const result = await FetchUser.Minecoin(userId, taps, isIgnoreHammer);

			console.log('Minecoin request successful:', result);
			return result;
		} catch (error) {
			console.error('Minecoin request failed:', error);
		}
	};
	const realTap = (
		coords: { coordX: number; coordY: number },
		isIgnoreHammer: boolean = false, showCords: boolean = true
	) => {
		fetchMinecoin(user.id, tapRef.current , isIgnoreHammer).then((json) => {
			if (json.new_bird) {
				setNewBird(json.new_bird);
				dispatch(setUsersBirds([...user.birds, json.new_bird]));
				setConfirmItem(true);
				if (json.current_level_of_egg > 6){
					setIsEggsEmptyModal(true);
				}
				
				if (json.current_level_of_egg == 0) {
					dispatch(setLimitExp(EGGS_LIMITS.slice(-2)[0]['hp']));
				} else {
					dispatch(
						setLimitExp(EGGS_LIMITS[json.current_level_of_egg - 1]['hp'])
					);
				}
				dispatch(setLevel(json.current_level_of_egg));
			}
			if (json == 'buy egg') {
				setIsEggsEmptyModal(true);
				return;
			}
			if (!json) {
				return;
			}

			console.log(json);
			if (showCords){
			if (user.isHammer && !isIgnoreHammer) {
				showDamage(coords, json.brds_for_tap);
			} else {
				showDamage(coords, user.tap);
			}}
			dispatch(changeEnergy(json.energy));
			if (
				json.current_level_of_egg > user.level ||
				json.current_level_of_egg == 6
			) {
				

				dispatch(changeExp(json.exp));
				dispatch(changeCoin(json.coins));
				return;
			}
			/* 	if (user.exp >= user.limitExp - user.tap) {
		dispatch(changeExp(user.limitExp));
		setConfirmItem(true);
		return;
	} */
			window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
			if (json.current_level_of_egg > 1) {
				dispatch(changeExp(json.exp));
			} else {
				dispatch(changeExp(json.exp));
			}
			dispatch(changeCoin(json.coins));
		});
	};
	const handleClickEgg = useCallback(
		(e: TouchEvent<HTMLDivElement>) => {
			if (user.energy === 0) return;
	/* 		if (user.level === 7 && user.exp >= user.limitExp - user.tap) {
				dispatch(changeExp(user.limitExp));
				setIsEggsEmptyModal(true);
				return;
			} */
			const coords = {
				coordX: e.changedTouches[0].pageX,
				coordY: e.changedTouches[0].pageY,
			};

			if ( user.isHammer) {
				
				
					const resultFromHamemr = realTap(coords);
					dispatch(setIsHammer(false));
				
			} else {
				if (user.energy - user.tap <= 0) return;
				if (user.level === 7 && user.exp >= user.limitExp - user.tap) {
			/* 		dispatch(changeExp(user.limitExp));
					setIsEggsEmptyModal(true);
					return; */
				}

				window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
				const coords = {
					coordX: e.changedTouches[0].pageX,
					coordY: e.changedTouches[0].pageY,
				};
				showDamage(coords, user.tap);

				
				dispatch(addTap());
				if (user.exp >= user.limitExp - user.tap) {
					const result = realTap(coords);
					return;
				}

				dispatch(changeExp(user.exp + user.tap));
				dispatch(changeEnergy(user.energy - user.tap));
				dispatch(changeCoin(user.coin + user.tap));

				console.log(tap)
			}
			
		},
		[user]
	);
	useEffect(() => {
		const intervalId = setInterval(() => {
			if (tapRef.current > 0){
			const result = realTap({ coordX: 1, coordY: 1 }, true, false);
			dispatch(setTaps(0));
			console.log('Result:', result);}
		  }, 4000);
	  
		  // Очистка интервала при размонтировании компонента
		  return () => clearInterval(intervalId);
	  }, [user.id]);
	useEffect(() => {
		window.addEventListener('beforeunload', function (event) {
			// Создаем запрос
			fetch('https://api.tappybrd.com/disconnect_ws', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					sign: user.sign, // Здесь должна быть реальная подпись
					user_id: user.id, // Здесь должен быть реальный user_id
				}),
			}).catch((error) => console.error('Ошибка при отправке запроса:', error));

			// Для некоторых браузеров требуется вернуть значение, чтобы показать диалоговое окно подтверждения
			var confirmationMessage = 'Are you sure you want to leave?';
			event.returnValue = confirmationMessage;
			return confirmationMessage;
		});
		socket.onmessage = function (event) {
			let data = event.data;

			data = JSON.parse(data);
			if (data.eventname == 'ping') {
				console.log(data);
				if (data.userId == user.id) {
					socket.send(
						JSON.stringify({
							eventname: 'pong',
							userId: user.id,
						})
					);
				}
			}
			/* if (data.eventname == 'energy_replenishment'){
				console.log('energy_replenishment')
				console.log(data)
				console.log([data.id, user.id, data.id==user.id])
				if (data.id==user.id){
					console.log([data.id, user.id])
					dispatch(changeEnergy(data.energy))
					console.log(data)
				}
			} */
		};
		const fetchAuthorization = async (initdata: string, invcitCode: number) => {
			try {
				const result = await FetchUser.authorize(initdata, invcitCode);

				console.log('Authorization successful:', result);
				return result;
			} catch (error) {
				console.error('Authorization failed:', error);
			}
		};
		const fetchSquadLeaders = async () => {
			try {
				const result = await FetchUser.getSquadsLeaderboard();

				console.log('Authorization successful:', result);
				return result;
			} catch (error) {
				console.error('Authorization failed:', error);
			}
		};

		const fetchUserLeaders = async () => {
			try {
				const result = await FetchUser.getUsersLeaderboard();

				console.log('Authorization successful:', result);
				return result;
			} catch (error) {
				console.error('Authorization failed:', error);
			}
		};

		const getRefs = async (userId: number) => {
			try {
				const result = await FetchUser.getRefs(userId);

				console.log('Authorization successful:', result);
				return result;
			} catch (error) {
				console.error('Authorization failed:', error);
			}
		};

		if (user.id == 0) {
			fetchSquadLeaders().then((json) => {
				dispatch(setSquads(json));
			});

			fetchUserLeaders().then((json) => {
				console.log(json);
				dispatch(setLeaders(json));
			});
			var WebApp = window.Telegram.WebApp;
			console.log([WebApp.initDataUnsafe, 'haha'])
			if (invitCode == 0 && WebApp.initDataUnsafe.start_param){
				invitCode = parseInt(WebApp.initDataUnsafe.start_param)
			}
			const result = fetchAuthorization(WebApp.initData, invitCode).then(
				(json) => {
					if (json) {
						dispatch(setPhotoUrl(json.photo_url));
						dispatch(setUsername(json.name));
						dispatch(setUsersBirds(json.birds));
						dispatch(setUserId(json.id));
						dispatch(setInviteLink(json.invite_link));
						dispatch(setSign(json.sign));
						dispatch(changeCoin(json.coins));
						if (json.dr != undefined){
						
							setStreak(json.dr)
							dispatch(changeIsModalDailyReward(true))
						}
						var tap =
							Object.keys(json.boosters.multitap).length > 0
								? 1 + json.boosters.multitap.buff_level
								: 1;
						dispatch(setTap(tap));
						dispatch(setTickets(json.tickets))
						dispatch(setBoosters(json.boosters));
						dispatch(setHammers(json.hammers));
						dispatch(changeEnergy(json.energy));
						if (json.current_level_of_egg == 0) {
							dispatch(setLimitExp(EGGS_LIMITS.slice(-2)[0]['hp']));
						} else {
							dispatch(
								setLimitExp(EGGS_LIMITS[json.current_level_of_egg - 1]['hp'])
							);
						}
						dispatch(setLevel(json.current_level_of_egg));
						dispatch(changeSquad(json.in_squad));
						dispatch(setCompletedtasks(json.completed_tasks));
						dispatch(setTappyCoin(json.balance_in_tappycoin));
						dispatch(setLimitenergy(json.max_energy));
						if (json.coins_clicked) {
							settapbotcoins(json.coins_clicked)
							dispatch(changeIsModalTapBot(true))
						}
						if (json.current_level_of_egg > 1) {
							dispatch(changeExp(json.exp));
						} else {
							dispatch(changeExp(json.exp));
						}
						console.log(json.id);
					}
				}
			);
		} else {
			if (friends.length == 0 && !isGotref) {
				getRefs(user.id).then((json) => {
					setIsGotRef(true);
					if (json) {
						dispatch(setFriends(json));
						setIsConnected(true);
					}
				});
			}
		}
		const interval = setInterval(() => {
			if (user.energy !== user.limitEnergy) {
				if (user.energy > user.limitEnergy - 3) {
					dispatch(changeEnergy(user.limitEnergy));
					return () => clearInterval(interval);
				}
				/* 		dispatch(changeEnergy(user.energy + 3)); */
			}
		}, 1000);
		return () => {
			clearInterval(interval);
			socket.onmessage = null;
		};
	}, [user]);

	const [value, setValue] = useState('');
	const platform = Telegram.WebApp.platform;

	useEffect(() => {
		const interval = setInterval(() => {
			if (user.energy !== user.limitEnergy) {
				if (user.energy > user.limitEnergy - 6) {
					dispatch(changeEnergy(user.limitEnergy));
					return () => clearInterval(interval);
				}
				dispatch(changeEnergy(user.energy + 6));
			}
		}, 4000);
		return () => clearInterval(interval);
	}, [user]);
	return isConnected || user.id != 0 ? (
		<div className={c.container} style={{ backgroundImage: `url(/assets/level/back${user.level}.png)` }} onTouchEnd={(event) => event.preventDefault()}>
			<GameHeader />
			<GameBody handleClickEgg={handleClickEgg} />
			<GameFooter />
			{isEggsEmptyModal && (
				<EggsEmptyModal
					isOpen={isEggsEmptyModal}
					closeModal={() => setIsEggsEmptyModal(false)}
				/>
			)}
			{confirmItem && (
				<ConfirmBirdModal
					isOpenModal={confirmItem}
					bird={newBird}
					closeModal={() => {
						setConfirmItem(false);
						/* 	dispatch(changeExp(0)); */
						/* dispatch(changeLevel(user.level + 1)); */
						dispatch(setBirds(testBird[user.level - 1]));
					}}
				/>
			)}
			{isModalDailyReward && (
				<DailyRewardModal
					isOpen={isModalDailyReward}
					closeModal={() => dispatch(changeIsModalDailyReward(false))}
					streak={streak}
				/>
			)}
			{!isModalDailyReward && isModalTapBot && (
				<TapBotModal
					isOpen={isModalTapBot}
					coins={tapbotcoins}
					closeModal={() => dispatch(changeIsModalTapBot(false))}
				/>
			)}
		</div>
	) : (
		<div className={c.loadingWrapper}>
			<div className={c.loader}></div>
		</div>
	);
}

export default GamePage;
