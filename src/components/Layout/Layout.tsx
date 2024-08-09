import { Outlet } from 'react-router-dom';

import c from './Layout.module.scss';
import PaymentModal from 'components/modals/PaymentModal';
import { useAppDispatch, useAppSelector } from 'store';
import {
	changeIsModalInsufficientFunds,
	changeIsModalPayment,
	changeIsModalPaymentSuccess,
	changeIsModalInvite,
} from 'store/reducers/modalsReducer';
import CustomModal from 'components/modals/CustomModal';
import InviteFriendsModal from 'components/modals/InviteFriendsModal';

function Layout() {
	const dispatch = useAppDispatch();
	const {
		isModalPayment,
		isModalPaymentSuccess,
		isModalInsufficientFunds,
		isModalInvite,
	} = useAppSelector((state) => state.modals);

	return (
		<div className={c.container}>
			<div className={c.firstCloud} />
			<div className={c.secondCloud} />
			<div className={c.thirdCloud} />
			<Outlet />
			{isModalPayment && (
				<PaymentModal
					isOpen={isModalPayment}
					closeModal={() => dispatch(changeIsModalPayment(false))}
				/>
			)}
			{isModalPaymentSuccess.isOpen && (
				<CustomModal
					isOpen={isModalPaymentSuccess.isOpen}
					closeModal={() =>
						dispatch(changeIsModalPaymentSuccess({ isOpen: false }))
					}
					header={
						<>
							<img
								className={c.modalImage}
								src="/assets/check.png"
								alt="check"
							/>
							<h3 className={c.modalTitle}>
								{isModalPaymentSuccess.isWallet
									? 'Balance is replenished'
									: 'Successful purchase'}
							</h3>
						</>
					}
					closeButton="OKAY"
				/>
			)}
			{isModalInsufficientFunds && (
				<CustomModal
					isOpen={isModalInsufficientFunds}
					closeModal={() => dispatch(changeIsModalInsufficientFunds(false))}
					header={
						<>
							<img
								className={c.modalImageFailed}
								src="/assets/failed-icon.png"
								alt="check"
							/>
							<h3 className={c.modalTitle}>
								You don’t have enough <br /> coins to buy
							</h3>
						</>
					}
				/>
			)}
			{isModalInvite.isOpen && (
				<InviteFriendsModal
					isOpen={isModalInvite.isOpen}
					name={isModalInvite.name}
					closeModal={() => {
						dispatch(changeIsModalInvite({ isOpen: false }));
					}}
				/>
			)}
		</div>
	);
}

export default Layout;
