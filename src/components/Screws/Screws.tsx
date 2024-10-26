import ScrewsIcon from 'assets/icons/ScrewsIcon';

import c from './Screws.module.scss';

function Screws() {
	return (
		<div className={c.screws}>
			<ScrewsIcon />
			<ScrewsIcon />
		</div>
	);
}

export default Screws;
