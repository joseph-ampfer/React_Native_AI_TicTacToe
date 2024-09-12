import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import tw from 'twrnc';

export default function App() {

  // Initialize an empty board
  const [board, setBoard] = useState(Array(9).fill(null));

  //State to keep track of next player
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

  const makeRandomMove = () => {
    const availableSquares = board
      .map((square, index) => (square === null ? index : null))
      .filter((value) => value !== null)
    
    if (availableSquares.length === 0) return;

    const randomIndex = Math.floor(Math.random() * availableSquares.length);
    //const randomMove = availableSquares[randomIndex];
    
    const newBoard = [...board];
    newBoard[availableSquares[randomIndex]] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    // Check for winner
    if (checkGameOver(newBoard)) {
      setIsGameOver(true); // Set game over if someone wins
    } else {
      setIsXNext(!isXNext); // Switch player
    }
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

    //makeRandomMove();
    
  };

  // UseEffect to make the Ai move after the player
  useEffect(() => {
    if (!isGameOver && !isXNext) {
      // Ai makes move after short delay
      const makeMove = setTimeout(() => makeRandomMove(), 500);

      return () => clearTimeout(makeMove); // Cleanup timeout
    }
  }, [isGameOver, isXNext]);

  const renderCell = (index) => {
    return (
      <TouchableOpacity
        key={index}
        style={tw`h-1/3 aspect-square bg-white/20 border-2 border-black justify-center items-center`}
        onPress={() => handlePress(index)}
      >
        <Text style={tw`text-4xl font-bold text-[#fffff0]`}>{ board[index] }</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={tw`flex-1 `}>
      <StatusBar style="auto" />
      <ImageBackground
        source={require('./assets/images/tic tac toe background.png')}
        resizeMode='cover'
        blurRadius={70}
        style={tw`flex-1 items-center justify-center`}
      >
        {
          isGameOver ? (
            <View>
            <Text style={tw`text-4xl text-[#fffff0]`}>Game over, { whoWon() } won!</Text>
            </View>
          ):null
        }
      
      <View style={tw`w-9/10 aspect-square ${isGameOver ? '' : ''} flex-row flex-wrap`}>

        {
          board.map((value, index) => 
            renderCell(index)
          )
        }
        
      </View>
    
      <TouchableOpacity>
        <Text style={tw`text-[#fffff0]`}>Unbeatable AI Tic-Tac-Toe</Text>
      </TouchableOpacity>

      {/* Clear board */}
      <TouchableOpacity style={tw` p-5`}
        onPress={() => {
          setBoard(Array(9).fill(null));
          setIsGameOver(false);
          setIsXNext(true);
        }}
      >
          <Text style={tw`text-[#fffff0]`}>Clear board</Text>
        </TouchableOpacity>
        
      </ImageBackground>
    </View>
  );
}

