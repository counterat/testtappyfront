import CloseIcon from 'assets/icons/CloseIcon';

import c from './CloseButton.module.scss';

interface CloseButtonProps {
	handleCloseModal: () => void;
}

function CloseButton({ handleCloseModal }: CloseButtonProps) {
	return (
		<button className={c.closeButton} onClick={handleCloseModal}>
			<CloseIcon />
		</button>
	);
}

export default CloseButton;
