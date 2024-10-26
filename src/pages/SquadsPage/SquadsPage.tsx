import YourSquad from 'components/YourSquad';
import c from './SquadsPage.module.scss';
import { useAppDispatch, useAppSelector } from 'store';
import { LEADERBOARDSQUAD } from 'constants/leaderboardList';
import LeaderList from 'components/LeaderList';
import GoBack from 'components/GoBack';
import JoinSquadModal from 'components/modals/JoinSquadModal';
import { useMemo, useState } from 'react';
import CustomModal from 'components/modals/CustomModal';
import { changeIsModalSquadState } from 'store/reducers/modalsReducer';
import SquadDetailModal from 'components/modals/SquadDetailModal';
import { checkPlace } from 'utils/checkPlace';
import { formatLinks } from 'utils/formatLinkToName';
// Определение типов
interface ILeaderData {
	coins: number;
	name: string;
}

type LeaderRecord = Record<number, ILeaderData>;

export type UserLeaderboard = LeaderRecord[];

interface ILeaderBoard {
	id: number;
	nickname: string;
	coins: number;
}

function SquadsPage() {
	const { user } = useAppSelector((state) => state.user);
	const [isOpen, setIsOpen] = useState(false);
	const { squads } = useAppSelector((state) => state.squads);
	const [isDetailOpen, setIsDetailOpen] = useState(false);
	const { isModalSquadState } = useAppSelector((state) => state.modals);
	const dispatch = useAppDispatch();
	const squad = useMemo(() => {
		if (user.squad) {
			return squads.find((squad) => squad.id === user.squad);
		}
		return null;
	}, [user.squad]);
	console.log(squads);

	return (
		<div className={c.container}>
			<div className={c.squads}>
				<YourSquad />
				<button
					className={c.squadsJoin}
					onClick={() => {
						setIsOpen(true);
					}}
				>
					Create/Join squad <span>+</span>
				</button>
				{squad ? (
					<div className={c.squadsInfo} onClick={() => setIsDetailOpen(true)}>
						<div className={c.squadsInfoLeft}>
							<h4>{formatLinks(squad.nickname)}</h4>
							<div className={c.squadsInfoLeftCoin}>
								<span>total coins</span>
								<p>{squad.coins} $brd</p>
							</div>
						</div>
						<div className={c.place}>{checkPlace(squad.place!, c.image)}</div>
					</div>
				) : (
					<div className={c.noSquad}>
						<span>You are not in any squad</span>
					</div>
				)}
				<div className={c.outerList}>
					<div className={c.list}>
						{squads.map((elem, index) => (
							<LeaderList elem={elem} index={index + 1} key={index} isJoin />
						))}
					</div>
				</div>
				<GoBack />
			</div>
			{isOpen && (
				<JoinSquadModal closeModal={() => setIsOpen(false)} isOpen={isOpen} />
			)}
			{isDetailOpen && (
				<SquadDetailModal
					closeModal={() => setIsDetailOpen(false)}
					isOpen={isDetailOpen}
				/>
			)}
			{isModalSquadState.isOpen && (
				<CustomModal
					header={
						<>
							{isModalSquadState.isCreated ? (
								<img
									src="/assets/squads/badge.png"
									alt="badge"
									className={c.modalBadge}
								/>
							) : (
								<img
									src="/assets/squads/sword.png"
									alt="sword"
									className={c.modalSword}
								/>
							)}
						</>
					}
					closeModal={() =>
						dispatch(changeIsModalSquadState({ isOpen: false }))
					}
					isOpen={isModalSquadState.isOpen}
				>
					<>
						{isModalSquadState.isCreated ? (
							<>
								<h3 className={c.modalTitle}>Created</h3>
								<div className={c.modalSquad}>
									<span>You have created a squad</span>
									<span className={c.modalSquadName}>
										{isModalSquadState.name}
									</span>
								</div>
							</>
						) : (
							<>
								<h3 className={c.modalTitle}>Joined</h3>
								<div className={c.modalSquad}>
									<span>You have joined the squad</span>
									<span className={c.modalSquadName}>
										{isModalSquadState.name}
									</span>
								</div>
							</>
						)}
					</>
				</CustomModal>
			)}
		</div>
	);
}

export default SquadsPage;
