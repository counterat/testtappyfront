import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import TaskElem from 'components/TasksList/TaskElem';
import { useAppDispatch, useAppSelector } from 'store';
import { getTaskById } from 'store/reducers/tasksReducer';

import c from './ViewTask.module.scss';

function ViewTask() {
	const { id } = useParams();
	const { task } = useAppSelector((state) => state.tasks);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (id) {
			dispatch(getTaskById(+id));
		}
	}, [id]);

	if (!task) return null;

	return (
		<div className={c.viewTask}>
			<div
				className={c.banner}
				style={{ backgroundImage: `url(${task.link_to_banner}` }}
			>
				<div className={c.bannerContent}>
					<h4 className={c.bannerTitle}>{task.bannerTitle}</h4>
					<p className={c.bannerText}>{task.bannerDescription}</p>
				</div>
			</div>
			<TaskElem task={task} isSubtasks />
		</div>
	);
}

export default ViewTask;
