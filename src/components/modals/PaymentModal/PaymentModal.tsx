import { useEffect, useState } from 'react';
import c from './PaymentModal.module.scss';
import classNames from 'classnames';
import TonIcon from 'assets/icons/TonIcon';
import PaymentExchange from 'components/PaymentExchange';
import { ton } from 'constants/tonObject';

interface PaymentModalProps {
	isOpen: boolean;
	closeModal: () => void;
}

function PaymentModal({ isOpen, closeModal }: PaymentModalProps) {
	const [isExchange, setIsExchange] = useState(false);
	const [active, setActive] = useState<'default' | 'show' | 'close'>('default');
	const [isConnected, setIsConnected] = useState(ton.connected);

	useEffect(() => {
		if (isOpen) {
			setActive('show');
		}
	}, [isOpen]);

	useEffect(() => {
		const checkConnection = () => {
			if (ton.connected !== isConnected) {
				setIsConnected(ton.connected);
			}
		};

		const intervalId = setInterval(checkConnection, 100);

		return () => clearInterval(intervalId);
	}, [isConnected]);

	const handleCloseModal = () => {
		setActive('close');
		setTimeout(() => {
			setActive('default');
			closeModal();
			setIsExchange(false);
		}, 300);
	};

	const handleOpenModal = () => {
		ton.openModal();
	};

	return (
		<div
			className={classNames({
				[c.modal]: true,
				[c.isActive]: active === 'show',
				[c.isClose]: active === 'close',
			})}
		>
			{isExchange ? (
				<PaymentExchange closeModal={handleCloseModal} />
			) : (
				<div
					className={c.modalContent}
					onClick={(event) => event.stopPropagation()}
				>
					<div className={c.modalContentImage}>
						<img src="/assets/coins.svg" alt="coins" />
					</div>
					<div className={c.modalContentBody}>
						<h2 className={c.modalContentTitle}>top up a $tappy</h2>
						
					</div>
					<div className={c.modalContentActions}>
						<button
							className={c.modalContentActionsBtn}
							onClick={
								isConnected
									? () => {
											setIsExchange(true);
									  }
									: handleOpenModal
							}
						>
							<TonIcon />
							<span>{isConnected ? 'Buy $TAPPY' : 'Connect Wallet'}</span>
						</button>
						<button
							className={c.modalContentActionsBtn}
							onClick={handleCloseModal}
						>
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default PaymentModal;
