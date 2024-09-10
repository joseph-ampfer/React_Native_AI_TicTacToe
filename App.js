import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

export default function App() {

  // Initialize an empty board
  const [board, setBoard] = useState(Array(9).fill(null));

  //State to keep track of next player
  const [isXNext, setIsXNext] = useState(true);

  const handlePress = (index) => {
    if (board[index]) {
      return; // Square taken
    } else {
      const newBoard = [...board];
      newBoard[index] = isXNext ? "X" : "O"; // Update square with x or o
      setBoard(newBoard);
      setIsXNext(!isXNext); // Switch player
    }
  }

  const renderCell = (index) => {
    return (
      <TouchableOpacity
        style={tw`h-1/3 aspect-square border-2 border-black justify-center items-center`}
        onPress={() => handlePress(index)}
      >
        <Text style={tw`text-4xl font-bold`}>{ board[index] }</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={tw`flex-1 items-center justify-center bg-zinc-400`}>
      <StatusBar style="auto" />
      <View style={tw`w-9/10 aspect-square bg-blue-300 flex-row flex-wrap`}>

        {
          board.map((value, index) => 
            renderCell(index)
          )
        }
        
      </View>
    
      <TouchableOpacity>
        <Text>Unbeatable AI Tic-Tac-Toe</Text>
      </TouchableOpacity>
      
      {/* Clear board */}
      <TouchableOpacity style={tw` p-5`}
        onPress={() => setBoard(Array(9).fill(null))}
      >
        <Text>Clear board</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
