import HeaderField from 'components/ShopHeader';
import BoostBody from 'components/BoostBody';
import GoBack from 'components/GoBack';
import CustomModal from 'components/modals/CustomModal';
import c from './BoostPage.module.scss';
import { useAppDispatch, useAppSelector } from 'store';
import { changeIsModalBoostItem } from 'store/reducers/modalsReducer';
import { BOOSTMODALITEMS } from 'constants/boostList';

function BoostPage() {
	const { isModalBoostItem } = useAppSelector((state) => state.modals);

	const dispatch = useAppDispatch();

	const handleCloseModal = () => {
		dispatch(changeIsModalBoostItem({ isOpen: false }));
	};

	return (
		<div className={c.container}>
			<div className={c.boost}>
				<HeaderField title="Boost" src="/assets/boost/header.png" />
				<BoostBody />
				<GoBack />
			</div>
			{isModalBoostItem.isOpen && (
				<CustomModal
					isOpen={isModalBoostItem.isOpen}
					closeModal={handleCloseModal}
					header={
						<img
							src={BOOSTMODALITEMS[isModalBoostItem.name].icon}
							alt="boost item"
							className={c.modalImage}
						/>
					}
				>
					<>
						<h3 className={c.modalTitle}>
							{BOOSTMODALITEMS[isModalBoostItem.name].title}
						</h3>

						<p className={c.modalDesc}>
							{BOOSTMODALITEMS[isModalBoostItem.name].desc}
							{BOOSTMODALITEMS[isModalBoostItem.name].bold && (
								<>
									<br />
									<span> {BOOSTMODALITEMS[isModalBoostItem.name].bold}</span>
									{BOOSTMODALITEMS[isModalBoostItem.name].remainder}
								</>
							)}
						</p>
					</>
				</CustomModal>
			)}
		</div>
	);
}

export default BoostPage;
