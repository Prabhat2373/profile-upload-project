import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import CalculateDistanceScreen from './src/CalculateDistanceScreen';
import EnterCoordinatesScreen from './src/EnterCoordinatesScreen';
import UploadProfilePicScreen from './src/UploadProfileScreen';

export const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="uploadProfile">
          <Stack.Screen
            name="uploadProfile"
            component={UploadProfilePicScreen}
          />
          <Stack.Screen
            name="EnterCoordinates"
            component={EnterCoordinatesScreen}
          />
          <Stack.Screen
            name="CalculateDistance"
            component={CalculateDistanceScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
