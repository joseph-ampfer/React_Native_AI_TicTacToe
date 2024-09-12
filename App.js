import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native';
import tw from 'twrnc';
import Animated, { FadeInDown, FadeInRight, FadeInUp } from 'react-native-reanimated';
import AppNavigation from './navigation'

export default function App() {

  return (
    //<View style={tw`flex-1 bg-b`}>
      <AppNavigation />
    //</View>
  );
}

