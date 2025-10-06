import React, { useState } from 'react';
import './App.css';
// AITaskInputコンポーネントをインポート
import AITaskInput from '../components/AITaskColl';

// AIからのタスクデータの型
interface TaskData {
  taskName: string;
  dueDate: string | null;
  dueTime: string | null;
  subTasks: string[];
}

// カレンダーが持つタスク全体の型
interface TasksState {
  [key: string]: string[];
}

// 日付を 'YYYY-MM-DD' 形式の文字列に変換するヘルパー関数
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [tasks, setTasks] = useState<TasksState>({});
  const [taskInput, setTaskInput] = useState('');

  // ★★★ AIからのデータでタスクを追加する新しい関数 ★★★
  const handleAddTaskFromAI = (data: TaskData) => {
    // AIが日付を特定できなかった場合は、現在選択中の日付に追加
    const targetDate = data.dueDate || selectedDate;
    const taskText = data.taskName; // AIが抽出したタスク名

    if (!taskText) return;

    // tasksステートを更新
    setTasks(prevTasks => {
      const newTasks = { ...prevTasks };
      if (!newTasks[targetDate]) {
        newTasks[targetDate] = [];
      }
      newTasks[targetDate].push(taskText);
      // サブタスクも追加する場合
      if (data.subTasks && data.subTasks.length > 0) {
        data.subTasks.forEach(sub => newTasks[targetDate].push(`- ${sub}`));
      }
      return newTasks;
    });

    // AIが特定した日付を選択状態にする
    if(data.dueDate) {
      setSelectedDate(data.dueDate);
    }
  };

  // 手動でタスクを追加する処理
  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!taskInput.trim()) return;

    setTasks(prevTasks => {
      const newTasks = { ...prevTasks };
      if (!newTasks[selectedDate]) {
        newTasks[selectedDate] = [];
      }
      newTasks[selectedDate].push(taskInput);
      return newTasks;
    });

    setTaskInput('');
  };

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

  return (
    <div className="app-container">
      <h1>📅 シンプルタスクカレンダー</h1>
      
      {/* --- ここからカレンダー本体 --- */}
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
      {/* --- ここまでカレンダー本体 --- */}

      <div className="task-container">
        <AITaskInput onTaskCreated={handleAddTaskFromAI} />

        <h3 style={{marginTop: '2rem'}}>{selectedDate} のタスク</h3>

        <form onSubmit={handleAddTask} className="task-form">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="新しいタスクを手動入力"
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
