import CopyIcon from 'assets/icons/CopyIcon';

import c from './FooterModalInvite.module.scss';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

interface FooterModalInviteProps {
	name: string;
	links: {
		path: string;
		text: string;
	};
}

function FooterModalInvite({ name, links }: FooterModalInviteProps) {
	const [isCopy, setIsCopy] = useState(false);

	useEffect(() => {
		if (isCopy) {
			setTimeout(() => {
				setIsCopy(false);
			}, 1500);
		}
	}, [isCopy]);
	console.log(links);
	return (
		<div className={c.footer}>
			<a
				className={c.footerBtn}
				href={`https://telegram.me/share/url?url=${links.path}&text=${links.text}`}
			>
				<img
					src="/assets/earn-more/friend.png"
					alt="friend"
					className={c.footerBtnImage}
				/>
				<span>Invite Friends</span>
			</a>
			<div className={c.footerInvite}>
				<span>{name}</span>
				<button
					onClick={() => {
						setIsCopy(true);
						console.log(links.path);
						navigator.clipboard.writeText(links.path);
					}}
				>
					<span
						className={classNames({
							[c.clipboard]: true,
							[c.show]: isCopy,
						})}
					>
						Copied
					</span>
					<CopyIcon />
				</button>
			</div>
		</div>
	);
}

export default FooterModalInvite;
