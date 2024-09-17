import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChildGameScreen from "./screens/ChildGameScreen";
import HomeScreen from "./screens/HomeScreen";
import tw from 'twrnc';
import { DefaultTheme } from '@react-navigation/native';
import { Dimensions, ImageBackground, View } from "react-native";
import LocalGameScreen from "./screens/LocalGameScreen";
import SmartGameScreen from "./screens/SmartGameScreen";
import LottieView from "lottie-react-native";


const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'translucent', // Make the default background transparent
  },
};

const dimensions = Dimensions.get('screen');

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <View style={tw`flex-1`}>
      <View style={tw`h-full w-full absolute opacity-100 -z-50`}>
        <LottieView
          source={require('./assets/lotties/gradient2NotOp.json')}
          style={{ width: dimensions.width, height: dimensions.height }}
          autoPlay
          loop
          resizeMode='cover'
          speed={1}
        />
      </View>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, animation: 'none' }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="LocalGameScreen" component={LocalGameScreen} />
          <Stack.Screen name="ChildGameScreen" component={ChildGameScreen} />
          <Stack.Screen name="SmartGameScreen" component={SmartGameScreen} />
        </Stack.Navigator>
        </NavigationContainer>
    </View>
  );
};