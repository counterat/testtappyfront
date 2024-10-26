import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';



const initialState = {
	isRedirected: false,
};

const isRedirectSlice = createSlice({
	name: 'isRedirect',
	initialState: { ...initialState },
	reducers: {
       setIsRedirected(state, action: PayloadAction<boolean>){
        state.isRedirected = true
       }
		
	},
});

export const {setIsRedirected } = isRedirectSlice.actions;

export default isRedirectSlice.reducer;
