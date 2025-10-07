import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import styles from "./styles";

export default function App() {
  const [activeTab, setActiveTab] = useState("calendar");

  const tabs = [
    { key: "calendar", black: require("./assets/calendar_black.png"), blue: require("./assets/calendar_blue.png"), label: "カレンダー" },
    { key: "groupwork", black: require("./assets/groupwork_black.png"), blue: require("./assets/groupwork_blue.png"), label: "グループ" },
    { key: "task", black: require("./assets/task_black.png"), blue: require("./assets/task_blue.png"), label: "タスク" },
    { key: "chat", black: require("./assets/chat_black.png"), blue: require("./assets/chat_blue.png"), label: "チャット" },
    { key: "setting", black: require("./assets/setting_black.png"), blue: require("./assets/setting_blue.png"), label: "設定" },
  ];

  const renderScreen = () => {
    switch (activeTab) {
      case "calendar":
        return <Text style={styles.screenText}>📅 カレンダー画面</Text>;
      case "groupwork":
        return <Text style={styles.screenText}>👥 グループワーク画面</Text>;
      case "task":
        return <Text style={styles.screenText}>✅ タスク画面</Text>;
      case "chat":
        return <Text style={styles.screenText}>💬 チャット画面</Text>;
      case "setting":
        return <Text style={styles.screenText}>⚙️ 設定画面</Text>;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>{renderScreen()}</View>
      <View style={styles.bottomNav}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabButton}
            onPress={() => setActiveTab(tab.key)}
          >
            <Image
              source={activeTab === tab.key ? tab.blue : tab.black}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
