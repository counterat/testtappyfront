import classNames from 'classnames';
import c from './TapBotModal.module.scss';
import { useEffect, useState } from 'react';
import { formatCoin } from 'utils/formatCoin';

interface TapBotModalProps {
	isOpen: boolean;
	coins: number;
	closeModal: () => void;
}

function TapBotModal({ isOpen, coins, closeModal }: TapBotModalProps) {
	const [active, setActive] = useState<'default' | 'show' | 'close'>('default');

	useEffect(() => {
		if (isOpen) {
			setTimeout(() => setActive('show'), 100);
		}
	}, [isOpen]);

	const handleClaim = () => {
		setActive('close');
		setTimeout(() => {
			setActive('default');
			closeModal();
		}, 300);
	};

	return (
		<div
			className={classNames({
				[c.modal]: true,
				[c.isActive]: active === 'show',
				[c.isClose]: active === 'close',
			})}
		>
			<div
				className={classNames({
					[c.modalContent]: true,
					[c.isActive]: active === 'show',
					[c.isClose]: active === 'close',
				})}
			>
				<div className={c.modalContentHeader}>
					<img
						src="/assets/boost/tapbot.png"
						alt="tapbot"
						className={c.modalContentHeaderImage}
					/>
				</div>
				<div className={c.modalContentBody}>
					<h3 className={c.modalContentBodyTitle}>TAPBOT</h3>
					<p className={c.modalContentBodyDesc}>
						While you were offline , your tap bot earned some coins for you:
					</p>
					<div className={c.modalContentBodyCoin}>
						<img src="/assets/coin-big.png" alt="coin" />
						<span>{formatCoin(coins)}</span>
					</div>
				</div>
				<button
					className={c.modalContentBtn}
					onClick={handleClaim}
					onTouchEnd={(e) => e.stopPropagation()}
				>
					Claim
				</button>
			</div>
		</div>
	);
}

export default TapBotModal;
