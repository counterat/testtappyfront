import { useEffect, useState } from 'react';
import classNames from 'classnames';

import BirdCard from 'components/BirdCard';
import { testBird } from 'constants/cardsList';
import { IBird } from 'types/Inventory.types';
import c from './ConfirmBirdModal.module.scss';
import { useAppSelector } from 'store';

interface ConfirmBirdModalProps {
	isOpenModal: boolean;
	closeModal: () => void;
	bird:IBird
}

type IActiveState = {
	buttonClose: 'default' | 'open' | 'closed';
	isActive: 'default' | 'show' | 'close';
};

function ConfirmBirdModal({ isOpenModal, closeModal, bird }: ConfirmBirdModalProps) {
	const [active, setActive] = useState<IActiveState>({
		buttonClose: 'default',
		isActive: 'default',
	});
	const { level } = useAppSelector((state) => state.user.user);

	const handleCloseModal = () => {
		setActive((prev) => ({ ...prev, buttonClose: 'closed' }));
		setTimeout(() => {
			setActive((prev) => ({ ...prev, isActive: 'close' }));
		}, 100);
		setTimeout(() => {
			closeModal();
		}, 500);
	};

	useEffect(() => {
		setActive({ buttonClose: 'default', isActive: 'default' });
		if (isOpenModal) {
			setTimeout(() => {
				setActive((prev) => ({ ...prev, isActive: 'show' }));
			}, 10);
			setTimeout(() => {
				setActive((prev) => ({ ...prev, buttonClose: 'open' }));
			}, 150);
		}
	}, [isOpenModal]);

	return (
		<div
			className={classNames({
				[c.confirmModal]: true,
				[c.modalActive]: active.isActive === 'show',
				[c.modalClose]: active.isActive === 'close',
			})}
		>
			<div
				className={classNames({
					[c.addBirdCard]: true,
					[c.active]: active.isActive === 'show',
					[c.close]: active.isActive === 'close',
				})}
			>
				<BirdCard bird={bird} paddingType="claim" />
				<button
					className={classNames({
						[c.button]: true,
						[c.openButton]: active.buttonClose === 'open',
						[c.closeButton]: active.buttonClose === 'closed',
					})}
					type="button"
					disabled={active.buttonClose === 'default'}
					onTouchEnd={handleCloseModal}
				>
					Claim
				</button>
			</div>
		</div>
	);
}

export default ConfirmBirdModal;
