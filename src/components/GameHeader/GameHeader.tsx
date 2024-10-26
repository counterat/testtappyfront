import PlusIcon from 'assets/icons/PlusIcon';

import c from './GameHeader.module.scss';
import { formatCoin } from 'utils/formatCoin';
import { useAppSelector, useAppDispatch } from 'store';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { changeIsModalPayment } from 'store/reducers/modalsReducer';
import classNames from 'classnames';
function GameHeader() {
	const dispatch = useAppDispatch();
	const coin = useAppSelector((state) => state.user.user.coin);
	const { user } = useAppSelector((state) => state.user);
	console.log(user);
	const navigate = useNavigate();
	const handleNavigation = () => {
		navigate('/ch');
	};
	return (
		<div className={c.header}>
			<div className={c.headerBalance}>
				<div className={c.headerBalanceImgWrapper}>
					<img
						src="/assets/coin.png"
						alt="coin"
						className={c.headerBalanceImg}
					/>
				</div>
				<div
					className={classNames({
						[c.headerBalanceCoin]: true,
						[c.millionCoins]: coin > 1_000_000,
						[c.milliardCoins]: coin > 1_000_000_000,
					})}
				>
					<span className={c.headerBalanceCoinText}>{formatCoin(coin)}</span>
				</div>
				<div className={c.headerBalanceTappy}>
					{user.balance_in_tappycoin} $TAPPY
					<button
						className={c.headerBalanceButton}
						onTouchEnd={(event) => event.stopPropagation()}
						onClick={() => dispatch(changeIsModalPayment(true))}
					>
						<PlusIcon />
					</button>
				</div>
			</div>
			<div className={c.headerRight}>
				<Link
					to="/inventory"
					className={c.headerRightAction}
					onTouchEnd={(event) => event.stopPropagation()}
				>
					<img
						src="/assets/backpack.png"
						alt=""
						className={c.headerRightActionImg}
					/>
				</Link>
				<Link
					to={'/fortune'}
					className={classNames({
						[c.headerRightAction]: true,
						[c.fortune]: true,
					})}
					onTouchEnd={(event) => event.stopPropagation()}
				>
					<img
						src="/assets/spin.png"
						alt=""
						className={c.headerRightActionImg}
					/>
				</Link>
			</div>
		</div>
	);
}

export default GameHeader;
