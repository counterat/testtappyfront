import PlusIcon from 'assets/icons/PlusIcon';
import { useAppSelector } from 'store';
import c from './ProfileInfo.module.scss';
import { useAppDispatch } from 'store';
import { changeIsModalPayment } from 'store/reducers/modalsReducer';
interface ProfileInfoProps {
	nickname?: string;
	balance?: {
		ton: number;
		tappy: number;
	};
}

function ProfileInfo({}: ProfileInfoProps) {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector(state=>state.user)
	return (
		<div className={c.profile}>
			<div className={c.profileImageWrapper}>
				 <img src={user.photo_url} alt="" className={c.profileImage} />
			</div>
			<div className={c.profileContent}>
				<div className={c.profileContentNickname}>{user.username}</div>
				<div className={c.profileContentBalance}>
					<span className={c.profileContentBalanceTappy}>{user.balance_in_tappycoin} $Tappy</span>
					<button
						className={c.profileContentBalanceButton}
						onClick={() => dispatch(changeIsModalPayment(true))}
					>
						<PlusIcon />
					</button>
				</div>
			</div>
		</div>
	);
}

export default ProfileInfo;
