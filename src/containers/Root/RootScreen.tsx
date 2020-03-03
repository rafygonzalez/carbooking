import React, { ReducerState } from 'react';
import {useEffect} from 'react'
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import {useDispatch, useSelector} from 'react-redux';
import Loading from 'components/Loading';
import {startup} from 'redux/actions/startupActions';
import NavigationService from 'services/NavigationService';
import Colors from 'Theme/Colors';
import MainScreen from 'containers/Main';
import SplashScreen from 'containers/SplashScreen/SplashScreen';
// configuracao da Stack de navegacao
// aplicas-se a todas as rotas

const Stack = createStackNavigator();
function App() {
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
        />
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/**
 * Define main RootScreen component
 */

interface StateProps{
   api: {
     loading:boolean
  }
 }
const RootScreen = () => {
  const {loading}  = useSelector((state:StateProps) => {
    return state.api
  });
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{flex: 1, backgroundColor: Colors.defaultBackground}}>
        <View style={{flex: 1}}>
          <Loading visible={loading} animation={"fade"} />
          <App />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default RootScreen;
