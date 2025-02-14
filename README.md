# 项目文档：单词秒记（React Native 安卓应用）

---

## **1. 项目概述**

### **1.1 项目名称**

单词秒记

### **1.2 项目目标**

开发一款基于 React Native 的安卓应用，帮助用户快速记忆单词。应用形式类似百词斩，用户通过选择正确的中文释义来学习单词，并提供音效和朗读功能。

### **1.3 核心功能**

1. **单词展示**：页面顶部显示加粗的单词。
2. **选项选择**：单词下方显示四个中文释义选项，其中一个是正确的。
3. **音效反馈**：
   - 点击错误选项时，播放错误提示音。
   - 点击正确选项时，播放正确提示音，并自动进入下一个单词。
4. **单词朗读**：
   - 每次进入新单词时，自动朗读该单词。
   - 如果用户点击选项时单词仍在朗读，则中断朗读。

---

## **2. 技术栈**

- **框架**：React Native
- **语言**：JavaScript/TypeScript
- **状态管理**：React Context 或 Redux
- **音效播放**：`react-native-sound` 或 `expo-av`
- **文本转语音（TTS）**：`react-native-tts`
- **路由导航**：`@react-navigation/native`
- **UI 组件库**：`react-native-paper` 或自定义组件
- **数据存储**：`AsyncStorage` 或 `SQLite`
- **调试工具**：React Native Debugger、Flipper

---

## **3. 功能模块设计**

### **3.1 单词展示模块**

- **功能描述**：
  - 页面顶部显示当前单词（加粗字体）。
  - 单词下方显示四个中文释义选项（一个正确，三个错误）。
- **实现要点**：
  - 使用 `<Text>` 组件显示单词。
  - 使用 `<TouchableOpacity>` 或 `<Button>` 组件实现选项点击。

### **3.2 选项选择模块**

- **功能描述**：
  - 用户点击选项后，判断选项是否正确。
  - 根据选择结果播放音效，并更新 UI。
- **实现要点**：
  - 使用 `react-native-sound` 或 `expo-av` 播放音效。
  - 使用状态管理（如 `useState`）记录用户选择结果。

### **3.3 单词朗读模块**

- **功能描述**：
  - 每次进入新单词时，自动朗读该单词。
  - 如果用户点击选项时单词仍在朗读，则中断朗读。
- **实现要点**：
  - 使用 `react-native-tts` 实现文本转语音。
  - 使用 `TTS.stop()` 中断朗读。

### **3.4 数据管理模块**

- **功能描述**：
  - 存储单词数据（单词、正确释义、错误释义）。
  - 记录用户学习进度。
- **实现要点**：
  - 使用 `AsyncStorage` 或 `SQLite` 存储数据。
  - 使用 JSON 文件或 API 获取单词数据。

---

## **4. 页面设计**

### **4.1 首页**

- **布局**：
  - 顶部：单词展示区域。
  - 中部：四个选项按钮。
  - 底部：进度条或统计信息（可选）。
- **交互**：
  - 点击选项后，显示反馈并进入下一个单词。

### **4.2 设置页（可选）**

- **功能**：
  - 调整音效开关。
  - 调整朗读速度。
  - 重置学习进度。

---

## **5. 数据结构**

### **5.1 单词数据**

```json
[
  {
    "id": 1,
    "word": "apple",
    "correctMeaning": "苹果",
    "wrongMeanings": ["香蕉", "橘子", "梨"]
  },
  {
    "id": 2,
    "word": "banana",
    "correctMeaning": "香蕉",
    "wrongMeanings": ["苹果", "橘子", "梨"]
  }
]
```

### **5.2 用户进度数据**

```json
{
  "currentWordId": 1, // 当前学习的单词 ID
  "correctCount": 10, // 正确次数
  "wrongCount": 5 // 错误次数
}
```

---

## **6. 开发计划**

### **6.1 第一阶段：基础功能开发**

- 完成单词展示和选项选择功能。
- 实现音效反馈功能。
- 实现单词朗读功能。

### **6.2 第二阶段：数据管理**

- 实现单词数据的加载和存储。
- 实现用户学习进度的记录。

### **6.3 第三阶段：优化与测试**

- 优化 UI 设计。
- 测试音效和朗读功能。
- 修复已知问题。

---

## **7. 关键代码示例**

### **7.1 单词展示与选项选择**

```javascript
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const WordScreen = ({ word, correctMeaning, wrongMeanings, onAnswer }) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (meaning) => {
    setSelected(meaning);
    onAnswer(meaning === correctMeaning);
  };

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{word}</Text>
      {[correctMeaning, ...wrongMeanings].map((meaning, index) => (
        <TouchableOpacity key={index} onPress={() => handleSelect(meaning)}>
          <Text>{meaning}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
```

### **7.2 音效播放**

```javascript
import Sound from "react-native-sound";

const playSound = (isCorrect) => {
  const soundFile = isCorrect ? "correct.mp3" : "wrong.mp3";
  const sound = new Sound(soundFile, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log("Failed to load sound", error);
      return;
    }
    sound.play();
  });
};
```

### **7.3 单词朗读**

```javascript
import Tts from "react-native-tts";

const speakWord = (word) => {
  Tts.stop(); // 中断当前朗读
  Tts.speak(word);
};
```

---

## **8. 测试计划**

### **8.1 功能测试**

- 测试单词展示和选项选择功能。
- 测试音效播放和单词朗读功能。

### **8.2 兼容性测试**

- 测试不同安卓版本的兼容性。

### **8.3 性能测试**

- 测试应用的内存占用和响应速度。

---

## **9. 部署与发布**

1. 使用 `react-native run-android` 在本地运行应用。
2. 使用 Android Studio 打包 APK 文件。
3. 发布到 Google Play 商店。

---

## **10. 风险与应对**

- **风险**：音效或朗读功能在不同设备上表现不一致。
- **应对**：测试多种设备，确保功能兼容性。

---

## **11. 参考资料**

- [React Native 官方文档](https://reactnative.dev/)
- [React Navigation 文档](https://reactnavigation.org/)
- [react-native-sound 文档](https://github.com/zmxv/react-native-sound)
- [react-native-tts 文档](https://github.com/ak1394/react-native-tts)

---
