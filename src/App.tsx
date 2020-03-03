import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import RootScreen from './containers/Root/RootScreen';
import SplashScreen from './containers/SplashScreen/SplashScreen';
import rootReducer from './redux/reducers';
import rootSaga from './redux/sagas';
import configureStore from './redux/store/configureStore';

const {store, persistor} = configureStore(rootReducer, rootSaga);

// eslint-disable-next-line no-console
console.disableYellowBox = true; // Debug Only - yellow box

// react-native-paper theme configuration

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

const App = () => (
  <Provider store={store}>
    <PaperProvider theme={theme}>
      <PersistGate loading={<SplashScreen />} persistor={persistor}>
        <RootScreen />
      </PersistGate>
    </PaperProvider>
  </Provider>
);

export default App;
