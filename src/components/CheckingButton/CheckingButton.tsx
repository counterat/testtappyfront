import classNames from 'classnames';
import { MouseEvent, useCallback, useEffect, useMemo } from 'react';

import CheckDefault from 'assets/icons/CheckDefault';
import CheckCompleted from 'assets/icons/CheckCompleted';
import CheckDisabled from 'assets/icons/CheckDisabled';

import c from './CheckingButton.module.scss';
import { useAppDispatch } from 'store';
import {
	changeIsModalCheckingStatus,
	changeIsModalSubtask,
} from 'store/reducers/modalsReducer';
import { changeChecking, changeCheckingToCheck, changeCheckingToCompleted } from 'store/reducers/tasksReducer';
import { ITask } from 'types/Task.types';
import { useAppSelector } from 'store';
import { FetchUser } from 'api/user';
import { set_users_available, setCompletedtasks, setisCanWatchAd, setTickets } from 'store/reducers/userReducer';
import { setTappyCoin, changeCoin } from 'store/reducers/userReducer';
import { ShowPromiseResult } from 'types/adsgram';
import { useAdsgram } from 'hooks/useAdsGram';
interface CheckingButtonProps {
	classN?: string;
	variant: 'default' | 'check' | 'checking' | 'completed';
	task: ITask;
	multiple?: boolean;
	href: string;
	isAdTask?: boolean;
	isinviteTask? : boolean
}

function CheckingButton({
	classN = '',
	variant,
	task,
	multiple = false,
	href,
	isAdTask = false,
	isinviteTask = false
}: CheckingButtonProps) {
	
	const dispatch = useAppDispatch();
	const { tasks } = useAppSelector((state) => state.tasks);
	const { user } = useAppSelector((state) => state.user);
	const checkIsTaskCompleted = async () => {
		try {
			const result = await FetchUser.checkIsTaskCompleted(user.id, task.id, user.sign);
			
			console.log('checkIsTaskCompleted successful:', result);
			return result
		} catch (error) {
			console.error('checkIsTaskCompleted failed:', error);
		}
	};
	function findTaskById(id:number) {
		return tasks.find(task => task.id === id);
	}
	const className = classNames({
		[c.button]: true,
		[classN]: classN !== '',
		[c.check]: variant === 'check',
		[c.checking]: variant === 'checking',
		[c.completed]: variant === 'completed',
	});

	const ChangeValue = useMemo(() => {
		switch (variant) {
			case 'check':
				return {
					icon: <CheckDefault />,
					value: 'check',
				};
			case 'checking':
				return {
					icon: <CheckDisabled />,
					value: 'checking..',
				};
			case 'completed':
				return {
					icon: <CheckCompleted />,
					value: 'completed',
				};
			default:
				return {
					icon: null,
					value: 'start',
				};
		}
	}, [variant]);

	const checkCount = useMemo(() => {
		if (task.subtasks) {
			const subtasks:ITask[] = []
			task.subtasks.map(subtaskId => {
				const subtask = findTaskById(subtaskId);
				if (subtask){
				subtasks.push(subtask)}
			})
			return subtasks.filter((subtask) => user.completed_tasks.includes(subtask.id)).length;
		}
		return null;
	}, [task]);
		
	const is_can_watch_ad = async()=>{
		try {
			const result = await FetchUser.is_can_watch_ad(user.id);

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
	const check_invite_on_task = async () => {
		try {
			const result = await FetchUser.check_invite_on_task(user.id, user.sign);

			console.log('check_invite_on_task request successful:', result);
			return result;
		} catch (error) {
			console.error('check_invite_on_task request failed:', error);
		}
	};
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
	  const invitetaskhandler = () =>{
		if (user.users_available < 5){
			return 
		} 
		check_invite_on_task().then(json=>{
			if (json){
				dispatch(set_users_available(json.users_available.length))
			}
		})

	  }
	const handleClick = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			console.log([task, task.checking])
			if (task.checking === 'completed') {
				return;
			}
			/* if (task.checking === 'checking') {
				checkIsTaskCompleted().then(json=>{
					if (json){
					dispatch(setCompletedtasks(json.completed_tasks))
					
					dispatch(setTappyCoin(json.balance_in_tappycoin))
					dispatch(changeCoin(json.coins))
				}})
				dispatch(changeIsModalCheckingStatus(true));
			} 
		 */

			if (!(user.completed_tasks.includes(task.id))) {
				const anchor = document.createElement('a');
				anchor.href = href;
				
				anchor.target = '_blank';
				anchor.click();
				dispatch(changeCheckingToCheck(task.id))
				checkIsTaskCompleted().then(json=>{
					console.log(json)
					if (!(json)){
			
						const anchor = document.createElement('a');
				anchor.href = href;
				
				anchor.target = '_blank';
				anchor.click();
				
					}
					else{
						console.log(Object.keys(json))
					
						if ( Object.keys(json).includes('coins')){
						
						dispatch(setCompletedtasks(json.completed_tasks))
						dispatch(setTappyCoin(json.balance_in_tappycoin))
							dispatch(changeCoin(json.coins))
							dispatch(changeCheckingToCompleted(task.id))
						
					}}
				})
				
			}
			if (task.checking == 'default'){
			dispatch(changeChecking(task.id));
		}},
		[task]
	);

	const handleClickSubtask = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			event.stopPropagation();
	
			checkIsTaskCompleted().then(json=>{
				if (json){
				dispatch(setCompletedtasks(json.completed_tasks))
				dispatch(setTappyCoin(json.balance_in_tappycoin))
					dispatch(changeCoin(json.coins))
			}})
			if (task.checking === 'completed') return;

			if (task.checking === 'checking') {
				
				dispatch(changeIsModalCheckingStatus(true));
				dispatch(changeChecking(task.id));
				return;
			}

			if (task.checking === 'check') {
				dispatch(changeChecking(task.id));
				return;
			}

			dispatch(
				changeIsModalSubtask({
					isOpen: true,
					id: task.id,
				})
			);
		},
		[task]
	);

	useEffect(() => {
		if (task.checking === 'default' && checkCount === task.subtasks?.length) {
			dispatch(changeChecking(task.id));
		}
	}, [checkCount, task]);

	if (multiple) {
		
		return (
			<button className={className} onClick={handleClickSubtask}>
				{ChangeValue.icon}
				<span>
				
				
						{`${checkCount}/${task.subtasks?.length}`}
				</span>
			</button>
		);
	}

	return (
		<button className={className} onClick={!isAdTask && !isinviteTask ?  handleClick : isAdTask ? showAd : invitetaskhandler}>
			{!isAdTask && !isinviteTask ? ChangeValue.icon : isAdTask ? 'WATCH' :  `${user.users_available}/5`}
			{!isAdTask  && <span>{ChangeValue.value}</span>}
		</button>
	);
}

export default CheckingButton;
