import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ImageBackground, BackHandler } from 'react-native';
import tw from 'twrnc';
import Animated, { Easing, FadeIn, FadeInDown, FadeInLeft, FadeInRight, FadeInUp, FadeOutDown, FadeOutRight, FadeOutUp, FlipInXUp, FlipOutXUp, ReduceMotion, ZoomIn, ZoomInDown, ZoomInEasyDown, ZoomInEasyUp, ZoomInRotate, ZoomInUp } from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LocalGameScreen({navigation}) {

  // Initialize an empty board
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isEmpty, setIsEmpty] = useState(true);
  const [isXNext, setIsXNext] = useState(true);


  // Winning conditions for X
  const didXWin = () => {
    return (
      // horizontal rows
      (board[0] === 'X' && board[1] === 'X' && board[2] === 'X') ||
      (board[3] === 'X' && board[4] === 'X' && board[5] === 'X') ||
      (board[6] === 'X' && board[7] === 'X' && board[8] === 'X') ||
      // vertical columns
      (board[0] === 'X' && board[3] === 'X' && board[6] === 'X') ||
      (board[1] === 'X' && board[4] === 'X' && board[7] === 'X') ||
      (board[2] === 'X' && board[5] === 'X' && board[8] === 'X') ||
      // diagonals
      (board[0] === 'X' && board[4] === 'X' && board[8] === 'X') ||
      (board[2] === 'X' && board[4] === 'X' && board[6] === 'X')
    );
  };

    // Winning conditions for X
  const didOWin = () => {
    return (
      // horizontal rows
      (board[0] === 'O' && board[1] === 'O' && board[2] === 'O') ||
      (board[3] === 'O' && board[4] === 'O' && board[5] === 'O') ||
      (board[6] === 'O' && board[7] === 'O' && board[8] === 'O') ||
      // vertical columns
      (board[0] === 'O' && board[3] === 'O' && board[6] === 'O') ||
      (board[1] === 'O' && board[4] === 'O' && board[7] === 'O') ||
      (board[2] === 'O' && board[5] === 'O' && board[8] === 'O') ||
      // diagonals
      (board[0] === 'O' && board[4] === 'O' && board[8] === 'O') ||
      (board[2] === 'O' && board[4] === 'O' && board[6] === 'O')
    );
  };

  const [isGameOver, setIsGameOver] = useState(false);

  const checkGameOver = (boardCheck) => {
    return (
      // horizontal rows
      (boardCheck[0] && boardCheck[0] === boardCheck[1] && boardCheck[1] == boardCheck[2] ) ||
      (boardCheck[3] && boardCheck[3] === boardCheck[4] && boardCheck[4] === boardCheck[5]) ||
      (boardCheck[6] && boardCheck[6] === boardCheck[7] && boardCheck[7] === boardCheck[8]) ||
      // vertical columns
      (boardCheck[0] && boardCheck[0] === boardCheck[3] && boardCheck[3] === boardCheck[6]) ||
      (boardCheck[1] && boardCheck[1] === boardCheck[4] && boardCheck[4] === boardCheck[7]) ||
      (boardCheck[2] && boardCheck[2] === boardCheck[5] && boardCheck[5] === boardCheck[8]) ||
      // diagonals
      (boardCheck[0] && boardCheck[0] === boardCheck[4] && boardCheck[4] === boardCheck[8]) ||
      (boardCheck[2] && boardCheck[2] === boardCheck[4] && boardCheck[4] === boardCheck[6])
    )
  };

  const whoWon = () => {
    if (didOWin()) return 'O';
    if (didXWin()) return 'X';
  }


  const handlePress = (index) => {
    if (board[index] || isGameOver) {
      return; // Square taken or game already over
    }
    
    // Update the board with the move
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O"; // Update square with X or O
    setBoard(newBoard);

    // Check for winner
    if (checkGameOver(newBoard)) {
      setIsGameOver(true); // Set game over if someone wins
    } else {
      setIsXNext(!isXNext); // Switch player
    }

    setIsEmpty(false);
    
  };



  useEffect(() => {
    // Define the back button handler
    const backAction = () => {
      navigation.push('Home');
      return true; // Returning true means we handled the back button press
    };

    // Add the event listener for the back button
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    // Cleanup the event listener when the component unmounts
    return () => backHandler.remove();
  }, [navigation]);


  // Array of different entering animations
  const animations = [FadeInLeft, FadeInUp, FadeInRight, FadeInLeft, FadeIn, FadeInRight, FadeInLeft, FadeInDown, FadeInRight];

  const renderCell = (index) => {
    
    // Function to determine the entering animation based on the index
    const getEnteringAnimation = (index) => {
      const animationType = animations[index]; // Cycle through animations
      return animationType.delay(100).duration(1000).easing(Easing.ease); // Customize with delay and spring effect
    };
    
    return (
      <Animated.View
        entering={ZoomIn.delay(500).randomDelay().reduceMotion(ReduceMotion.Never).withInitialValues({ transform: [{ scale: 0.01}] })}
        key={index}
        style={tw`h-1/3 aspect-square border-4 border-white/0 `}
      >
        <TouchableOpacity
          onPress={() => handlePress(index)}
          style={tw`w-full h-full items-center justify-center z-10 bg-white/40 rounded-md `}
        >
          <Text style={tw`text-[50px] font-bold text-white `}>{ board[index] }</Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }

  return (
    <SafeAreaView style={tw`flex-1 z-0`}>
      <StatusBar style="light" />

      {/* === Top Bar ==== */}
      <View >
        <Animated.View entering={FadeIn.delay(200)} >
          <TouchableOpacity style={tw`flex-row items-center pl-3 pt-4 pb-6 w-1/4`} onPress={() => navigation.push('Home')}>
            <Ionicons name='arrow-back' size={28} style={tw`text-white/70`} />
          </TouchableOpacity>
        </Animated.View>
      </View>

      
      <View style={tw`flex-1  justify-center items-center pb-20`}>
        {isGameOver ? (
            <Animated.View
              entering={FlipInXUp.delay(200).easing(Easing.cubic)}
              exiting={FlipOutXUp.delay(200).easing(Easing.cubic)}
            >
              <Text style={tw`text-4xl text-white`}>Game over, { whoWon() } won!</Text>
            </Animated.View>
          ):(<Text style={tw`text-4xl text-white/0`}>Game over, won!</Text>)
        }
      
        <View style={tw`w-9/10 aspect-square ${isGameOver ? '' : ''} flex-row flex-wrap`}>
          {board.map((value, index) => 
              renderCell(index)
            )
          }
        </View>
    

        {/* Clear board */}
        {!isEmpty ? (
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            exiting={FadeOutDown.delay(200).duration(1000).springify()}
            style={tw`w-full items-center`}
          >
          <TouchableOpacity style={tw` p-5`}
            onPress={() => {
              setBoard(Array(9).fill(null));
              setIsEmpty(true);
              setIsGameOver(false);
              setIsXNext(true);
            }}
          >
              <Text style={tw`text-white/70 text-2xl `}>Clear board</Text>
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <Text style={tw`text-white/0 text-2xl p-5`}>Clear board</Text>
        )}


        
      </View>
    </SafeAreaView>
  );
}

