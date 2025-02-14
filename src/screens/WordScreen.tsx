import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

interface WordScreenProps {
  word: string;
  correctMeaning: string;
  wrongMeanings: string[];
  onCorrectAnswer: () => void;
}

export const WordScreen: React.FC<WordScreenProps> = ({
  word,
  correctMeaning,
  wrongMeanings,
  onCorrectAnswer,
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [isWrong, setIsWrong] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([]);

  // 在单词改变时重新排序选项
  useEffect(() => {
    setOptions(
      [...wrongMeanings, correctMeaning].sort(() => Math.random() - 0.5)
    );
  }, [word, correctMeaning, wrongMeanings]);

  const handleSelect = (meaning: string) => {
    setSelected(meaning);
    if (meaning === correctMeaning) {
      // 答对了，切换到下一个单词
      setSelected(null);
      setIsWrong(null);
      onCorrectAnswer();
    } else {
      // 答错了，显示红色
      setIsWrong(meaning);
    }
  };

  // 将选项分成两行
  const firstRow = options.slice(0, 2);
  const secondRow = options.slice(2, 4);

  return (
    <View style={styles.container}>
      <Text style={styles.wordText}>{word}</Text>
      <View style={styles.optionsContainer}>
        <View style={styles.optionsRow}>
          {firstRow.map((meaning, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selected === meaning && styles.selectedOption,
                isWrong === meaning && styles.wrongOption,
              ]}
              onPress={() => handleSelect(meaning)}
            >
              <Text style={styles.optionText}>{meaning}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.optionsRow}>
          {secondRow.map((meaning, index) => (
            <TouchableOpacity
              key={index + 2}
              style={[
                styles.optionButton,
                selected === meaning && styles.selectedOption,
                isWrong === meaning && styles.wrongOption,
              ]}
              onPress={() => handleSelect(meaning)}
            >
              <Text style={styles.optionText}>{meaning}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;
const buttonWidth = (windowWidth - 60) / 2; // 考虑padding和间距

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  wordText: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
  },
  optionsContainer: {
    width: "100%",
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  optionButton: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    width: buttonWidth,
    minHeight: 100,
    justifyContent: "center",
  },
  selectedOption: {
    backgroundColor: "#e0e0e0",
  },
  wrongOption: {
    backgroundColor: "#ffebee",
  },
  optionText: {
    fontSize: 18,
    textAlign: "center",
  },
});
