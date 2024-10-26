import c from './QRModal.module.scss';

function QRModal() {
	return (
		<div className={c.modal}>
			<div className={c.content}>
				<h2 className={c.contentTitle}>Hello</h2>
				<span className={c.contentText}>
					It's more fun to play <br /> from your phone. Scan <br /> QR code and
					start!
				</span>
				<div className={c.contentQR} />
			</div>
		</div>
	);
}

export default QRModal;
