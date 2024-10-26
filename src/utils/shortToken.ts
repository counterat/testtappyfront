export function shortenToken(token: string) {
	if (token.length > 8) {
		return `${token.slice(0, 4)}...${token.slice(-4)}`;
	} else {
		return token;
	}
}
