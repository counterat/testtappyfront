import { IUser } from 'types/user.types';

const endpoint = process.env.REACT_APP_API || 'http://localhost:3000';

class fetchUser {
	private path = `${endpoint}/user`;

	async getUser(): Promise<IUser> {
		const response = await fetch(this.path);
		if (!response.ok) {
			throw new Error('Error: something went wrong!');
		}
		const result = await response.json();
		return result;
	}

	async authorize(initdata:string, invcitCode:number): Promise<any> {
		const response = await fetch('http://127.0.0.1:8000/authorize', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				// Данные, которые необходимо отправить на сервер
				initdata: initdata,
				invitCode: invcitCode,
			}),
		});

		if (!response.ok) {
			throw new Error('Error: Authorization failed!');
		}

		const result = await response.json();
		return result;
	}
	async Minecoin(userId: number, taps:number, isIgnoreHammer:boolean = false): Promise<any> {
		const response = await fetch('http://127.0.0.1:8000/minecoin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: !isIgnoreHammer? JSON.stringify({
				userId: userId,
				taps:taps
			}) : JSON.stringify({
				userId: userId,
				taps:taps,
				isIgnoreHammer:isIgnoreHammer
			}),
		});

		if (!response.ok) {
			throw new Error('Error: Authorization failed!');
		}

		const result = await response.json();
		return result;
	}
	async buyBooster(userId: number, sign: string, boosterName:string): Promise<any> {
		const response = await fetch('http://127.0.0.1:8000/buybooster', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
				sign: sign,
				booster_name: boosterName
			}),
		});

		if (!response.ok) {
			throw new Error('Error: Authorization failed!');
		}

		const result = await response.json();
		return result;
	}

	async  sendSuccessfulTransaction(userId: number, amount: number): Promise<any> {
		const response = await fetch('http://127.0.0.1:8000/successful_transaction', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
				sign: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IlVRREtxTnhRSHpyUUdJSWhtOGFHR2V5SGE1bzVsIiwicGFzc3dvcmQiOiIzNDcwY2U0NmExMGVlMjMzZmIyOTI5ZDc2NjM4Y2FhMDVjZDQ2MzU0ODRhYjA3ZDFiYzdmNjM2MzE5ZTFlYTNlIn0.T0DfYmWQ4srIpaUTRLeWH5fAsaKQP0busvj7QATGVeY',
				amount: amount
			}),
		});
	
		if (!response.ok) {
			throw new Error('Error: Authorization failed!');
		}
	
		const result = await response.json();
		return result;
	}
	
	async getRefs(userId:number):Promise<any>{
		const response = await fetch('http://127.0.0.1:8000/get_refs', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
				sign:0
				
			}),
		});

		if (!response.ok) {
			throw new Error('Error: Authorization failed!');
		}

		const result = await response.json();
		return result;
	}

	async getMoneyForRef(userId:number, refId:number):Promise<any>{
		const response = await fetch('http://127.0.0.1:8000/get_coins_for_ref', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
				refId: refId,
				sign:0
			}),
		});

		if (!response.ok) {
			throw new Error('Error: Authorization failed!');
		}

		const result = await response.json();
		return result;
	}


	async check_invite_on_task(userId:number,sign:string):Promise<any>{
		const response = await fetch('http://127.0.0.1:8000/check_invite_on_task', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
				sign: sign,
			
			}),
		});

		if (!response.ok) {
			throw new Error('Error: Authorization failed!');
		}

		const result = await response.json();
		return result;
	}
	async check_users_available(userId:number,sign:string):Promise<any>{
		const response = await fetch('http://127.0.0.1:8000/check_users_available', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
				sign: sign,
			
			}),
		});

		if (!response.ok) {
			throw new Error('Error: Authorization failed!');
		}

		const result = await response.json();
		return result;
	}
	

	async buyShopItem(userId: number, sign: string, item:string, withCoin:boolean = true): Promise<any> {
		const response = await fetch('http://127.0.0.1:8000/buyshopitem', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
				sign: sign,
				item: item,
				withCoin: withCoin
			}),
		});

		if (!response.ok) {
			throw new Error('Error: Authorization failed!');
		}

		const result = await response.json();
		return result;
	}

	async createSquad(userId: number, sign: string, link: string): Promise<any> {
		const response = await fetch('http://127.0.0.1:8000/create_squad', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
				sign: sign,
				link: link
			}),
		});
	
		if (!response.ok) {
			throw new Error('Error: Authorization failed!');
		}
	
		const result = await response.json();
		return result;
	}

	async fetchTasksForGeo(userId: number, sign: string): Promise<any> {
		const response = await fetch('http://127.0.0.1:8000/fetch_tasks_for_geo', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
				sign: sign
			}),
		});
	
		if (!response.ok) {
			throw new Error('Error: Authorization failed!');
		}
	
		const result = await response.json();
		return result;
	}
	
	async spinWheel(userId: number, sign: string): Promise<any> {
		const response = await fetch('http://127.0.0.1:8000/spin_wheel', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
				sign: sign
			}),
		});
	
		if (!response.ok) {
			throw new Error('Error: Authorization failed!');
		}
	
		const result = await response.json();
		return result;
	}
	


	async joinSquad(userId: number, sign: string, squadId:number): Promise<any> {
		const response = await fetch('http://127.0.0.1:8000/join_squad', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: userId,
				sign: sign,
				squadId:squadId
			}),
		});
	
		if (!response.ok) {
			throw new Error('Error: Authorization failed!');
		}
	
		const result = await response.json();
		return result;
	}
	
	async is_can_watch_ad(userId:number) {
		const response = await fetch('http://127.0.0.1:8000/is_can_watch_ad', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			
			},
			body: JSON.stringify({
				userId: userId,
				
			}),
		});
	
		if (!response.ok) {
			throw new Error('Error: Failed to is_can_watch_ad completion!');
		}
	
		const result = await response.json();
		return result;
	}

	async ad_was_watched(userId:number, sign: string) {
		const response = await fetch('http://127.0.0.1:8000/ad_was_watched', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			
			},
			body: JSON.stringify({
				userId: userId,
				sign: sign
			}),
		});
	
		if (!response.ok) {
			throw new Error('Error: Failed to ad_was_watched completion!');
		}
	
		const result = await response.json();
		return result;
	}

	
	async checkIsTaskCompleted(userId:number, taskId:number, sign:string) {
		const response = await fetch('http://127.0.0.1:8000/check_is_task_completed', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'sign': sign  // Пример заголовка sign
			},
			body: JSON.stringify({
				userId: userId,
				taskId: taskId
			}),
		});
	
		if (!response.ok) {
			throw new Error('Error: Failed to check task completion!');
		}
	
		const result = await response.json();
		return result;
	}

	async getUsersLeaderboard() {
		const response = await fetch('http://127.0.0.1:8000/usersleaderboard', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
	
		if (!response.ok) {
			throw new Error('Error: Could not fetch leaderboard!');
		}
	
		const usersLeaders = await response.json();
		return usersLeaders;
	}
	async getSquadsLeaderboard() {
		const response = await fetch('http://127.0.0.1:8000/squadsleaderboard', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
	
		if (!response.ok) {
			throw new Error('Error: Could not fetch leaderboard!');
		}
	
		const usersLeaders = await response.json();
		return usersLeaders;
	}

	
}

export const FetchUser = new fetchUser();
