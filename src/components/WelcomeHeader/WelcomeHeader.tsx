import DiscordIcon from 'assets/icons/DiscordIcon';
import TwitterIcon from 'assets/icons/TwitterIcon';
import TelegramIcon from 'assets/icons/TelegramIcon';

import c from './WelcomeHeader.module.scss';

function WelcomeHeader() {
	return (
		<div className={c.header}>
			<a
				target="_blank"
				href="https://discord.gg/2CaWfT6P"
				className={c.headerLink}
				rel="noreferrer"
			>
				<DiscordIcon />
			</a>
			<a
				target="_blank"
				href="https://x.com/tappybirdd?s=21"
				className={c.headerLink}
				rel="noreferrer"
			>
				<TwitterIcon />
			</a>
			<a
				target="_blank"
				href="https://t.me/tappy_bird"
				className={c.headerLink}
				rel="noreferrer"
			>
				<TelegramIcon />
			</a>
		</div>
	);
}

export default WelcomeHeader;
