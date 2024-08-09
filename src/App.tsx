import { BrowserRouter } from 'react-router-dom';

import Router from './Router';
import 'styles/global.scss';
import { Provider } from 'react-redux';
import store from 'store';
import { canReceiveReward } from 'utils/date';
import { changeIsModalDailyReward } from 'store/reducers/modalsReducer';

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Router />
				
			</BrowserRouter>
		</Provider>
	);
}

export default App;
