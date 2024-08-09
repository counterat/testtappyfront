import { BOOSTLIST } from 'constants/cardsList';
import QuestionButton from 'components/QuestionButton';
import { formatCoin } from 'utils/formatCoin';
import { FetchUser } from 'api/user';
import c from './BoostBody.module.scss';
import { useAppSelector } from 'store';
import { json } from 'stream/consumers';
import { setTap } from 'store/reducers/userReducer';
import {
	changeCoin,
	setBoosters,
	setLimitenergy,
} from 'store/reducers/userReducer';
import { useAppDispatch } from 'store';
import {
	changeIsModalBoostItem,
	changeIsModalInsufficientFunds,
	changeIsModalPaymentSuccess,
	changeIsModalPurchase,
} from 'store/reducers/modalsReducer';
import { BoostType } from 'types/Boost.types';
import classNames from 'classnames';

function BoostBody() {
	const { user } = useAppSelector((state) => state.user);
	console.log(user);
	const dispatch = useAppDispatch();
	const buyBooster = async (booster_name: string) => {
		try {
			const result = await FetchUser.buyBooster(
				user.id,
				user.sign,
				booster_name
			);

			console.log('Minecoin request successful:', result);
			return result;
		} catch (error) {
			console.error('Minecoin request failed:', error);
		}
	};

	const handleOpenModal = (value: 'multitap' | 'tapBot' | 'energy') => {
		dispatch(changeIsModalBoostItem({ name: value, isOpen: true }));
	};

	const buyHandler = (booster_name: string, price: number) => {
		return async (event: React.MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			if (user.coin < price) {
				dispatch(changeIsModalInsufficientFunds(true));
				return;
			}

			const result = await buyBooster(booster_name).then((json) => {
				dispatch(setLimitenergy(json.max_energy));
				dispatch(changeCoin(json.coins));
				dispatch(setBoosters(json.boosters));
				var tap =
					Object.keys(json.boosters.multitap).length > 0
						? 1 + json.boosters.multitap.buff_level
						: 1;
				console.log(json.boosters.multitap);

				dispatch(setTap(tap));

				dispatch(changeIsModalPaymentSuccess({ isOpen: true }));
				console.log(json);
			});
			// Можно что-то сделать с результатом, если нужно
			console.log(result);
		};
	};
	return (
		<div className={c.wrapper}>
			{BOOSTLIST.map((elem) => (
				<div className={c.wrapperCard} key={elem.id} style={elem.style}>
					<div className={c.wrapperCardContent}>
						<img src={elem.icon} alt={elem.title} />
						<div className={c.wrapperCardContentTextWrapper}>
							<h3 className={c.wrapperCardContentTextWrapperTitle}>
								{elem.title}
							</h3>
							<span className={c.wrapperCardContentTextWrapperSubtitle}>
								{elem.subtitle}
							</span>
						</div>
					</div>
					<div className={c.wrapperCardActions}>
						<QuestionButton
							onClick={() => handleOpenModal(elem.type as BoostType)}
						/>
						<button
							disabled={
								Object.keys(user.boosters[elem.title]).length > 0 &&
								elem.title == 'tap bot'
							}
							className={classNames({
								[c.wrapperCardActionsBtn]: true,
								[c.isGrey]:
									Object.keys(user.boosters[elem.title]).length > 0 &&
									elem.title == 'tap bot',
							})}
							onClick={
								elem.title == 'tap bot' &&
								Object.keys(user.boosters[elem.title]).length > 0
									? () => {}
									: buyHandler(elem.title, Object.keys(user.boosters[elem.title]).length > 0 ? elem.price *
									Math.pow(2, user.boosters[elem.title]['buff_level']) : elem.price)
							}
						>
							<span>
								{' '}
								{Object.keys(user.boosters[elem.title]).length > 0 &&
								elem.title == 'tap bot'
									? 'already work'
									: 'BUY |'}{' '}
								{elem.title == 'tap bot'
									? Object.keys(user.boosters[elem.title]).length == 0 &&
									  elem.price
									: Object.keys(user.boosters[elem.title]).length > 0
									? formatCoin(
											elem.price *
												Math.pow(2, user.boosters[elem.title]['buff_level'])
									  )
									: elem.price}
							</span>
							{!(
								Object.keys(user.boosters[elem.title]).length > 0 &&
								elem.title == 'tap bot'
							) && <img src="/assets/coin.png" alt="coin" />}
						</button>
					</div>
				</div>
			))}
		</div>
	);
}

export default BoostBody;
