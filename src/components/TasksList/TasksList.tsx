import { Link } from 'react-router-dom';

import TaskElem from './TaskElem';
import { useAppDispatch, useAppSelector } from 'store';

import c from './TasksList.module.scss';
import { useCallback, useEffect, useMemo } from 'react';
import { AdTask, InviteTask, ITask } from 'types/Task.types';
import { changeIsModalInvite } from 'store/reducers/modalsReducer';
import { FetchUser } from 'api/user';
import { set_users_available, setisCanWatchAd, setTickets } from 'store/reducers/userReducer';
import { ShowPromiseResult } from 'types/adsgram';
import { useAdsgram } from 'hooks/useAdsGram';
const links = {
	path: 'https://t.me/testtappybird_bot',
	text: 'Hello world!',
};

function TasksList() {
	const { tasks } = useAppSelector((state) => state.tasks);
	const dispatch = useAppDispatch();
	const { friends } = useAppSelector((state) => state.friends);
	const { user } = useAppSelector((state) => state.user);
	const checkCount = useMemo(() => {
		return tasks.filter((task) => task.checking === 'check').length;
	}, [tasks]);
	function getAllSubtaskIds(tasks: ITask[]) {
		const subtaskIds: number[] = [];

		tasks.forEach((task) => {
			if (task.subtasks && task.subtasks.length > 0) {
				subtaskIds.push(...task.subtasks);
			}
		});
		console.log(tasks)
		return subtaskIds;
	}
	const onReward = useCallback(() => {
		ad_was_watched().then(json=>{
			dispatch(setisCanWatchAd(false))
			dispatch(setTickets(json.tickets))
		})
	  }, []);
	  const onError = useCallback((result: ShowPromiseResult) => {
		alert(JSON.stringify(result, null, 4));
	  }, []);
	
	  const showAd = useAdsgram({ blockId: "1597", onReward, onError });
	const is_can_watch_ad = async()=>{
		try {
			const result = await FetchUser.is_can_watch_ad(user.id);

			console.log('is_can_watch_ad request successful:', result);
			return result;
		} catch (error) {
			console.error('is_can_watch_ad request failed:', error);
		}
	}


	const check_users_available = async()=>{
		try {
			const result = await FetchUser.check_users_available(user.id, user.sign);

			console.log('is_can_watch_ad request successful:', result);
			return result;
		} catch (error) {
			console.error('is_can_watch_ad request failed:', error);
		}
	}

	const ad_was_watched = async () => {
		try {
			const result = await FetchUser.ad_was_watched(user.id, user.sign);

			console.log('ad_was_watched request successful:', result);
			return result;
		} catch (error) {
			console.error('ad_was_watched request failed:', error);
		}
	};
	useEffect(()=>{
		is_can_watch_ad().then(json=>{
			dispatch( setisCanWatchAd(json.is_ok))
		})
		check_users_available().then(
			json=>{
				dispatch(set_users_available(json.users_available))
			}
		)
	  })
	const subtaskIds = getAllSubtaskIds(tasks);
	return (
		<>
			<div className={c.actions}>
				<button
					className={c.button}
					onClick={(event) => {
						event.preventDefault();

						dispatch(changeIsModalInvite({ isOpen: true }));
					}}
				>
					<img
						src="/assets/earn-more/friend.png"
						alt="friend"
						className={c.image}
					/>
					<span className={c.text}>Invite Friends</span>
				</button>
				<Link to="/earn-more/friends" className={c.button}>
					<span className={c.text}>My Friends</span>
					<span className={c.count}>{friends.length}</span>
				</Link>
			</div>
			<div className={c.tasksWrapper}>
				<div className={c.header}>
					<h3 className={c.headerTitle}>COMPLETE TASKS</h3>
					{checkCount ? (
						<div className={c.headerCount}>{checkCount} check</div>
					) : null}
				</div>
				<div className={c.tasks}>
					{user.isCanWatchAd && 
						<TaskElem task={AdTask} key={AdTask.id} isLinked  isAdTask = {true} />	
					}
				
						<TaskElem task={InviteTask} key={AdTask.id} isLinked  isinviteTask = {true} />	
					
					{tasks.map(
						(task) =>
							!subtaskIds.includes(task.id) && (
								<TaskElem task={task} key={task.id} isLinked />
							)
					)}

					
				</div>
			</div>
		</>
	);
}

export default TasksList;
