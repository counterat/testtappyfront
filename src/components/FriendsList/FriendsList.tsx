import { FRIENDSLIST } from 'constants/cardsList';
import c from './FriendsList.module.scss';
import FriendElem from './FriendElem';
import { useAppSelector } from 'store';

function FriendsList() {
	const {friends} = useAppSelector(state=>state.friends) 
	return (
		<div className={c.friendsWrapper}>
			<div className={c.header}>
				<h3 className={c.title}>my friends</h3>
				<span>{friends.length}</span>
			</div>
			<div className={c.friends}>
				{friends.map((friend) => (
					<FriendElem friend={friend} key={friend.id} />
				))}
			</div>
		</div>
	);
}

export default FriendsList;
