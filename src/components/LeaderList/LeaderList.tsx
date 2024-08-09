import React from 'react';
import c from './LeaderList.module.scss';
import { formatCoinLeader } from 'utils/formatCoin';
import { useDispatch } from 'react-redux';
import { changeSquad } from 'store/reducers/userReducer';
import { changeIsModalSquadState } from 'store/reducers/modalsReducer';
import { useAppSelector } from 'store';
import { checkPlace } from 'utils/checkPlace';
import { formatLinks } from 'utils/formatLinkToName';
import { FetchUser } from 'api/user';
interface ILeaderBoard {
  id: number;
  nickname: string;
  coins: number;
  place?:number;
  url?:string
}

interface LeaderListProps {
  elem: ILeaderBoard;
  index: number;
  isJoin?: boolean;
}

function LeaderList({ elem, index, isJoin }: LeaderListProps) {
	const dispatch = useDispatch();
	const { user } = useAppSelector(state=>state.user)
	const squadId = useAppSelector((state) => state.user.user.squad);
	console.log(elem)
  
	const joinSquad = async (squadId:number) => {
		try {
			const result = await FetchUser.joinSquad(user.id, user.sign, squadId);
			
			console.log('joinSquad request successful:', result);
			return result
		} catch (error) {
			console.error('joinSquad request failed:', error);
		}
	};


  const handleJoin = () => {
	
	joinSquad(elem.id).then(json=>{
		if (json.detail){
			return			
		}
		
		dispatch(
			changeIsModalSquadState({
				isOpen: true,
				isCreated: false,
				name: elem.nickname,
			})
		);
		dispatch(changeSquad(elem.id));



	})
		
	};
  return (
    <div className={c.wrapper}>
      <div className={c.imageWrapper}>{checkPlace(index, c.image)}</div>
      <div className={c.center}>
        <img src= {elem.url ? elem.url : "/assets/no-avatar.png"} alt="avatar" className={c.avatarImage} />
        <span className={c.title}>{formatLinks(elem.nickname)}</span>
      </div>
      <div className={c.right}>
      {isJoin ? (
					elem.id === squadId ? null : (
						<button onClick={handleJoin} className={c.join}>
							Join
						</button>
					)
				) : (
					<>
						<img src="/assets/coin.png" alt="coin" className={c.coinImage} />
						<span className={c.coin}>{formatCoinLeader(elem.coins)}</span>
					</>
				)}
      </div>
    </div>
  );
}

export default LeaderList;
