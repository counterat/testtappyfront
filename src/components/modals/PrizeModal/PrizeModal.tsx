import { motion } from 'framer-motion';

import { IPrize } from 'types/Wheel.type';

import c from './PrizeModal.module.scss';
import classNames from 'classnames';

interface PrizeModalProps {
	prize: IPrize;
	closeModal: () => void;
}

function PrizeModal({ prize, closeModal }: PrizeModalProps) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className={c.modal}
		>
			<div className={c.modalContent}>
				{prize.text !== 'Try again' && (
					<div className={c.modalContentHead}>
						<img src="/assets/spin/gifts.png" alt="gifts" />
					</div>
				)}
				<div className={c.modalContentHeader}>
					{prize.text === 'Try again' ? (
						<img
							className={c.modalContentHeaderTryAgain}
							src="/assets/spin/try-again.png"
							alt="try again"
						/>
					) : (
						<>
							{prize.value === '50 TON' ? (
								<img
									className={c.modalContentHeaderSuper}
									src="/assets/spin/super-win.png"
									alt="super"
								/>
							) : (
								<img
									className={c.modalContentHeaderCongr}
									src="/assets/spin/congr.png"
									alt="congr"
								/>
							)}
							<h4 className={c.modalContentHeaderTitle}>{prize.text}</h4>
						</>
					)}
				</div>
				<div className={c.modalContentBody}>
					{prize.text === 'Try again' ? (
						<img
							className={c.modalContentBodyTryAgainImage}
							src="/assets/spin/emoji.png"
							alt="emoji"
						/>
					) : (
						<div
							className={classNames({
								[c.modalContentBodyCard]: true,
								[c.aqua]: prize.value === '0.01 TON' || prize.value === '100',
								[c.legendary]:
									prize.value === 'Legendary Egg' || prize.value === 'Bird #1',
								[c.super__win]: prize.value === '50 TON',
							})}
						>
							<div
								className={classNames({
									[c.modalContentBodyCardImage]: true,
									[c.tonImage]: prize.value === '0.01 TON',
									[c.eggImage]: prize.value === 'Bird #1',
								})}
							>
								<img
									className={c.modalContentBodyCardRays}
									src="/assets/spin/rays.png"
									alt="rays"
								/>
								<img src={prize.image} alt={prize.text} />
							</div>
							<div className={c.modalContentBodyCardText}>
								{prize.value}
								{prize.value === 'Bird #1' && (
									<span className={c.modalContentBodyCardTextRang}>
										Legendary
									</span>
								)}
							</div>
						</div>
					)}
				</div>
				<button className={c.modalContentButton} onClick={closeModal}>
					Okey
				</button>
			</div>
		</motion.div>
	);
}

export default PrizeModal;
