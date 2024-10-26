import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { NAVIGATIONLIST } from 'constants/navigationList';
import { useAppSelector } from 'store';

import c from './GameFooter.module.scss';

function GameFooter() {
	const { energy, limitEnergy } = useAppSelector((state) => state.user.user);
	const { user } = useAppSelector((state) => state.user);

	const { tasks } = useAppSelector((state) => state.tasks);
	console.log(tasks)
	return (
		<div className={c.footer}>
			<div className={c.footerIcon}>
				<img src="/assets/energy.png" alt="energy" />
			</div>
			<div className={c.footerEnergyBar}>
				<div
					className={c.footerEnergyBarStrip}
					style={{ width: `${(energy * 100) / user.limitEnergy}%` }}
				/>
				<div className={c.footerEnergyBarTxt}>
					{energy}/{user.limitEnergy}
				</div>
			</div>
			<div
				onTouchEnd={(event) => event.stopPropagation()}
				style={{ zIndex: 10 }}
			>
				<ul className={c.footerList}>
					{NAVIGATIONLIST.map((elem) => (
						<li
							key={elem.id}
							className={classNames({
								[c.footerListElem]: true,
								[c.elemEnd]: elem.id === 3 || elem.id === 4,
							})}
						>
							<div className={c.footerListElemImageWrapper}>
								<img
									src={elem.icon}
									alt={elem.title}
									className={c.footerListElemImage}
								/>
							</div>
							<span className={c.footerListElemTxt}>{elem.title}</span>
							{elem.title === 'earn more' &&
								!tasks.every((task) => user.completed_tasks.includes( task.id)) && (
									<img
										src="/assets/notif.png"
										alt="notif"
										className={c.footerListElemNotification}
									/>
								)}
							<Link to={elem.link} className="link" />
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default GameFooter;
