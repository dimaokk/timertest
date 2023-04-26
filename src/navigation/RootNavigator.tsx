import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import {StackParamList} from './types';

const Stack = createStackNavigator<StackParamList>();

const RootNavigator = () => {
  const navigationRef = React.useRef<NavigationContainerRef>(null);

  // useEffect(() => {
  //   const unsubscribe = navigationRef.current?.addListener(
  //     'beforeRemove',
  //     e => {
  //       // Отменяем обновление списка при переходе на экран DetailsScreen
  //       if (
  //         e.data.action.type === 'NAVIGATE' &&
  //         e.data.action.name === 'Details'
  //       ) {
  //         e.preventDefault();
  //       }
  //     },
  //   );

  //   return unsubscribe;
  // }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
