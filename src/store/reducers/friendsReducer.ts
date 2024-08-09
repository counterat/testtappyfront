import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IFriend } from 'types/Task.types';

interface FriendsProps {
	friends: IFriend[];
}

const initialState: FriendsProps = {
	friends: [],
};

const friendsSlice = createSlice({
	name: 'friends',
	initialState: { ...initialState },
	reducers: {
        setFriends(state, action){
            state.friends = action.payload
        },
        setCoinsToZero(state,action){
            state.friends.map((friend)=>{
                if (friend.id == action.payload){

                friend.coin = 0
                return friend
            }
            })
        }

		
	},
});

export const { setCoinsToZero, setFriends } = friendsSlice.actions;

export default friendsSlice.reducer;
