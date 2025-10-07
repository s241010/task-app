import React, { useState } from "react";
import "./App.css";

function App() {
  // 現在選択中のタブ（初期値：カレンダー）
  const [activeTab, setActiveTab] = useState("calendar");

  // ナビゲーションのアイコン一覧
  const tabs = [
    { id: "calendar", label: "カレンダー", black: "/calendar_black.png", blue: "/calendar_blue.png" },
    { id: "groupwork", label: "グループワーク", black: "/groupwork_black.png", blue: "/groupwork_blue.png" },
    { id: "task", label: "タスク", black: "/task_black.png", blue: "/task_blue.png" },
    { id: "chat", label: "チャット", black: "/chat_black.png", blue: "/chat_blue.png" },
    { id: "setting", label: "設定", black: "/setting_black.png", blue: "/setting_blue.png" },
  ];

  return (
    <div className="app-container">
      {/* ===== メイン画面部分 ===== */}
      <div className="main-content">
        {/* 各タブに応じた画面内容 */}
        {activeTab === "calendar" && <h1>📅 カレンダー画面</h1>}
        {activeTab === "groupwork" && <h1>👥 グループワーク画面</h1>}
        {activeTab === "task" && <h1>✅ タスク画面</h1>}
        {activeTab === "chat" && <h1>💬 チャット画面</h1>}
        {activeTab === "setting" && <h1>⚙️ 設定画面</h1>}
      </div>

      {/* ===== 下部ナビゲーションバー ===== */}
      <div className="bottom-nav">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-button ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)} // タブ切り替え
          >
            {/* アクティブなタブは青アイコン、それ以外は黒 */}
            <img
              src={activeTab === tab.id ? tab.blue : tab.black}
              alt={tab.label}
              className="nav-icon"
            />
            <span className="nav-label">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
