import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import Animated, { Easing, FadeInDown, FlipInEasyX, FlipInXUp, ReduceMotion, ZoomIn } from 'react-native-reanimated';

export default function HomeScreen({ navigation }) {
  
  return (
    <View style={tw`flex-1`}>
      <StatusBar style='light' />
      <View style={tw`flex-1 justify-center items-center mx-5`}>

        {/* <View style={tw``}>
          <Text style={tw`text-4xl text-white mb-5`}>Choose opponent</Text>
        </View> */}

        <Animated.View 
          entering={ZoomIn.delay(200).springify().mass(0.5).reduceMotion(ReduceMotion.Never).withInitialValues({ transform: [{ scale: 0.01}] })}
          style={tw`bg-white/20 w-full p-5 rounded-lg mb-5`}
        >
          <TouchableOpacity
            onPress={() => navigation.push('LocalGameScreen')}
            style={tw``}
          >
            <Text style={tw`text-4xl text-white text-center`}>Local Play</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View 
          entering={ZoomIn.delay(400).springify().mass(0.5).reduceMotion(ReduceMotion.Never).withInitialValues({ transform: [{ scale: 0.01}] })}
          style={tw`bg-white/20 w-full p-5 rounded-lg mb-5`}
        >
          <TouchableOpacity
            onPress={() => navigation.push('ChildGameScreen')}
            style={tw``}
          >
            <Text style={tw`text-4xl text-white text-center`}>IQ 9 (Child)</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View 
          entering={ZoomIn.delay(600).springify().mass(0.5).reduceMotion(ReduceMotion.Never).withInitialValues({ transform: [{ scale: 0.01}] })}
          style={tw`bg-white/20 w-full p-5 rounded-lg mb-5`}
        >
          <TouchableOpacity
            onPress={() => navigation.push('SmartGameScreen')}
            style={tw``}
          >
            <Text style={tw`text-4xl text-white text-center`}>IQ 999 (Einstein)</Text>
          </TouchableOpacity>
        </Animated.View>

      </View>
    </View>
  )
}