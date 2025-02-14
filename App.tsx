import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { WordScreen } from "./src/screens/WordScreen";
import { words } from "./src/utils/wordData";

export default function App() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const currentWord = words[currentWordIndex];

  const handleNextWord = () => {
    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  return (
    <View style={styles.container}>
      <WordScreen
        word={currentWord.word}
        correctMeaning={currentWord.correctMeaning}
        wrongMeanings={currentWord.wrongMeanings}
        onCorrectAnswer={handleNextWord}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
