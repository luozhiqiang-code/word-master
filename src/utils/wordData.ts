export interface Word {
  id: number;
  word: string;
  correctMeaning: string;
  wrongMeanings: string[];
}

// 示例单词数据
export const words: Word[] = [
  {
    id: 1,
    word: "apple",
    correctMeaning: "苹果",
    wrongMeanings: ["香蕉", "橘子", "梨"],
  },
  {
    id: 2,
    word: "banana",
    correctMeaning: "香蕉",
    wrongMeanings: ["苹果", "橘子", "梨"],
  },
  {
    id: 3,
    word: "orange",
    correctMeaning: "橘子",
    wrongMeanings: ["苹果", "香蕉", "梨"],
  },
  {
    id: 4,
    word: "book",
    correctMeaning: "书",
    wrongMeanings: ["笔", "纸", "桌子"],
  },
  {
    id: 5,
    word: "computer",
    correctMeaning: "电脑",
    wrongMeanings: ["手机", "平板", "电视"],
  },
  {
    id: 6,
    word: "phone",
    correctMeaning: "手机",
    wrongMeanings: ["电脑", "相机", "收音机"],
  },
];
