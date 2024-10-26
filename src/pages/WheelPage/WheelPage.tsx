import { Link} from 'react-router-dom';
import c from './WheelPage.module.scss';
import ArrowIcon from 'assets/icons/ArrowIcon';
import WheelFortune from 'components/WheelFortune';
import PrizeModal from 'components/modals/PrizeModal';
import { AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from 'store';
import { changeIsModalPrize } from 'store/reducers/modalsReducer';
import EmptyTicketsModal from 'components/modals/EmptyTicketsModal';
import { FetchUser } from 'api/user';
import { setSquads } from 'store/reducers/squadsReducer';
import { setLeaders } from 'store/reducers/userleadersReducer';
import { changeCoin, changeEnergy, changeExp, changeSquad, setBoosters, setCompletedtasks, setHammers, setInviteLink, setLevel, setLimitenergy, setLimitExp, setPhotoUrl, setSign, setTap, setTappyCoin, setTickets, setUserId, setUsername, setUsersBirds } from 'store/reducers/userReducer';
import { EGGS_LIMITS } from 'constants/eggsSource';
import { useState } from 'react';
import { setFriends } from 'store/reducers/friendsReducer';

function WheelPage() {
	const dispatch = useAppDispatch();
	const [isGotref, setIsGotRef] = useState(false);
	const { prize } = useAppSelector((state) => state.wheel);
	const { user } = useAppSelector((state) => state.user);
	const { isModalPrize } = useAppSelector((state) => state.modals);
	const { friends } = useAppSelector((state) => state.friends);
	const [isConnected, setIsConnected] = useState(false);
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
		let invitCode: number = 0;
		if (window.location.pathname.includes('/fortune/')) {
			invitCode = Number(window.location.pathname.split('/fortune/')[1]);
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

	return (
		<div className={c.container}>
			<div className={c.wheel}>
				<div className={c.wheelTicket}>
					<img src="/assets/shop/rowTicket.png" alt="ticket" />
					{user.ticket}
				</div>
				<WheelFortune />
				<Link className={c.wheelGoBack} to={'/game'}>
					<ArrowIcon /> Go Home
				</Link>
			</div>
			<AnimatePresence>
				{isModalPrize.isOpen && !isModalPrize.isTicket && (
					<EmptyTicketsModal
						closeModal={() => dispatch(changeIsModalPrize({ isOpen: false }))}
					/>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{isModalPrize.isOpen && isModalPrize.isTicket && prize && (
					<PrizeModal
						prize={prize}
						closeModal={() => dispatch(changeIsModalPrize({ isOpen: false }))}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}

export default WheelPage;
