import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BoostType } from 'types/Boost.types';

export type TypeModalInviteName = 'shop' | 'earn more';
interface modalsProps {
	isModalCheckingStatus: {
		isOpen: boolean;
		isSuccess: boolean;
	};
	isModalSubtask: {
		isOpen: boolean;
		id: number | null;
	};
	isModalSquadState: {
		isOpen: boolean;
		name: string;
		isCreated: boolean;
	};
	isModalInvite: { isOpen: boolean; name: TypeModalInviteName };
	isModalPayment: boolean;
	isModalPaymentSuccess: { isOpen: boolean; isWallet: boolean };
	isModalInsufficientFunds: boolean;
	isModalPurchase: boolean;
	isModalBoostItem: { isOpen: boolean; name: BoostType };
	isModalTapBot: boolean;
	isModalDailyReward: boolean;
	isModalPrize: { isOpen: boolean; isTicket: boolean };
}

const initialState: modalsProps = {
	isModalCheckingStatus: {
		isOpen: false,
		isSuccess: false,
	},
	isModalSubtask: {
		isOpen: false,
		id: null,
	},
	isModalSquadState: {
		isOpen: false,
		name: '',
		isCreated: false,
	},
	isModalInvite: { isOpen: false, name: 'earn more' },
	isModalPayment: false,
	isModalPaymentSuccess: { isOpen: false, isWallet: false },
	isModalInsufficientFunds: false,
	isModalPurchase: false,
	isModalBoostItem: { isOpen: false, name: 'multitap' },
	isModalTapBot: false,
	isModalDailyReward: false,
	isModalPrize: { isOpen: false, isTicket: false },
};

const modalsSlice = createSlice({
	name: 'modals',
	initialState,
	reducers: {
		changeIsModalCheckingStatus(state, action: PayloadAction<boolean>) {
			if (action.payload) {
				state.isModalCheckingStatus = {
					isOpen: true,
					isSuccess: true,
				};
			} else {
				state.isModalCheckingStatus = {
					isOpen: false,
					isSuccess: false,
				};
			}
		},
		changeIsModalSubtask(
			state,
			action: PayloadAction<{
				isOpen: boolean;
				id: number;
			}>
		) {
			if (action.payload.isOpen) {
				state.isModalSubtask = {
					isOpen: true,
					id: action.payload.id,
				};
			} else {
				state.isModalSubtask = {
					isOpen: false,
					id: null,
				};
			}
		},
		changeIsModalSquadState(
			state,
			action: PayloadAction<{
				isOpen: boolean;
				name?: string;
				isCreated?: boolean;
			}>
		) {
			if (action.payload.isOpen) {
				state.isModalSquadState = {
					isOpen: true,
					name: action.payload.name!,
					isCreated: action.payload.isCreated!,
				};
			} else {
				state.isModalSquadState = { isOpen: false, name: '', isCreated: false };
			}
		},
		changeIsModalInvite(
			state,
			action: PayloadAction<{ isOpen: boolean; name?: TypeModalInviteName }>
		) {
			if (action.payload.isOpen) {
				state.isModalInvite.isOpen = true;
				state.isModalInvite.name = action.payload.name
					? action.payload.name
					: 'earn more';
			} else {
				state.isModalInvite.isOpen = false;
				state.isModalInvite.name = 'earn more';
			}
		},
		changeIsModalPayment(state, action: PayloadAction<boolean>) {
			if (action.payload) {
				state.isModalPayment = true;
			} else {
				state.isModalPayment = false;
			}
		},
		changeIsModalPaymentSuccess(
			state,
			action: PayloadAction<{ isOpen: boolean; isWallet?: boolean }>
		) {
			if (action.payload.isOpen) {
				state.isModalPaymentSuccess = {
					isOpen: action.payload.isOpen,
					isWallet: action.payload.isWallet ? true : false,
				};
			} else {
				state.isModalPaymentSuccess = {
					isOpen: false,
					isWallet: false,
				};
			}
		},
		changeIsModalInsufficientFunds(state, action: PayloadAction<boolean>) {
			if (action.payload) {
				state.isModalInsufficientFunds = true;
			} else {
				state.isModalInsufficientFunds = false;
			}
		},
		changeIsModalPurchase(state, action: PayloadAction<boolean>) {
			if (action.payload) {
				state.isModalPurchase = true;
			} else {
				state.isModalPurchase = false;
			}
		},
		changeIsModalBoostItem(
			state,
			action: PayloadAction<{
				isOpen: boolean;
				name?: 'multitap' | 'tapBot' | 'energy';
			}>
		) {
			if (action.payload.isOpen) {
				state.isModalBoostItem = {
					isOpen: true,
					name: action.payload.name!,
				};
			} else {
				state.isModalBoostItem = { isOpen: false, name: 'multitap' };
			}
		},
		changeIsModalTapBot(state, action) {
			state.isModalTapBot = action.payload;
		},
		changeIsModalDailyReward(state, action: PayloadAction<boolean>) {
			if (action.payload) {
				state.isModalDailyReward = true;
			} else {
				state.isModalDailyReward = false;
			}
		},
		changeIsModalPrize(
			state,
			action: PayloadAction<{
				isOpen: boolean;
				isTicket?: boolean;
			}>
		) {
			if (action.payload.isOpen) {
				state.isModalPrize.isOpen = true;
				state.isModalPrize.isTicket = action.payload.isTicket || false;
			} else {
				state.isModalPrize.isOpen = false;
				state.isModalPrize.isTicket = false;
			}
		},
	},
});

export const {
	changeIsModalCheckingStatus,
	changeIsModalSubtask,
	changeIsModalSquadState,
	changeIsModalInvite,
	changeIsModalPayment,
	changeIsModalPaymentSuccess,
	changeIsModalInsufficientFunds,
	changeIsModalPurchase,
	changeIsModalBoostItem,
	changeIsModalTapBot,
	changeIsModalDailyReward,
	changeIsModalPrize,
} = modalsSlice.actions;

export default modalsSlice.reducer;
