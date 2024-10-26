import classNames from 'classnames';

import c from './BuyModal.module.scss';

interface BuyModalProps {
	isOpen: boolean;
	closeModal: () => void;
}

function BuyModal({ isOpen, closeModal }: BuyModalProps) {
	return (
		<div className={classNames({ [c.modal]: true, [c.isActive]: isOpen })}>
			<div className={c.modalContent}>
				<div className={c.modalContentTextWrapper}>
					<h3 className={c.modalContentTextWrapperTitle}>Title about</h3>
					<span className={c.modalContentTextWrapperSubtitle}>
						This is a model with text, some kind of thought
					</span>
				</div>
				<button className={c.modalContentBtn} onClick={closeModal}>
					OKEY
				</button>
			</div>
		</div>
	);
}

export default BuyModal;
