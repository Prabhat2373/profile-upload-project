import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {MainRoutes} from './src/routes/routes';

export const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="uploadProfile">
          {MainRoutes.map(route => {
            return (
              <Stack.Screen name={route.name} component={route.component} />
            );
          })}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
