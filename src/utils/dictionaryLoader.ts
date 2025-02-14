import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { preloadedDictionary } from "../data/preloadedDictionary";

export interface DictionaryEntry {
  word: string;
  translation: string;
  phonetic?: string;
  definition?: string;
  level?: string; // 词汇级别：CET4/6, TOEFL等
}

const DICTIONARY_URL =
  "https://raw.githubusercontent.com/skywind3000/ECDICT/master/ecdict.csv";
const DICTIONARY_FILE = `${FileSystem.documentDirectory}dictionary.json`;
const DICTIONARY_VERSION_KEY = "dictionary_version";

// 从本地加载词典
export const loadLocalDictionary = async (): Promise<DictionaryEntry[]> => {
  try {
    const fileContent = await FileSystem.readAsStringAsync(DICTIONARY_FILE);
    return JSON.parse(fileContent);
  } catch (error) {
    console.log("Using preloaded dictionary");
    return preloadedDictionary;
  }
};

// 从远程更新词典
export const updateDictionary = async (): Promise<boolean> => {
  try {
    const response = await fetch(DICTIONARY_URL);
    const csvData = await response.text();

    // 解析CSV数据
    const entries: DictionaryEntry[] = csvData
      .split("\n")
      .slice(1) // 跳过标题行
      .map((line) => {
        const [word, phonetic, translation, definition, level] =
          line.split(",");
        return {
          word: word.trim(),
          translation: translation.trim(),
          phonetic: phonetic?.trim(),
          definition: definition?.trim(),
          level: level?.trim(),
        };
      })
      .filter((entry) => entry.word && entry.translation); // 过滤掉无效数据

    // 保存到本地文件
    await FileSystem.writeAsStringAsync(
      DICTIONARY_FILE,
      JSON.stringify(entries)
    );

    // 更新版本信息
    await AsyncStorage.setItem(
      DICTIONARY_VERSION_KEY,
      new Date().toISOString()
    );
    return true;
  } catch (error) {
    console.error("Failed to update dictionary:", error);
    return false;
  }
};

// 获取指定级别的单词
export const getWordsByLevel = async (
  level: string,
  count: number = 20
): Promise<DictionaryEntry[]> => {
  const dictionary = await loadLocalDictionary();
  const levelWords = dictionary.filter((entry) => entry.level === level);

  if (levelWords.length === 0) {
    console.log("No words found for level:", level);
    return preloadedDictionary.slice(0, count);
  }

  // 随机选择指定数量的单词
  return levelWords.sort(() => Math.random() - 0.5).slice(0, count);
};
