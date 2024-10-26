export const formatCoin = (coin: number) => {
	const coinStr = coin.toString();
	if (coinStr.length <= 4) {
		return coin;
	}

	let result = '';

	for (let i = coinStr.length - 1, count = 1; i >= 0; i--, count++) {
		result = coinStr[i] + result;
		if (count % 3 === 0 && i !== 0) {
			result = ' ' + result;
		}
	}

	return result;
};

export const formatCoinLeader = (coin: number) => {
	if (coin >= 1e6) {
		return (coin / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
	} else if (coin >= 1e3) {
		return (coin / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
	} else {
		return coin.toString();
	}
};
