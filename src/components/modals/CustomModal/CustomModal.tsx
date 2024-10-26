import { ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';

import c from './CustomModal.module.scss';

interface CustomModalProps {
	isOpen: boolean;
	closeModal: () => void;
	header: ReactNode;
	children?: ReactNode;
	closeButton?: string;
}

function CustomModal({
	isOpen,
	closeModal,
	children,
	header,
	closeButton = 'Okay',
}: CustomModalProps) {
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
		>
			<div className={c.modalContent}>
				<div className={c.modalContentHeader}>{header}</div>
				{children && <div className={c.body}>{children}</div>}
				<button className={c.modalContentBtn} onClick={handleCloseModal}>
					{closeButton}
				</button>
			</div>
		</div>
	);
}

export default CustomModal;
