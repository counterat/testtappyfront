export const checkPlace = (place: number, className: string) => {
	switch (place) {
		case 1:
			return (
				<img
					src="/assets/leaderboard/first.png"
					alt="1st"
					className={className}
				/>
			);
		case 2:
			return (
				<img
					src="/assets/leaderboard/second.png"
					alt="2nd"
					className={className}
				/>
			);
		case 3:
			return (
				<img
					src="/assets/leaderboard/third.png"
					alt="3rd"
					className={className}
				/>
			);
		default:
			return <span>{place}</span>;
	}
};
