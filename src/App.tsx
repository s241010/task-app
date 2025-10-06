import React, { useState } from 'react';

import "../components/AiTaskColl.tsx";
import './App.css';

// 日付を 'YYYY-MM-DD' 形式の文字列に変換するヘルパー関数
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const App = () => {
  // 現在の日付を基準にする
  const [currentDate, setCurrentDate] = useState(new Date());
  // 選択された日付の状態
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  // タスクリストの状態
  const [tasks, setTasks] = useState({});
  // 新規タスクの入力値の状態
  const [taskInput, setTaskInput] = useState('');

  // カレンダーのレンダリングロジック
  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // 月の初日と最終日を取得
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const daysInMonth = [];
    // 月の初日までの空白を埋める
    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
      daysInMonth.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // 月の日付を生成
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const date = new Date(year, month, day);
      const dateString = formatDate(date);
      const isSelected = dateString === selectedDate;
      const hasTask = tasks[dateString] && tasks[dateString].length > 0;

      daysInMonth.push(
        <div
          key={day}
          className={`calendar-day ${isSelected ? 'selected' : ''} ${hasTask ? 'has-task' : ''}`}
          onClick={() => setSelectedDate(dateString)}
        >
          {day}
        </div>
      );
    }

    return daysInMonth;
  };

  // 前の月へ移動
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // 次の月へ移動
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // タスクを追加する処理
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskInput.trim()) return; // 空の場合は追加しない

    const newTasks = { ...tasks };
    if (!newTasks[selectedDate]) {
      newTasks[selectedDate] = [];
    }
    newTasks[selectedDate].push(taskInput);

    setTasks(newTasks);
    setTaskInput(''); // 入力欄をクリア
  };

  return (
    <div className="app-container">
      <h1>📅 シンプルタスクカレンダー</h1>
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={goToPreviousMonth}>&lt;</button>
          <h2>{`${currentDate.getFullYear()}年 ${currentDate.getMonth() + 1}月`}</h2>
          <button onClick={goToNextMonth}>&gt;</button>
        </div>
        <div className="calendar-weekdays">
          <div>日</div><div>月</div><div>火</div><div>水</div><div>木</div><div>金</div><div>土</div>
        </div>
        <div className="calendar-grid">
          {renderCalendar()}
        </div>
      </div>

      <div className="task-container">
        <h3>{selectedDate} のタスク</h3>
        <form onSubmit={handleAddTask} className="task-form">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="新しいタスクを入力"
          />
          <button type="submit">追加</button>
        </form>
        <ul className="task-list">
          {tasks[selectedDate] && tasks[selectedDate].length > 0 ? (
            tasks[selectedDate].map((task, index) => (
              <li key={index}>{task}</li>
            ))
          ) : (
            <p>この日のタスクはありません。</p>
          )}
        </ul>
      </div>
    </div>
  );
};


export default App;