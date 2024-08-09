import c from './JoinSquadModal.module.scss';
import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { changeSquad } from 'store/reducers/userReducer';
import { createSquads } from 'store/reducers/squadsReducer';
import { FetchUser } from 'api/user';
import classNames from 'classnames';
import { useEffect } from 'react';
import CloseButton from '../CloseButton';
interface JoinSquadModalProps {
	closeModal: () => void;
	isOpen: boolean;
}

function JoinSquadModal({ closeModal, isOpen }: JoinSquadModalProps) {
	const [value, setValue] = useState('');
	const { squads } = useAppSelector((state) => state.squads);
	const [isLoading, setIsLoading] = useState(false);
	const [active, setActive] = useState<'default' | 'show' | 'close'>('default');
	const [isError, setIsError] = useState(false);
	const [activeKeyboard, setActiveKeyboard] = useState(false);

	const { user } = useAppSelector((state) => state.user);

	const [scrollPosition, setScrollPosition] = useState(0);

	const preventDefault = (e: TouchEvent) => {
		e.preventDefault();
	};

	const handleFocus = () => {
		setScrollPosition(window.scrollY);
		document.body.style.overflow = 'hidden';
		document.body.style.position = 'fixed';
		document.body.style.top = `-${window.scrollY}px`;
		document.body.style.width = '100%';
		window.addEventListener('touchmove', preventDefault, { passive: false });
		setActiveKeyboard(true);
	};

	const handleBlur = () => {
		document.body.style.overflow = '';
		document.body.style.position = '';
		document.body.style.top = '';
		document.body.style.width = '';
		window.scrollTo(0, scrollPosition);
		//@ts-ignore
		window.removeEventListener('touchmove', preventDefault, { passive: false });
		setActiveKeyboard(false);
	};

	useEffect(() => {
		if (isOpen) {
			setActive('show');
		}
	}, [isOpen]);
	const createSquad = async (item_name: string) => {
		try {
			const result = await FetchUser.createSquad(user.id, user.sign, item_name);

			console.log('Minecoin request successful:', result);
			return result;
		} catch (error) {
			console.error('Minecoin request failed:', error);
		}
	};
	const createSquadHandler = (link: string) => {
		return async (event: React.MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			const result = await createSquad(link).then((json) => {
				console.log(json);
			});
			// Можно что-то сделать с результатом, если нужно
			console.log(result);
		};
	};
	const dispatch = useAppDispatch();
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const squad = squads.find((squad) => squad.nickname === value);
		createSquad(value).then((json) => {
			if (json.detail) {
				setIsError(true);
				return;
			}

			dispatch(
				createSquads({
					id: json.id,
					nickname: json.title,
					coins: json.total_coins,
					place: squads.length + 1,
				})
			);
			dispatch(changeSquad(json.id));
		});
		if (squad) {
		} else {
			const id = Date.now();
			dispatch(changeSquad(id));
		}
		closeModal();
	};
	return (
		<div
			className={classNames({
				[c.container]: true,
				[c.isActive]: active === 'show',
				[c.isClose]: active === 'close',
				[c.isKeyboard]: activeKeyboard,
			})}
		>
			<div className={c.wrapper}>
				<CloseButton handleCloseModal={closeModal} />
				<div className={c.content}>
					<div className={c.header}>
						<div className={c.headerImageWrapper}>
							<img src="/assets/sword 1.png" alt="sword" />
						</div>
						<h2 className={c.headerTitle}>Create a squad or join</h2>
					</div>
					<div className={c.text}>
						Enter a link to a public group or channel and click «Join squad»
						below to join or create your own squad
					</div>
					<form className={c.form} onSubmit={handleSubmit}>
						<input
							type="text"
							value={value}
							onChange={(event) => setValue(event.target.value)}
							placeholder="Пример: t.me/testtappybird_bot"
							onFocus={handleFocus}
							onBlur={handleBlur}
						/>
						{isError && (
							<span className={c.errorText}>
								The group or channel address is incorrect or typed incorrectly
							</span>
						)}

						<button className={c.formSubmit} type="submit">
							Join Squad
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default JoinSquadModal;
