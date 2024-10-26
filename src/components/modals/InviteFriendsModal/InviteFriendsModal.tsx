import { useEffect, useState } from 'react';
import classNames from 'classnames';
import CloseButton from '../CloseButton';
import FooterModalInvite from 'components/FooterModalInvite';
import c from './InviteFriendsModal.module.scss';
import { TypeModalInviteName } from 'store/reducers/modalsReducer';
import { useAppSelector } from 'store';

interface InviteFriendsModalProps {
	isOpen: boolean;
	name: TypeModalInviteName;
	closeModal: () => void;
}

function InviteFriendsModal({
	isOpen,
	closeModal,
	name,
}: InviteFriendsModalProps) {
	const [active, setActive] = useState<'default' | 'show' | 'close'>('default');
	const { user } = useAppSelector((state) => state.user);

	const links = {
		path: user.inviteLink,
		text: 'TAPPY BIRD is a new game on the Ton blockchain !Follow the link and get a bonus 50 000 $BIRDY token !',
	};

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
				[c.container]: true,
				[c.isActive]: active === 'show',
				[c.isClose]: active === 'close',
			})}
		>
			<div className={c.content}>
				<CloseButton handleCloseModal={handleCloseModal} />
				<div className={c.body}>
					<span className={c.bodyText}>
						{name === 'shop'
							? 'Invite a friend and get the ticket'
							: 'Invite a friend and get'}
					</span>
					{name === 'shop' ? (
						<img
							className={c.bodyImage}
							src="/assets/shop/rowTicket.png"
							alt="ticket"
						/>
					) : (
						<div className={c.bodyReward}>
							<span>
								+50000 <img src="/assets/coin.png" alt="coin" /> + 10%{' '}
							</span>
							<span className={c.bodyTicket}>
								+ 1{' '}
								<img
									className={c.bodyTicketImg}
									src="/assets/shop/rowTicket.png"
									alt="ticket"
								/>
							</span>
						</div>
					)}
				</div>
				<FooterModalInvite name="t.me/tappybirdvbot" links={links} />
			</div>
		</div>
	);
}

export default InviteFriendsModal;
