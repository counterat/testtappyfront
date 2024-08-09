import GoBack from 'components/GoBack';
import ShopBody from 'components/ShopBody';
import HeaderField from 'components/ShopHeader';

import c from './ShopPage.module.scss';

function ShopPage() {
	return (
		<div className={c.container}>
			<div className={c.shop}>
			<HeaderField title="Shop" src="/assets/shop/header.png" />
				<ShopBody />
				<GoBack />
			</div>
		</div>
	);
}

export default ShopPage;
