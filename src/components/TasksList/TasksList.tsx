import { Link } from 'react-router-dom';

import TaskElem from './TaskElem';
import { useAppDispatch, useAppSelector } from 'store';

import c from './TasksList.module.scss';
import { useMemo } from 'react';
import { ITask } from 'types/Task.types';
import { changeIsModalInvite } from 'store/reducers/modalsReducer';
const links = {
	path: 'https://t.me/testtappybird_bot',
	text: 'Hello world!',
};

function TasksList() {
	const { tasks } = useAppSelector((state) => state.tasks);
	const dispatch = useAppDispatch();
	const { friends } = useAppSelector((state) => state.friends);

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

		return subtaskIds;
	}
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
