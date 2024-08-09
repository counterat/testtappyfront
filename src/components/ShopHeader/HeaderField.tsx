import classNames from 'classnames';

import c from './HeaderField.module.scss';

interface HeaderFieldProps {
	title: string;
	src: string;
	titleStyle?: string;
	imageStyle?: string;
}

function HeaderField({
	title,
	src,
	titleStyle = '',
	imageStyle = '',
}: HeaderFieldProps) {
	return (
		<div className={c.header}>
			<div
				className={classNames({
					[c.headerImageWrapper]: true,
					[imageStyle]: imageStyle !== '',
				})}
			>
				<img src={src} alt={title} />
			</div>
			<h3
				className={classNames({
					[c.headerTitle]: true,
					[titleStyle]: titleStyle !== '',
				})}
			>
				{title}
			</h3>
		</div>
	);
}

export default HeaderField;
