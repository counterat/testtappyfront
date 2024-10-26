import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { TASKSLIST } from 'constants/cardsList';
import { ITask, TypeChecking } from 'types/Task.types';

interface tasksProps {
	tasks: ITask[];
	task: ITask | undefined;
}

// Потом удалить
const stateChecking = ['default', 'check', 'checking', 'completed'];

const initialState: tasksProps = {
	tasks: [],
	task: undefined,
};

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		changeChecking(state, action: PayloadAction<number>) {
			state.tasks.map((task) => {
				if (task.id === action.payload) {
					const index = stateChecking.findIndex(
						(item) => item === task.checking
					);
					task.checking = stateChecking[index + 1] as TypeChecking;

					return task;
				}

				return task;
			});

			if (state.task && state.task.id === action.payload) {
				const index = stateChecking.findIndex(
					(item) => item === state.task!.checking
				);
				state.task.checking = stateChecking[index + 1] as TypeChecking;
			}
		},
		changeCheckingToCheck(state, action: PayloadAction<number>) {
			state.tasks.map((task) => {
				if (task.id === action.payload) {
					
					task.checking = 'check' as TypeChecking;

					return task;
				}

				return task;
			});
		},
		changeCheckingToCompleted(state, action: PayloadAction<number>) {
			state.tasks.map((task) => {
				if (task.id === action.payload) {
					
					task.checking = 'completed' as TypeChecking;

					return task;
				}

				return task;
			});
		},


		getTaskById(state, action: PayloadAction<number>) {
			if (action.payload) {
				state.task = state.tasks.find((task) => task.id === action.payload);
			}
		},
		setIsDoneTrue(state, action: PayloadAction<number>) {
			const task = state.tasks.find((task) => task.id === action.payload);
			if (task) {
			  task.isDone = true;
			}
		  },

		setTasks(state, action: PayloadAction<ITask[]>){
			state.tasks = action.payload
		}
	},
});

export const { setTasks, changeCheckingToCheck, changeCheckingToCompleted, setIsDoneTrue, changeChecking, getTaskById } =
	tasksSlice.actions;

export default tasksSlice.reducer;
