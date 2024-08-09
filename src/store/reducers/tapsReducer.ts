import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IFriend } from 'types/Task.types';

interface FriendsProps {
	tap: number;
}

const initialState: FriendsProps = {
	tap:0,
};



const tapsSlice = createSlice({
	name: 'tap',
	initialState: { ...initialState },
	reducers: {
        setTaps(state, action){
            state.tap = action.payload
        },
        addTap(state){
            state.tap += 1
        }
        }

		
	},
);

export const { setTaps, addTap } = tapsSlice.actions;

export default tapsSlice.reducer;
