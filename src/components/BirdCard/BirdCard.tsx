import { IBird } from 'types/Inventory.types';

import c from './BirdCard.module.scss';
import classNames from 'classnames';

interface BirdCardProps {
	bird: IBird;
	paddingType?: 'claim' | undefined;
}

function BirdCard({ bird, paddingType = undefined }: BirdCardProps) {
	console.log(window.location);

	return (
		<div
			className={c.card}
			style={
				bird.tier.toLowerCase() === 'exclusive'
					? {
							background: 'linear-gradient(180deg, #c376ff 0%, #8308ff 100%)',
					  }
					: {}
			}
		>
			<div
				className={c.cardImageWrapper}
				style={{
					background: `url('${bird.src}') center/cover no-repeat`,
				}}
			/>
			<div
				className={classNames({
					[c.cardContent]: true,
					[c.otherPadding]: paddingType === 'claim',
				})}
			>
				<h3 className={c.cardContentTitle}>{bird.title}</h3>
				<div
					className={c.cardContentTier}
					style={
						bird.tier.toLowerCase() === 'exclusive'
							? {
									background:
										'linear-gradient(180deg, #ef3cff 0%, #d52bff 100%)',
							  }
							: {}
					}
				>
					{bird.tier}
				</div>
			</div>
		</div>
	);
}

export default BirdCard;
