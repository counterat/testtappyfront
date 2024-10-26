import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FetchUser } from 'api/user';
import { IUser } from 'types/user.types';

interface LeaderData {
  coins: number;
  name: string;
  url?:string
}

// Определение типа для каждого элемента массива
type LeaderRecord = Record<number, LeaderData>;

// Определение типа для всего массива лидеров
export type UserLeaderboard = LeaderRecord[];

const initialState: any = {
	leaders: [],
	loading: false,
};

const leaderboardSlice = createSlice({
	name: 'leaderboard',
	initialState,
	reducers: {
		setLeaders(state, action: PayloadAction<UserLeaderboard>) {
			state.leaders = action.payload;
		},
		
	},
	
});

export const { setLeaders } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;