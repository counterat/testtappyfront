import { IBird } from "./Inventory.types";

export type IUser = {
	id: number;
	username: string;
	coin: number;
	level: number;
	exp: number;
	limitExp: number;
	energy: number;
	limitEnergy: number;
	tap: number;
	sign:string;
	boosters: Record<string, any>; // Используем Record для определения типа
	hammers: Record<string, any>;
	squad:number|null,
	completed_tasks: number[],
	balance_in_tappycoin:number,
	inviteLink : string,
	birds:IBird[],
	photo_url:string,
	isHammer?:boolean,
	ticket: number;
	isCanWatchAd: boolean;
	users_available: number
};
