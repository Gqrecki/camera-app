import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './components/Main';
import Gallery from './components/Gallery';
import Camera from './components/CameraScreen';
import Photo from './components/Photo';
import CameraScreen from './components/CameraScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
         <Stack.Navigator>
            <Stack.Screen
               name="Main"
               component={Main}
               options={{
                  headerShown: false,
               }} />
            <Stack.Screen 
            name="Gallery" 
            component={Gallery}
            options={{
               headerStyle: {
                  backgroundColor: '#636363',
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
               },
               headerTintColor: '#47ffcc',
               headerTitleAlign: 'center',
               headerTitleStyle: {
                  fontWeight: 'bold',
               },
            }}  />  
            <Stack.Screen
            name="Camera."
            component={CameraScreen}
            options={{
               headerStyle: {
                  backgroundColor: '#636363',
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
               },
               headerTintColor: '#47ffcc',
               headerTitleAlign: 'center',
               headerTitleStyle: {
                  fontWeight: 'bold',
               },
            }}
            /> 
            <Stack.Screen
            name="Photo"
            component={Photo}
            options={{
               headerStyle: {
                  backgroundColor: '#636363',
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
               },
               headerTintColor: '#47ffcc',
               headerTitleAlign: 'center',
               headerTitleStyle: {
                  fontWeight: 'bold',
               },
            }}
            />     
         </Stack.Navigator>
      </NavigationContainer>
  );
}

