import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function HomeScreen({ navigation }) {
  
  return (
    <View style={tw`flex-1`}>
      <StatusBar style='light' />
      <View style={tw`flex-1 justify-center items-center mx-5`}>

        {/* <View style={tw``}>
          <Text style={tw`text-4xl text-white mb-5`}>Choose opponent</Text>
        </View> */}

        <Animated.View 
          entering={FadeInDown.delay(200).duration(1000).springify()}
          style={tw`bg-white/20 w-full p-5 rounded-full mb-5`}
        >
          <TouchableOpacity
            onPress={() => navigation.push('LocalGameScreen')}
            style={tw``}
          >
            <Text style={tw`text-4xl text-white text-center`}>Local</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.delay(400).duration(1000).springify()}
          style={tw`bg-white/20 w-full p-5 rounded-full mb-5`}
        >
          <TouchableOpacity
            onPress={() => navigation.push('ChildGameScreen')}
            style={tw``}
          >
            <Text style={tw`text-4xl text-white text-center`}>Child</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.delay(600).duration(1000).springify()}
          style={tw`bg-white/20 w-full p-5 rounded-full mb-5`}
        >
          <TouchableOpacity
            //onPress={() => }
            style={tw``}
          >
            <Text style={tw`text-4xl text-white text-center`}>Einstein</Text>
          </TouchableOpacity>
        </Animated.View>

      </View>
    </View>
  )
}