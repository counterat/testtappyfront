import HeaderField from 'components/ShopHeader';
import GoBack from 'components/GoBack';
import ProfileInfo from 'components/ProfileInfo';
import BirdCard from 'components/BirdCard';
import { useAppSelector } from 'store';

import c from './InventoryPage.module.scss';
import { useMemo } from 'react';

function InventoryPage() {
	
	const { user } = useAppSelector(state=>state.user);

	return (
		<div className={c.container}>
			<div className={c.inventory}>
				<HeaderField
					title="inventory"
					src="/assets/backpack.png"
					imageStyle={c.image}
					titleStyle={c.title}
				/>
				<ProfileInfo />
				<div className={c.cards}>
					{user.birds.map((bird) => (
						<BirdCard key={bird.id} bird={bird} />
					))}
				</div>
				<GoBack />
			</div>
		</div>
	);
}

export default InventoryPage;
