import { motion } from 'framer-motion';

import { IPrize } from 'types/Wheel.type';

import c from './EmptyTicketsModal.module.scss';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';
import { useCallback, useEffect } from 'react';
import { setisCanWatchAd, setTickets } from 'store/reducers/userReducer';
import { FetchUser } from 'api/user';
import { useAdsgram } from 'hooks/useAdsGram';
import { ShowPromiseResult } from 'types/adsgram';
interface EmptyTicketsModalProps {
	closeModal: () => void;
}

const links = {
	path: 'https://t.me/testtappybird_bot',
	text: 'Hello world!',
};

function EmptyTicketsModal({ closeModal }: EmptyTicketsModalProps) {
	const handleBuy = (typeCoin: 'coin' | 'tappy') => {};
	const user = useAppSelector(state=>state.user.user)
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const ad_was_watched = async () => {
		try {
			const result = await FetchUser.ad_was_watched(user.id, user.sign);

			console.log('ad_was_watched request successful:', result);
			return result;
		} catch (error) {
			console.error('ad_was_watched request failed:', error);
		}
	};
	const onReward = useCallback(() => {
		ad_was_watched().then(json=>{
			dispatch(setisCanWatchAd(false))
			dispatch(setTickets(json.tickets))
		})
	  }, []);
	  const onError = useCallback((result: ShowPromiseResult) => {
		alert(JSON.stringify(result, null, 4));
	  }, []);
	
	const showAd = useAdsgram({ blockId: "1597", onReward, onError });
	const is_can_watch_ad = async()=>{
		try {
			const result = await FetchUser.is_can_watch_ad(user.id);

			console.log('is_can_watch_ad request successful:', result);
			return result;
		} catch (error) {
			console.error('is_can_watch_ad request failed:', error);
		}
	}
	useEffect(()=>{
		is_can_watch_ad().then(json=>{
			dispatch( setisCanWatchAd(json.is_ok))
		})
	  })
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className={c.modal}
		>
			<div className={c.modalContent}>
				<div className={c.modalContentSorry}>
					<h2 className={c.modalContentSorryTitle}>Sorry</h2>
					<span className={c.modalContentSorrySubtitle}>
						You don't have enough tickets
					</span>
				</div>
				<div className={c.modalContentActions}>
					<button
						className={c.modalContentActionsButton}
						onClick={() => {
						
							navigate('/shop')}}
					>
						buy for 1000000 $BIRDY
					</button>
		{/* 			<button
						className={c.modalContentActionsButton}
						onClick={() => {
							
							navigate('/shop')}}
					>
						buy for 5 $TAPPY
					</button> */}
					<a
						className={c.modalContentActionsButton}
						href={`https://telegram.me/share/url?url=${links.path}&text=${links.text}`}
					>
						<img src="/assets/earn-more/friend.png" alt="friend" />
						<span>Invite Friends</span>
					</a>
					
						{user.isCanWatchAd &&	<button
							className={c.modalContentActionsButton}
							onClick={showAd}
						>
							watch ads
						</button>}
				</div>
				<button className={c.modalContentButton} onClick={closeModal}>
					Okey
				</button>
			</div>
		</motion.div>
	);
}

export default EmptyTicketsModal;
