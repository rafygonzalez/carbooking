import React, {useEffect} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import {useDispatch, useSelector} from 'react-redux';
import Loading from '~/components/Loading';
import {startup} from '../../redux/actions/startupActions';
import NavigationService from '../../services/NavigationService';
import Colors from '../../Theme/Colors';
import MainScreen from '~/containers/Main';
import SplashScreen from '../SplashScreen/SplashScreen';
import SignIn from '../Auth/Signin/index';
// configuracao da Stack de navegacao
// aplicas-se a todas as rotas
const configureStack = {
  MainScreen: {
    // Splash screen é exibida por default durante a execucao do startup() saga
    // ver definicao no arquivo StartupSaga.js
    initialRouteName: 'MainScreen',
    headerMode: 'none',
    navigationOptions: {
      translucent: 'true',
      headerStyle: {
        backgroundColor: Colors.defaultBackground,
        elevation: 0,
        paddingTop: 40,
      },
      headerTitleStyle: {
        textAlign: 'center',
        fontFamily: 'Geomanist-Medium',
        alignSelf: 'center',
      },
      headerTintColor: Colors.headerTintColor,
    },
  },
  SplashScreen: {
    // Splash screen é exibida por default durante a execucao do startup() saga
    // ver definicao no arquivo StartupSaga.js
    initialRouteName: 'SplashScreen',
    headerMode: 'none',
    navigationOptions: {
      translucent: 'true',
      headerStyle: {
        backgroundColor: Colors.defaultBackground,
        elevation: 0,
        paddingTop: 40,
      },
      headerTitleStyle: {
        textAlign: 'center',
        fontFamily: 'Geomanist-Medium',
        alignSelf: 'center',
      },
      headerTintColor: Colors.headerTintColor,
    },
  },
};

const Stack = createStackNavigator();
function App(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startup());
  }, []);
  return (
    <NavigationContainer
      ref={navigationRef => {
        NavigationService.setTopLevelNavigator(navigationRef);
      }}>
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={configureStack.SplashScreen}
        />
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={configureStack.MainScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/**
 * Define main RootScreen component
 */
const RootScreen = () => {
  const {loading} = useSelector(state => state.api);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{flex: 1, backgroundColor: Colors.defaultBackground}}>
        <View style={{flex: 1}}>
          <Loading visible={loading} animation="fade" />
          <App />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default RootScreen;
