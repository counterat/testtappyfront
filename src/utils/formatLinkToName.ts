export const formatLinks = (link: string) => {
	if (link.includes('t.me/')) {
		return link.substring(5, link.length);
	}

	return link;
};
