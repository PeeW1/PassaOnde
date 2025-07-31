import { StyleSheet, Text, View, Button } from 'react-native';
import Main from './src/components/main';
import Auth from './src/components/auth';
import SelectMenu from './src/components/SelectMenu';
import Register from './src/components/register';
import Users from './src/components/users';
import UserPage from './src/components/userPage';
import { styles, } from './src/components/styles/mainStyle'
import { colors } from './src/components/styles/mainStyle';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default function App() {
  const [fontsLoaded] = useFonts({
    'Font-Ghotic':  require('./assets/fonts/SpecialGothicExpandedOne-Regular.ttf'),
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#222222',
          },
          headerTintColor: 'white',
          animation: 'ios_from_left',
      }} 
      >
        {/* <Stack.Screen name="Auth" component={Auth} /> */}
        <Stack.Screen name="Bem-Vindo" component={Main} />
        <Stack.Screen name="Cadastrar" component={Register} />
        <Stack.Screen name="Linhas" component={SelectMenu} />
        <Stack.Screen name="Usuários" component={Users} />
        <Stack.Screen name="Usuário" component={UserPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


