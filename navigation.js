import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChildGameScreen from "./screens/ChildGameScreen";
import HomeScreen from "./screens/HomeScreen";
import tw from 'twrnc';
import { DefaultTheme } from '@react-navigation/native';
import { ImageBackground, View } from "react-native";
import LocalGameScreen from "./screens/LocalGameScreen";
import SmartGameScreen from "./screens/SmartGameScreen";


const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'translucent', // Make the default background transparent
  },
};

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <ImageBackground
      blurRadius={70} 
      source={require('./assets/images/tic tac toe background (2).png')} 
      style={tw`w-full h-full absolute `} 
    >
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, animation: 'none' }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="LocalGameScreen" component={LocalGameScreen} />
          <Stack.Screen name="ChildGameScreen" component={ChildGameScreen} />
          <Stack.Screen name="SmartGameScreen" component={SmartGameScreen} />
        </Stack.Navigator>
        </NavigationContainer>
    </ImageBackground>
  );
};