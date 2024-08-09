import { IFriend } from 'types/Task.types';

import c from './FriendElem.module.scss';
import { FetchUser } from 'api/user';
import { useAppSelector } from 'store';
import { useAppDispatch } from 'store';
import { setCoinsToZero } from 'store/reducers/friendsReducer';
import { changeCoin } from 'store/reducers/userReducer';
interface FriendElemProps {
	friend: IFriend;
}

function FriendElem({ friend }: FriendElemProps) {
	const {user} = useAppSelector(state=>state.user)
	const dispatch = useAppDispatch();
	const getMoneyForRef = async (userId:number, refId:number) => {
		try {
			const result = await FetchUser.getMoneyForRef(userId, refId);
			
			console.log('getMoneyForRef request successful:', result);
			return result
		} catch (error) {
			console.error('getMoneyForRef request failed:', error);
		}
	};
	
	return (
		<div className={c.friend}>
			<div className={c.friendImageWrapper}>
				<img src={friend.url} alt="avatar" />
			</div>
			<span className={c.friendTitle}>{friend.title}</span>
			<button className={c.friendButton} onClick={
				()=>{
					/* getMoneyForRef(user.id, friend.id).then(json=>{
						if (json){
							dispatch(setCoinsToZero(friend.id))
							dispatch(changeCoin(json.coins))
						}
					})
 */
				}
				
			}>
				<span>+{friend.coin}</span>
				<img src="/assets/coin.png" alt="coin" />
			</button>
		</div>
	);
}

export default FriendElem;
