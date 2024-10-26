import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FetchUser } from 'api/user';
import { IBird } from 'types/Inventory.types';
import { IUser } from 'types/user.types';

interface UserProps {
	user: IUser;
	loading: boolean;
}

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
	const data = await FetchUser.getUser();
	return data;
});

/* {
    "id": 9324238,
    "telegram_id": 2323232,
    "name": "testname",
    "username": "testusername",
    "in_squad": null,
    "invitation_code": 1309364648,
    "invited_users": [],
    "times_multitap_was_used": 0,
    "times_max_energy_was_used": 0,
    "times_autoclicker_was_used": 0,
    "sign": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMyMzIzMiwicGFzc3dvcmQiOiI3NjFlY2UyNC1hOTcyLTRmMzktYmVkOC1hMzNmODVhZGRiMTgifQ.jhTFPwmaVyeIh67zB4n-VQGPEvo4tDVOeAOSZjWRARw",
    "balance_in_ton": "0",
    "balance_in_tappycoin": "0",
    "geo": null,
    "inventory": "{}",
    "created_at": "2024-06-05 00:32:13.841096",
    "boosters": {
        "multitap": {},
        "max_energy": {},
        "autoclicker": {}
    },
    "coins": 0,
    "energy": 5000,
    "last_hundred_clicks": [],
    "hammers": {
        "stone_hammer": {},
        "gold_hammer": {},
        "diamond_hammer": {}
    },
    "current_level_of_egg": 1,
    "last_updated": null
}
 */
const initialState: UserProps = {
	user: {

		id: 0,
		users_available: 0 ,
		username: '',
		coin: 100000,
		level: 1,
		exp: 990,
		limitExp: 1000,
		energy: 5000,
		limitEnergy: 5000,
		tap: 1,
		sign: '',
		boosters:{},
		hammers:{},
		squad: null,
		completed_tasks:[],
		balance_in_tappycoin:0,
		inviteLink:'',
		birds: [],
		photo_url: 'https://telegra.ph/file/99e7fb4ff14703f8d0d7f.png',
		isHammer:false,
		ticket: 0,
		isCanWatchAd: false
	},
	loading: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState: { ...initialState },
	reducers: {
		set_users_available(state, action:  PayloadAction<number>){
			state.user.users_available = action.payload
		},
		setisCanWatchAd(state, action: PayloadAction<boolean>){
			state.user.isCanWatchAd = action.payload
		},
		setIsHammer(state, action:PayloadAction<boolean>){
			state.user.isHammer = action.payload
		},
		setTickets(state, action){
			state.user.ticket = action.payload
		},
		changeTicket(state) {
			state.user.ticket = state.user.ticket - 1;
		},
		setTap(state, action:PayloadAction<number>){
			state.user.tap = action.payload
		},
		setPhotoUrl(state, action:PayloadAction<string>){
			state.user.photo_url = action.payload
		},

		setUsername(state, action:PayloadAction<string>){
			state.user.username = action.payload
		},
		setUsersBirds(state, action:PayloadAction<IBird[]>){
			state.user.birds = action.payload
		},

		setInviteLink(state, action:PayloadAction<string>){
			state.user.inviteLink = action.payload
		},

		setLimitenergy(state, action:PayloadAction<number>){
			state.user.limitEnergy = action.payload
		},
		setBoosters(state, action: PayloadAction<object>){
			state.user.boosters = action.payload
		},
		setTappyCoin(state, action:PayloadAction<number>){
			state.user.balance_in_tappycoin = action.payload
		},

		setHammers(state, action: PayloadAction<object>){
			state.user.hammers = action.payload
		},
		setSign(state, action: PayloadAction<string>){
			state.user.sign = action.payload
		},
		setLimitExp(state, action: PayloadAction<number>){
			state.user.limitExp = action.payload
		},
		setUser(state, action: PayloadAction<IUser>) {
			state.user = action.payload;
		},
		changeEnergy(state, action: PayloadAction<number>) {
			state.user.energy = action.payload;
		},
		changeExp(state, action: PayloadAction<number>) {
			state.user.exp = action.payload;
		},
		changeLevel(state, action: PayloadAction<number>) {
			state.user.level = action.payload;
		},
		changeCoin(state, action: PayloadAction<number>) {
			state.user.coin = action.payload;
		},
		setUserId(state, action: PayloadAction<number>) {
			state.user.id = action.payload;
		},
		setLevel(state, action: PayloadAction<number>) {
			state.user.level = action.payload;
		},
		setCompletedtasks(state, action:PayloadAction<number[]>){
			state.user.completed_tasks = action.payload
		},

		changeSquad(state, action) {
			state.user.squad = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUser.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(
			fetchUser.fulfilled,
			(state, action: PayloadAction<IUser>) => {
				state.loading = false;
				state.user = action.payload;
			}
		);
	},
});

export const {setBoosters, set_users_available, setisCanWatchAd, setTickets, changeTicket, setIsHammer, setTap, setPhotoUrl, setUsername, setUsersBirds, setInviteLink , setLimitenergy, setTappyCoin, setCompletedtasks, changeSquad, setHammers, setSign, setLimitExp, changeEnergy, setUserId, changeExp, changeLevel, changeCoin , setLevel, setUser} =
	userSlice.actions;

export default userSlice.reducer;
