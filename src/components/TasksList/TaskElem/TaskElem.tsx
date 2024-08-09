import CheckingButton from 'components/CheckingButton';
import { ITask, TypeChecking } from 'types/Task.types';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store';
import c from './TaskElem.module.scss';
import classNames from 'classnames';

interface TaskElemProps {
	task: ITask;
	isLinked?: boolean;
	isSubtasks?: boolean;
}

function TaskElem({
	task,
	isLinked = false,
	isSubtasks = false,
}: TaskElemProps) {
	const { tasks } = useAppSelector((state) => state.tasks);
	const navigate = useNavigate();
	const { user } = useAppSelector((state) => state.user);
	function findTaskById(id:number) {
		return tasks.find(task => task.id === id);
	}
	if (task.subtasks){
	task.subtasks.map((subtask) =>{
		console.log(subtask)
	})}
	
	return (
		<div
			className={classNames({
				[c.task]: true,
				[c.isLinked]: isLinked,
			})}
			onClick={isLinked ? () => navigate(`/earn-more/${task.id}`) : () => {}}
		>
			<div className={c.taskHeader}>
				<div className={c.taskHeaderLeft}>
					<h4>{task.title}</h4>
					<p>{task.description}</p>
				</div>
				<div className={c.taskHeaderRight}>
					<img src={task.url} alt="" />
				</div>
			</div>
			{task.subtasks &&
				task.subtasks.length > 0 &&
				(isSubtasks ? (
					 <ul className="subtasks">
            {task.subtasks.map(subtaskId => {
                const subtask = findTaskById(subtaskId);
                if (subtask) {
                    return (
                        <li key={subtask.id}>{subtask.title}</li>
                    );
                } else {
                    return null;
                }
            })}
        </ul>
				) : (
					<span className={c.dots}>...</span>
				))}
			<div className={c.taskActions}>
				<div className={c.taskActionsLeft}>
					<span>reward</span>
					{task.reward_in_tappy == 0 ? <span>{task.reward}</span> : <span>{task.reward_in_tappy}</span> }
					{task.reward_in_tappy == 0 ?
						<img src="/assets/coin.png" alt="" />
						: "$TAPPY"
					}
				</div>
				<CheckingButton
					variant={user.completed_tasks.includes(task.id) ? 'completed' as TypeChecking :  task.checking as TypeChecking}
					task={task}
					multiple={task.subtasks && task.subtasks.length !== 0}
					href={task.href || '#'}
				/>
			</div>
		</div>
	);
}

export default TaskElem;
