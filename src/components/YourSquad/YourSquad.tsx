import { useNavigate } from 'react-router-dom';
import c from './YourSquad.module.scss';
import classNames from 'classnames';

interface YourSquadProps {
	isLinked?: boolean;
}

function YourSquad({ isLinked = false }: YourSquadProps) {
	const navigate = useNavigate();

	return (
		<div
			className={classNames({
				[c.squad]: true,
				[c.isLinked]: isLinked,
			})}
			onTouchEnd={(event) => {
				event.stopPropagation();
			}}
			onClick={() => {
				if (isLinked) navigate('/squads');
			}}
		>
			<div className={c.squadIconWrapper}>
				<img src="/assets/sword 1.png" alt="sword" className={c.squadIcon} />
			</div>
			<p className={c.squadTxt}>Your squad</p>
			<div className={c.squadIconWrapperRight}>
				<img src="/assets/sword 1.png" alt="sword" className={c.squadIcon} />
			</div>
		</div>
	);
}

export default YourSquad;
