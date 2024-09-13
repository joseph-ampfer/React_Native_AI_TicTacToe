import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ImageBackground, BackHandler } from 'react-native';
import tw from 'twrnc';
import Animated, { Easing, FadeIn, FadeInDown, FadeInLeft, FadeInRight, FadeInUp, FadeOutDown, FadeOutRight, FadeOutUp, FlipInXUp, FlipOutXUp, ZoomInDown, ZoomInEasyDown } from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function SmartGameScreen({navigation}) {

  // Initialize an empty board
  const [realBoard, setrealBoard] = useState(Array(9).fill(null));
  const [isGameOver, setIsGameOver] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isXNext, setIsXNext] = useState(true);
  const [aiPressedIndex, setAiPressedIndex] = useState(null);

  // Players(s): a function that, given a state s, returns which player’s turn it is (X or O).
  const player = (board) => {
    let xCount = 0;
    let oCount = 0;
    for (let i = 0; i < 9; i++) {
      if (board[i] == 'X') xCount++;
      if (board[i] == 'O') oCount++;
    }
    return xCount > oCount ? 'O' : 'X';
  }

  //console.log(player(board));

  // Actions(s): a function that, given a state s, return all the legal moves in this state (what spots are free on the board).
  const actions = (board) => {
    const availableMoves = board.map((value, index) => value == null ? index : null).filter((value) => value != null);
    return availableMoves
  }

  //console.log(actions(board));

  // Result(s, a): a function that, given a state s and action a, returns a new state. This is the board that resulted from performing the action a on state s (making a move in the game).
  const result = (board, action) => {
    const xORy = player(board);
    const newBoard = [...board]; // copy of board
    newBoard[action] = xORy;
    return newBoard;
  }

  //console.log(result(board, 1));

  // Terminal(s): a function that, given a state s, checks whether this is the last step in the game, i.e. if someone won or there is a tie. Returns True if the game has ended, False otherwise.
  const terminal = (boardCheck) => {
    if (actions(boardCheck).length == 0) {
      return true
    } else if (
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
    ) {
      return true
    } else return false
  }

  //console.log(terminal(board));
    // Winning conditions for X
  const didXWin = (board) => {
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
  const didOWin = (board) => {
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

  // Utility(s): a function that, given a terminal state s, returns the utility value of the state: -1, 0, or 1.
  const utility = (terminalBoard) => {
    // x win is 1, o win is -1
    if (didXWin(terminalBoard)) {
      return 1
    } else if (didOWin(terminalBoard)) {
      return -1
    } else return 0
  }

  //console.log(utility(['X', 'X', 'X']), 'UTILITY');

  const maxValue = (board, alpha, beta) => {
    console.log('maxValue running')
    if (terminal(board)) {
      return utility(board);
    }
    let v = -Infinity;
    const movesAvailable = actions(board);

    for (let i = 0; i < movesAvailable.length; i++) {
      v = Math.max(v, minValue(result(board, movesAvailable[i]), alpha, beta));
      alpha = Math.max(alpha, v);
      if (beta <= alpha) break;
    }
    return v;
  }

  const minValue = (board, alpha, beta) => {
    console.log('minValue running')
    if (terminal(board)) {
      return utility(board);
    }
    let v = Infinity;
    const movesAvailable = actions(board);
    for (let i = 0; i < movesAvailable.length; i++) {
      v = Math.min(v, maxValue(result(board, movesAvailable[i]), alpha, beta));
      beta = Math.min(beta, v);
      if (beta <= alpha) break; // Alpha-beta pruning
    }
    return v;
  }

  //  """
  //  Returns the optimal action for the current player on the board.
  //  """
  //  The minimax function should take a board as input, and return the optimal move for the player 
  //   to move on that board.
  //      The move returned should be the optimal action (i, j) that is one of the allowable 
  //        actions on the board. 
  //          If multiple moves are equally optimal, any of those moves is acceptable.
  //      If the board is a terminal board, the minimax function should return None.
  
  const minimax = (board) => {
    // Terminal board, return none
    if (terminal(board)) {
      console.log('hi from terminal minimax')
      return null
    }
    console.log('Minimax running');
    // X is max player, O is min player
    const p = player(board);
    let act = 99;

    console.log(p);

    if (p == 'X') {
      let value = -Infinity;
      console.log('hi from in');
      let availableMoves = actions(board);
      for (let i = 0; i < availableMoves.length; i++) {
        const testValue = minValue(result(board, availableMoves[i]), -Infinity, Infinity);
        if (testValue > value) {
          value = testValue;
          act = availableMoves[i];
          
        }
      }
    } else if (p == 'O') {
      let value = Infinity;
      console.log('hi from in 2');
      let availableMoves = actions(board);
      for (let i = 0; i < availableMoves.length; i++) {
        const testValue = maxValue(result(board, availableMoves[i]), -Infinity, Infinity);
        console.log('hi from let action of actions:', availableMoves[i]);
        if (testValue < value) {
          value = testValue;
          act = availableMoves[i];
          console.log('running inside ===========')
        }
      }
    }
    console.log('hi from out')
    return act;
  };

  // const loo = () => {
  //   let newacts = actions(['X', 'O', 'X', null, null, null, null, null, null]);
  //   for (let i = 0; i < newacts.length; i++) {
  //     console.log(newacts[i]);
  //   }
  // }
  // loo();
  //console.log(minimax(['X', 'O', 'X', null, null, null, null, null, null]));

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
    if (didOWin(realBoard)) return 'O';
    if (didXWin(realBoard)) return 'X';
  }

  const makeSmartMove = (board) => {

    const moveIndex = minimax(board);
    
    setAiPressedIndex(moveIndex); // // Temporarily mark this cell as "pressed"
    
    setTimeout(() => {
      const newBoard = [...board];
      newBoard[moveIndex] = 'O'; // Ai plays the move
      setrealBoard(newBoard);

      // Check for winner
      if (checkGameOver(newBoard)) {
        setIsGameOver(true); // Set game over if someone wins
      } else {
        setIsXNext(!isXNext); // Switch player
      }

      setAiPressedIndex(null);
    }, 150);

  }

  const handlePress = (index) => {
    if (realBoard[index] || isGameOver) {
      return; // Square taken or game already over
    }
    
    // Update the board with the move
    const newBoard = [...realBoard];
    newBoard[index] = isXNext ? "X" : "O"; // Update square with X or O
    setrealBoard(newBoard);

    // Check for winner
    if (checkGameOver(newBoard)) {
      setIsGameOver(true); // Set game over if someone wins
    } else {
      setIsXNext(!isXNext); // Switch player
    }

    setIsEmpty(false);
    
  };

  // UseEffect to make the Ai move after the player
  useEffect(() => {
    if (!isGameOver && !isXNext) {
      // Ai makes move after short delay
      //const makeMove = setTimeout(() => makeSmartMove(realBoard), 500);
      makeSmartMove(realBoard);
      //return () => clearTimeout(makeMove); // Cleanup timeout
    }
  }, [isGameOver, isXNext]);


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
    const isPressed = aiPressedIndex === index;
    
    // Function to determine the entering animation based on the index
    const getEnteringAnimation = (index) => {
      const animationType = animations[index]; // Cycle through animations
      return animationType.delay(100).duration(1000).easing(Easing.ease); // Customize with delay and spring effect
    };
    
    return (
      <Animated.View
        entering={ZoomInDown.delay(100 * index).springify()}
        key={index}
        style={tw`h-1/3 aspect-square border-4 border-white/0 `}
      >
        <TouchableOpacity
          onPress={() => handlePress(index)}
          style={tw`w-full h-full items-center justify-center z-10 bg-white/10 rounded-md  ${isPressed ? 'opacity-20':null}`}
        >
          <Text style={tw`text-[50px] font-bold text-white `}>{ realBoard[index] }</Text>
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

      <View style={tw`flex-1  justify-center items-center `}>
        {isGameOver ? (
            <Animated.View
              entering={FlipInXUp.delay(200).easing(Easing.cubic)}
              exiting={FlipOutXUp.delay(200).easing(Easing.cubic)}
            >
              <Text style={tw`text-4xl text-white mb-5 -mt-5`}>Game over, { whoWon() } won!</Text>
            </Animated.View>
          ):(<Text style={tw`text-4xl text-white/0 mb-5 -mt-5`}>Game over, won!</Text>)
        }
      
        <View style={tw`w-9/10 aspect-square  ${isGameOver ? '' : ''} flex-row flex-wrap`}>
          {realBoard.map((value, index) => 
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
          <TouchableOpacity style={tw`p-5`}
            onPress={() => {
              setrealBoard(Array(9).fill(null));
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

