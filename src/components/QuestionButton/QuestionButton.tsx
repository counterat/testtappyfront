import classNames from 'classnames';
import QuestionIcon from 'assets/icons/QuestionIcon';

import c from './QuestionButton.module.scss';

interface QuestionButtonProps {
	onClick: () => void;
	classN?: string;
}

function QuestionButton({ onClick, classN = '' }: QuestionButtonProps) {
	const className = classNames({
		[c.button]: true,
		[classN]: classN !== '',
	});

	return (
		<button type="button" onClick={onClick} className={className}>
			<QuestionIcon />
		</button>
	);
}

export default QuestionButton;
