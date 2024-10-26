import React from 'react';

import c from './Selector.module.scss';
import classNames from 'classnames';

interface SelectorProps {
	selected: 'users' | 'squads';
	setSelected: (value: 'users' | 'squads') => void;
}

function Selector({ setSelected, selected }: SelectorProps) {
	return (
		<div className={c.wrapper} data-position={selected === 'users'}>
			<button
				type="button"
				className={classNames({
					[c.btn]: true,
					[c.active]: selected === 'users',
				})}
				onClick={() => setSelected('users')}
			>
				top users
			</button>
			<button
				type="button"
				className={classNames({
					[c.btn]: true,
					[c.active]: selected === 'squads',
				})}
				onClick={() => setSelected('squads')}
			>
				top squads
			</button>
		</div>
	);
}

export default Selector;
