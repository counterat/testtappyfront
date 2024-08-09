import { useEffect, useState } from 'react';
import classNames from 'classnames';

import c from './DailyRewardModal.module.scss';
import { LIST } from 'constants/dailyReward';
import { getCurrentUTCDate } from 'utils/date';

interface DailyRewardModalProps {
	isOpen: boolean;
	closeModal: () => void;
	streak: number
}

function DailyRewardModal({ isOpen, closeModal, streak }: DailyRewardModalProps) {
	const [active, setActive] = useState<'default' | 'show' | 'close'>('default');
	

	useEffect(() => {
		if (isOpen) {
			setActive('show');
		}
	}, [isOpen]);

	const handleClime = () => {
		localStorage.setItem('lastRewardDateUTC', getCurrentUTCDate());

		setActive('close');
		setTimeout(() => {
			setActive('default');
			closeModal();
		}, 300);

		localStorage.setItem('streak', (streak + 1).toString());

		if (streak === 6) {
			setTimeout(() => {
				localStorage.removeItem('streak');
			}, 100);
		}
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
			<div className={c.modalContainer}>
				<div className={c.modalContainerContent}>
					<div className={c.modalContainerContentDays}>
						<div className={c.modalContainerContentLogo}>
							<img src="/assets/DailyReward/dailyReward.png" alt="logo" />
						</div>
						{LIST.map((day, index) => (
							<div
								key={day.id}
								className={classNames({
									[c.claimDay]: streak > index,
								})}
							>
								<img src={day.image} alt={`day ${day.id}`} />
								{streak > index && (
									<div className={c.claimDayCheck}>
										<img src="/assets/DailyReward/check.png" alt="" />
									</div>
								)}
							</div>
						))}
						<div
							className={classNames({
								[c.modalContainerContentDaysDay7]: true,
								[c.claimDay]: streak === 7,
							})}
						>
							<img src="/assets/DailyReward/Day 7.png" alt="day 7" />
						</div>
					</div>
				</div>
				<button
					className={classNames({
						[c.modalContainerButton]: true,
					})}
					onClick={()=>{
						setActive('close');
						
						closeModal()}}
				>
					Claim
				</button>
			</div>
		</div>
	);
}

export default DailyRewardModal;
