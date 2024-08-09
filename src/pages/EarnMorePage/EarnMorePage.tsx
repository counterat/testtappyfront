import { useEffect, useRef } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import HeaderField from 'components/ShopHeader';
import GoBack from 'components/GoBack';

import c from './EarnMorePage.module.scss';
import CustomModal from 'components/modals/CustomModal';
import { useAppDispatch, useAppSelector } from 'store';
import {
	changeIsModalCheckingStatus,
	changeIsModalSubtask,
} from 'store/reducers/modalsReducer';
import SubTasksModal from 'components/modals/SubTasksModal';

function EarnMorePage() {
	const params = useParams();
	const ref = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();
	const { isModalCheckingStatus, isModalSubtask } = useAppSelector(
		(state) => state.modals
	);

	useEffect(() => {
		if (ref.current) {
			ref.current.scrollTo(0, 0);
		}
	}, [params]);

	return (
		<div className={c.container}>
			<div className={c.earnMore} ref={ref}>
				<HeaderField
					title="EARN MORE"
					src="/assets/earn-more/header.png"
					titleStyle={c.title}
				/>
				<Outlet />
				<GoBack />
			</div>
			{isModalCheckingStatus.isOpen && (
				<CustomModal
					isOpen={isModalCheckingStatus.isOpen}
					closeModal={() => {
						dispatch(changeIsModalCheckingStatus(false));
					}}
					header={
						<>
							{isModalCheckingStatus.isSuccess ? (
								<img
									src="/assets/earn-more/succes.png"
									alt="succes"
									className={c.modalImage}
								/>
							) : (
								<img
									src="/assets/earn-more/failed.png"
									alt="failed"
									className={c.modalImage}
								/>
							)}
							<h3 className={c.modalTitle}>
								{isModalCheckingStatus.isSuccess
									? 'The task is completed'
									: 'Make sure you have fulfilled all the conditions or try again later.'}
							</h3>
						</>
					}
				></CustomModal>
			)}
			{isModalSubtask.isOpen && (
				<SubTasksModal
					isOpen={isModalSubtask.isOpen}
					id={isModalSubtask.id!}
					closeModal={() => {
						dispatch(
							changeIsModalSubtask({
								isOpen: false,
								id: 0,
							})
						);
					}}
				/>
			)}
		</div>
	);
}

export default EarnMorePage;
