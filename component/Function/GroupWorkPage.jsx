import React, { useState, useEffect } from "react";

function GroupWorkPage() {

  const [progress, setProgress] = useState(0);

  // デモ用に自動で進むアニメーション
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 5 : 100));
    }, 200);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="page-content">
      <h1>グループワーク</h1>

      <div className="groupwork-section">
        <p>グループワーク機能は準備中です。</p>

        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            height: "20px",
            backgroundColor: "#eee",
            borderRadius: "10px",
            overflow: "hidden",
            marginTop: "10px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "#4caf50",
              transition: "width 0.3s ease",
            }}
          />
        </div>
        <p>{progress}% 準備完了</p>
        
        <div className="feature-list">
          <h3>今後追加予定の機能:</h3>
          <ul>
            <li>グループの作成・管理</li>
            <li>メンバーとのタスク共有</li>
            <li>共同編集機能</li>
            <li>進捗状況の確認</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default GroupWorkPage
