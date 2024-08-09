import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { BIRDLIST } from 'constants/cardsList';
import { IBird } from 'types/Inventory.types';

interface InventoryProps {
	birds: IBird[];
}

const initialState: InventoryProps = {
	birds: BIRDLIST,
};

const inventorySlice = createSlice({
	name: 'inventory',
	initialState,
	reducers: {
		setBirds(state, action: PayloadAction<IBird>) {
			state.birds = [...state.birds, action.payload];
		},
	},
});

export const { setBirds } = inventorySlice.actions;

export default inventorySlice.reducer;
