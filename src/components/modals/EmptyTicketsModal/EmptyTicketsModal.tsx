import { motion } from 'framer-motion';

import { IPrize } from 'types/Wheel.type';

import c from './EmptyTicketsModal.module.scss';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
interface EmptyTicketsModalProps {
	closeModal: () => void;
}

const links = {
	path: 'https://t.me/testtappybird_bot',
	text: 'Hello world!',
};

function EmptyTicketsModal({ closeModal }: EmptyTicketsModalProps) {
	const handleBuy = (typeCoin: 'coin' | 'tappy') => {};
	const navigate = useNavigate();
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
					<button
						className={c.modalContentActionsButton}
						onClick={() => {
							
							navigate('/shop')}}
					>
						buy for 5 $TAPPY
					</button>
					<a
						className={c.modalContentActionsButton}
						href={`https://telegram.me/share/url?url=${links.path}&text=${links.text}`}
					>
						<img src="/assets/earn-more/friend.png" alt="friend" />
						<span>Invite Friends</span>
					</a>
				</div>
				<button className={c.modalContentButton} onClick={closeModal}>
					Okey
				</button>
			</div>
		</motion.div>
	);
}

export default EmptyTicketsModal;
