import { SHOPLIST } from 'constants/cardsList';
import { EGGS_LIMITS } from 'constants/eggsSource';
import c from './ShopBody.module.scss';
import { FetchUser } from 'api/user';
import { useAppSelector } from 'store';
import {
	setisCanWatchAd,
	setIsHammer,
	setLimitExp,
	setTap,
	setTappyCoin,
	setTickets,
} from 'store/reducers/userReducer';
import { useAppDispatch } from 'store';
import { setLevel, changeExp, changeCoin } from 'store/reducers/userReducer';
import {
	changeIsModalInsufficientFunds,
	changeIsModalInvite,
	changeIsModalPaymentSuccess,
} from 'store/reducers/modalsReducer';
import { useCallback, useEffect, useState } from 'react';
import EggsEmptyModal from 'components/modals/EggsEmptyModal';
import classNames from 'classnames';

import { ShowPromiseResult } from 'types/adsgram';
import { useAdsgram } from 'hooks/useAdsGram';

function ShopBody() {
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
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.user);
	const [isEggsEmptyModal, setIsEggsEmptyModal] = useState(false);
	const buyShopItem = async (item_name: string, withCoin:boolean = false) => {
		try {
			const result = await FetchUser.buyShopItem(user.id, user.sign, item_name, withCoin);

			console.log('Minecoin request successful:', result);
			return result;
		} catch (error) {
			console.error('Minecoin request failed:', error);
		}
	};
	
	const is_can_watch_ad = async()=>{
		try {
			const result = await FetchUser.is_can_watch_ad(user.id);

			console.log('is_can_watch_ad request successful:', result);
			return result;
		} catch (error) {
			console.error('is_can_watch_ad request failed:', error);
		}
	}
	const ad_was_watched = async () => {
		try {
			const result = await FetchUser.ad_was_watched(user.id, user.sign);

			console.log('ad_was_watched request successful:', result);
			return result;
		} catch (error) {
			console.error('ad_was_watched request failed:', error);
		}
	};

	


	const buyShopItemHandler = (item_name: string, price: number,withCoin:boolean = false ) => {
		return async (event: React.MouseEvent<HTMLButtonElement>) => {
		
		  event.preventDefault();
		  
		  if (item_name.includes('random') || item_name.includes('wood') ||  item_name.includes('ticket')) {
			if (user.coin < price) {
			  dispatch(changeIsModalInsufficientFunds(true));
			  return;
			}
		  } else {
			if (user.balance_in_tappycoin < price) {
			  dispatch(changeIsModalInsufficientFunds(true));
			  return;
			}
		  }
	  
		  const result = await buyShopItem(item_name, withCoin).then((json) => {
			console.log(json);
			if (json) {
			  if (!(typeof json === 'object')) {
				setIsEggsEmptyModal(true);
				return;
			  }
			   if (!('coins' in json)) {
				setIsEggsEmptyModal(true);
				return;
			  }
			  dispatch(setTappyCoin(json.balance_in_tappycoin));
			  if (json.current_level_of_egg === 0) {
				dispatch(setLimitExp(EGGS_LIMITS.slice(-2)[0]['hp']));
			  } else {
				dispatch(setLimitExp(EGGS_LIMITS[json.current_level_of_egg - 1]['hp']));
			  }
			  dispatch(setTickets(json.tickets))
			  dispatch(changeExp(json.exp));
			  dispatch(setLevel(json.current_level_of_egg));
			  dispatch(changeCoin(json.coins));
			  if (item_name.includes('hammer')) {
				dispatch(setIsHammer(true));
			  }
			  dispatch(changeIsModalPaymentSuccess({ isOpen: true }));
			}
		  });
	  
		  // Optional: Do something with the result if needed
		  console.log(result);
		};
	  };
	  
	  useEffect(()=>{
		is_can_watch_ad().then(json=>{
			dispatch( setisCanWatchAd(json.is_ok))
		})
	  })
	return (
		<div className={c.shopBody}>
			{isEggsEmptyModal && (
				<EggsEmptyModal
					isOpen={isEggsEmptyModal}
					closeModal={() => setIsEggsEmptyModal(false)}
				/>
			)}
			{SHOPLIST.map((elem) => (
				<div
					className={classNames({
						[c.shopBodyCard]: true,
						[c.legendary]: elem.title.includes('legendary'),
						[c.exclusive]: elem.title.includes('exclusive'),
					})}
					key={elem.id}
				>
					<img src={elem.img} alt={elem.title} className={c.shopBodyCardImg} />
					<h3 className={c.shopBodyCardTitle}>{elem.title}</h3>
					<span className={c.shopBodyCardSubtitle}>{elem.subtitle}</span>
					<div className={c.shopBodyCardActions}>
						{elem.title != 'ticket' && <button
							type="button"
							className={c.shopBodyCardActionsButton}
							onClick={buyShopItemHandler(elem.title, parseInt(elem.price.toString()), false)}
						>
							<p className={c.shopBodyCardActionsButtonTxt}>
								{elem.price} {elem.isCoin ? '' : '$Tappy'}
							</p>
							{elem.isCoin && (
								<img
									src="/assets/coin.png"
									alt="coin"
									className={c.shopBodyCardActionsButtonImg}
								/>
							)}
						</button>}
						{elem.isFriend && (
							<>
								<button
									type="button"
									className={c.shopBodyCardActionsButton}
									onClick={buyShopItemHandler(elem.title, parseInt('1000000'), true)}
								>
									<p className={c.shopBodyCardActionsButtonTxt}>1 000 000</p>
									<img
										src="/assets/coin.png"
										alt="coin"
										className={c.shopBodyCardActionsButtonImg}
									/>
								</button>
								<button
									className={classNames({
										[c.shopBodyCardActionsButton]: true,
										[c.invite]: elem.isFriend,
									})}
									onClick={() => {
										dispatch(
											changeIsModalInvite({ isOpen: true, name: 'shop' })
										);
									}}
								>
									invite a friend
								</button>
							</>
						)}
					{elem.isForAd && user.isCanWatchAd && (
							<>

								<button
									className={classNames({
										[c.shopBodyCardActionsButton]: true,
										[c.invite]: elem.isFriend,
									})}
									onClick={showAd}
								>
									watch the ad
								</button>
							</>
						)}
					</div>
				</div>
			))}
		</div>
	);
}

export default ShopBody;
