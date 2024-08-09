import CloseIcon from 'assets/icons/CloseIcon';
import c from './PaymentExchange.module.scss';
import RefreshIcon from 'assets/icons/RefreshIcon';
import MiniQuestionIcon from 'assets/icons/MiniQuestionIcon';
import React, { FormEvent, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from 'store';
import { ton } from 'constants/tonObject';
import {
	changeIsModalPayment,
	changeIsModalPaymentSuccess,
} from 'store/reducers/modalsReducer';
import { shortenToken } from 'utils/shortToken';
import { FetchUser } from 'api/user';
import { setTappyCoin } from 'store/reducers/userReducer';

interface PaymentExchangeProps {
	closeModal: () => void;
}

function PaymentExchange({ closeModal }: PaymentExchangeProps) {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.user);
	const [wallet, setWallet] = useState<{
		ton: number | string;
		course: number;
		tappy: number | string;
		balance: number;
	}>({
		ton: '',
		course: 100,
		tappy: '',
		balance: 10,
	});

	const sendSuccessfulTransaction = async (amount: number) => {
		try {
			const result = await FetchUser.sendSuccessfulTransaction(user.id, amount);
			console.log('Transaction successful:', result);
			return result;
		} catch (error) {
			console.log('Error during transaction:', error);
			return null;
		}
	};

	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleChangeValue = (
		event: React.ChangeEvent<HTMLInputElement>,
		name: 'tappy' | 'ton'
	) => {
		let value = event.target.value;
		value = Math.max(0, +value).toString(); // Ensure non-negative value and convert to string
		setWallet({
			...wallet,
			[event.target.name]: value,
			[name]:
				name === 'tappy'
					? (Number(value) * wallet.course).toString()
					: (Number(value) / wallet.course).toString(),
		});
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();

		if (wallet.ton === '') return;

		if (+wallet.ton > wallet.balance) {
			setIsError(true);
			return;
		}
		setIsError(false);
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
			dispatch(changeIsModalPayment(false));
			dispatch(changeIsModalPaymentSuccess({ isOpen: true, isWallet: true }));
		}, 2000);
	};

	const buyHandler = async (event: FormEvent) => {
		event.preventDefault(); // Prevent default form submission

		if (Number(wallet.ton) > 0) {
			const transaction = {
				validUntil: Math.floor(Date.now() / 1000) + 60,
				messages: [
					{
						address: 'UQAeUBXODtfKkilx5zI0sdPy-gHUBNjCiz8-_FvRnDHFAhLc',
						amount: String(Number(wallet.ton) * 1e9),
					},
				],
			};

			await ton.sendTransaction(transaction).then((resp) => {
				console.log(resp);
				sendSuccessfulTransaction(Number(wallet.ton)).then((json) => {
					if (json != null) {
						dispatch(setTappyCoin(parseInt(json.balance_in_tappycoin)));
						dispatch(
							changeIsModalPaymentSuccess({ isOpen: true, isWallet: true })
						);
					}
				});
			});
		}
	};

	if (isLoading) {
		return (
			<div className={c.loadingWrapper}>
				<div className={c.loader}></div>
			</div>
		);
	}

	return (
		<div className={c.content}>
			<div className={c.header}>
				<button className={c.headerCloseButton} onClick={closeModal}>
					<CloseIcon />
				</button>
			</div>
			<form onSubmit={buyHandler} className={c.form}>
				<div className={c.formTitle}>
					<span>Your TON address</span>
					<h2>{ton.account && shortenToken(ton.account.address)}</h2>
				</div>
				<button
					type="button"
					onClick={() => {
						ton.disconnect();
						ton.openModal();
					}}
					className={c.formChangeWallet}
				>
					<RefreshIcon />
					<span>change wallet</span>
				</button>
				<div className={c.formInputs}>
					<div className={c.formInputsRow}>
						<div className={c.formInputsRowText}>
							<span>You send</span>
							<h4>Ton</h4>
						</div>
						<label className={c.formInputsRowLabel}>
							<input
								type="number"
								placeholder="0"
								value={wallet.ton}
								name="ton"
								min="0"
								onKeyDown={(event) => {
									if (
										event.key === 'e' ||
										event.key === '+' ||
										event.key === '-' ||
										event.key === ','
									) {
										event.preventDefault();
									}
								}}
								onChange={(event) => handleChangeValue(event, 'tappy')}
							/>
						</label>
					</div>
					<div className={c.formInputsRowLine} />
					<div className={c.formInputsRow}>
						<div className={c.formInputsRowText}>
							<span>You receive</span>
							<h4>$TAPPY</h4>
						</div>
						<label className={c.formInputsRowLabel}>
							<input
								type="number"
								value={wallet.tappy}
								placeholder="0"
								name="tappy"
								min="0"
								onKeyDown={(event) => {
									if (
										event.key === 'e' ||
										event.key === '+' ||
										event.key === '-' ||
										event.key === ','
									) {
										event.preventDefault();
									}
								}}
								onChange={(event) => handleChangeValue(event, 'ton')}
							/>
						</label>
					</div>
				</div>
				<div className={c.formTips}>
					<MiniQuestionIcon />
					<span>Exchange rate: 1TON = 100 $TAPPY</span>
				</div>
				<button type="submit" className={c.formSubmit}>
					Buy
				</button>
				<span
					className={classNames({
						[c.walletError]: true,
						[c.active]: isError,
					})}
				>
					You don't have enough coins to buy
				</span>
			</form>
		</div>
	);
}

export default PaymentExchange;
