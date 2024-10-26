import { useNavigate } from 'react-router-dom';

import ArrowIcon from 'assets/icons/ArrowIcon';

import c from './GoBack.module.scss';

function GoBack() {
	const navigate = useNavigate();

	return (
		<button
			className={c.goBack}
			onClick={(event) => {
				event.preventDefault();
				navigate(-1);
			}}
		>
			<ArrowIcon /> Go Back
		</button>
	);
}

export default GoBack;
