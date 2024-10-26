import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LEADERBOARDSQUAD } from 'constants/leaderboardList';
import { ISquad } from 'types/Squad.types';

interface SquadsProps {
	squads: ISquad[];
}

const initialState: SquadsProps = {
	squads: LEADERBOARDSQUAD,
};

const squadsSlice = createSlice({
	name: 'user',
	initialState: { ...initialState },
	reducers: {
		createSquads(state, action) {
			state.squads = [...state.squads, action.payload];
		},
		setSquads(state, action) {
			state.squads = action.payload;
		},
	},
});

export const { createSquads, setSquads } = squadsSlice.actions;

export default squadsSlice.reducer;
