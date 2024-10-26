export function getCurrentUTCDate() {
	const now = new Date();
	const year = now.getUTCFullYear();
	const month = String(now.getUTCMonth() + 1).padStart(2, '0');
	const day = String(now.getUTCDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}

export function canReceiveReward() {
	const lastRewardDate = localStorage.getItem('lastRewardDateUTC');
	const currentDate = getCurrentUTCDate();

	return lastRewardDate !== currentDate;
}
