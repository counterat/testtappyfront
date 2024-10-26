import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PRIZES } from 'constants/fortune';
import { IPrize } from 'types/Wheel.type';

interface SquadsProps {
	prize: IPrize | null;
	loading: boolean;
}

const initialState: SquadsProps = {
	prize: null,
	loading: true,
};

const wheelSlice = createSlice({
	name: 'wheel',
	initialState: { ...initialState },
	reducers: {
		setPrize(state, action: PayloadAction<number>) {
			state.prize = PRIZES[action.payload];
		},
		setLoading(state) {
			state.loading = false;
		},
	},
});

export const { setPrize, setLoading } = wheelSlice.actions;

export default wheelSlice.reducer;
