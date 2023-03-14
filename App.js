import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import IconButton from './components/ui/IconButton';

import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './stores/AuthContext';

import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import WelcomeScreen from './screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

export const App = () => {
  const [isTryingLogin, setIsTryingLogin] = useState(false);
  return (
    <>
    <StatusBar style="light" />
    <AuthContextProvider>  
      <Root />
    </AuthContextProvider>
    </>
  );
}

const Root = () => {
  const { token, logout } = useContext(AuthContext);
  return(
    <>              
        <NavigationContainer>
          <Stack.Navigator>
          {token === null
          ?
          <Stack.Group screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: 'white',
            contentStyle: { backgroundColor: Colors.primary100 },
            }}
            >
            <Stack.Screen name="SignIn" component={SignInScreen} options={{title: "Přihlášení"}} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{title: "Registrace"}} />
          </Stack.Group>
           : 
           <Stack.Group screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: 'white',
            contentStyle: { backgroundColor: Colors.primary100 },
            }}
          >
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="exit"
                  color={tintColor}
                  size={24}
                  onPress={logout}
            />
          ),
        }}
            />
          </Stack.Group>
           }
          </Stack.Navigator>
        </NavigationContainer>    
    </>
  );
}

export default App;