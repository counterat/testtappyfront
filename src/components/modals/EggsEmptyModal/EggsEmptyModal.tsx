import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import c from './EggsEmptyModal.module.scss';

interface EggsEmptyModalProps {
	isOpen: boolean;
	closeModal: () => void;
}

function EggsEmptyModal({ isOpen, closeModal }: EggsEmptyModalProps) {
	const [active, setActive] = useState<'default' | 'show' | 'close'>('default');

	useEffect(() => {
		if (isOpen) {
			setActive('show');
		}
	}, [isOpen]);

	const handleCloseModal = () => {
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
			onTouchEnd={(event) => event.stopPropagation()}
		>
			<div className={c.modalContent}>
				<div className={c.modalContentTextWrapper}>
					<h3 className={c.modalContentTextWrapperTitle}>NO MORE EGGS :(</h3>
					<div className={c.modalContentTextWrapperSubtitle}>
						You have broken all the <br /> available eggs. You can buy <br />
						new ones in the shop
					</div>
				</div>
				<div className={c.modalContentActions}>
					<Link to="/shop" className={c.modalContentActionsShop}>
						<img src="/assets/store.png" alt="" />
						<span>Shop</span>
					</Link>
					<button
						className={c.modalContentActionsClose}
						onClick={handleCloseModal}
					>
						OKAY
					</button>
				</div>
			</div>
		</div>
	);
}

export default EggsEmptyModal;
