import { LIST } from 'constants/welcomeList';

import c from './WelcomeBody.module.scss';

function WelcomeBody() {
	return (
		<div className={c.body}>
			<ul className={c.list}>
				{LIST.map((elem) => (
					<li key={elem.id} className={c.listElem}>
						<img src={elem.icon} alt={elem.title} className={c.listElemIcon} />
						<div className={c.listElemRight}>
							<h3 className={c.listElemRightTitle}>{elem.title}</h3>
							<span className={c.listElemRightSubtitle}>{elem.subtitle}</span>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default WelcomeBody;
