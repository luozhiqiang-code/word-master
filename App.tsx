import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { useState, useEffect } from "react";
import { WordScreen } from "./src/screens/WordScreen";
import { DictionaryEntry, getWordsByLevel } from "./src/utils/dictionaryLoader";

interface Word {
  id: number;
  word: string;
  correctMeaning: string;
  wrongMeanings: string[];
}

export default function App() {
  const [words, setWords] = useState<Word[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 获取随机错误选项
  const getRandomWrongMeanings = (
    correctEntry: DictionaryEntry,
    allWords: DictionaryEntry[],
    count: number = 3
  ): string[] => {
    const otherWords = allWords.filter(
      (entry) => entry.word !== correctEntry.word
    );
    return otherWords
      .sort(() => Math.random() - 0.5)
      .slice(0, count)
      .map((entry) => entry.translation);
  };

  // 初始化词典和单词列表
  useEffect(() => {
    const initializeDictionary = async () => {
      try {
        setIsLoading(true);
        const cet4Words = await getWordsByLevel("CET4", 20);

        // 转换为应用所需的格式
        const formattedWords: Word[] = cet4Words.map((entry, index) => ({
          id: index + 1,
          word: entry.word,
          correctMeaning: entry.translation,
          wrongMeanings: getRandomWrongMeanings(entry, cet4Words),
        }));

        setWords(formattedWords);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "加载词典时出错");
        setIsLoading(false);
      }
    };

    initializeDictionary();
  }, []);

  const handleNextWord = async () => {
    setCurrentWordIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % words.length;
      // 如果是最后一个单词，重新获取新的单词列表
      if (nextIndex === 0) {
        getWordsByLevel("CET4", 20).then((newWords) => {
          const formattedWords = newWords.map((entry, index) => ({
            id: index + 1,
            word: entry.word,
            correctMeaning: entry.translation,
            wrongMeanings: getRandomWrongMeanings(entry, newWords),
          }));
          setWords(formattedWords);
        });
      }
      return nextIndex;
    });
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>加载词典中...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (words.length === 0) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>没有找到单词</Text>
      </View>
    );
  }

  const currentWord = words[currentWordIndex];

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
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
