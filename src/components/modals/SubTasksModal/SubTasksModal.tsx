import { useEffect, useState } from 'react';
import c from './SubTasksModal.module.scss';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from 'store';
import CheckCompleted from 'assets/icons/CheckCompleted';
import CheckDefault from 'assets/icons/CheckDefault';
import { changeChecking, changeCheckingToCheck, changeCheckingToCompleted, setIsDoneTrue } from 'store/reducers/tasksReducer';
import { ITask } from 'types/Task.types';
import { FetchUser } from 'api/user';
import { changeCoin } from 'store/reducers/userReducer';
import { setCompletedtasks, setTappyCoin } from 'store/reducers/userReducer';
import CheckingButton from 'components/CheckingButton';
interface SubTasksModalProps {
    isOpen: boolean;
    closeModal: () => void;
    id: number;
}

function SubTasksModal({ isOpen, closeModal, id }: SubTasksModalProps) {
    const dispatch = useAppDispatch();
    const { tasks } = useAppSelector((state) => state.tasks);
    const [active, setActive] = useState<'default' | 'show' | 'close'>('default');
    const { user } = useAppSelector((state) => state.user);
    console.log(user)
    useEffect(() => {
        if (isOpen) {
            setActive('show');
        }
    }, [isOpen]);
    const checkIsTaskCompleted = async (taskId:number) => {
		try {
			const result = await FetchUser.checkIsTaskCompleted(user.id, taskId, user.sign);
			
			console.log('checkIsTaskCompleted successful:', result);
			return result
		} catch (error) {
			console.error('checkIsTaskCompleted failed:', error);
		}
	};
    const handleCloseModal = () => {
        setActive('close');
        setTimeout(() => {
            setActive('default');
            closeModal();
        }, 300);
    };

    const task = tasks.find((elem) => elem.id === id);
  
    const findTaskById = (id: number): ITask | undefined => {
        return tasks.find(task => task.id === id);
    };

    const subtasks = task?.subtasks?.map(subtaskId => findTaskById(subtaskId)).filter(Boolean) as ITask[];
    console.log(user.completed_tasks.includes(14))
    return (
        <div
            className={classNames({
                [c.modal]: true,
                [c.isActive]: active === 'show',
                [c.isClose]: active === 'close',
            })}
            onClick={handleCloseModal}
        >
            <div
				className={c.modalContent}
				onClick={(event) => event.stopPropagation()}
			>
                <h2 className={c.modalContentTitle}>Tasks</h2>
                <ul className={c.list}>
                    {subtasks.map((subtask) => (
                        <li key={subtask.id}>
                            <button
                                className={classNames({
                                    [c.button]: true,
                                    [c.isDone]: user.completed_tasks.includes(subtask.id),
                                })}
                                onClick={() => {
                                    console.log(subtask)
                                    if (task){
                                    checkIsTaskCompleted(task?.id).then(json=>{
                                        if (!(user.completed_tasks.includes(subtask.id))){
                                            dispatch(changeCheckingToCheck(subtask.id))
                                        }
                                        if (json && typeof json == 'object' && Object.keys(json).includes('coins')){
                                        dispatch(setCompletedtasks(json.completed_tasks))
                                        dispatch(setTappyCoin(json.balance_in_tappycoin))
                                        dispatch(changeCoin(json.coins))
                                        dispatch(setIsDoneTrue(subtask.id))
                                        dispatch(changeCheckingToCompleted(subtask.id))
                                    }})}
                                  
                                    
                                }}
                            >
                                <img src={subtask.url} alt="no-image" />
                                <span>{subtask.title}</span>
                                
                                {user.completed_tasks.includes(subtask.id) ? <CheckCompleted /> : <CheckDefault />}
                                <a href={subtask.href} className="link" target="_blank" rel="noopener noreferrer">
                                    Open Link
                                </a>
                            </button>
                        </li>
                    ))}
                </ul>
                {task && task.checking !== 'default' ? (
					<CheckingButton
						classN={c.modalContentBtn}
						task={task}
						variant={task.checking}
						href=""
						multiple
					/>
				) : (
					<button className={c.modalContentBtn} onClick={handleCloseModal}>
						OKEY
					</button>
				)}
            </div>
        </div>
    );
}

export default SubTasksModal;
