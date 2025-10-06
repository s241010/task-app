import React, { useState } from 'react';
import './App.css';

function AITaskInput() {
  const [text, setText] = useState('');
  const [taskData, setTaskData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTaskData(null);

    try {
      // 自作のバックエンドAPIエンドポイントを呼び出す
      const response = await fetch('/api/generateTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setTaskData(data); // AIからのレスポンスをstateに保存
      console.log('AI Response:', data);

      // ここで、dataを使ってカレンダーにタスクを追加する処理を呼び出す
      // e.g., addTask({ name: data.taskName, date: data.dueDate, ... })

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="例: 明日の夜7時に母に電話する"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? '解析中...' : 'AIでタスク追加'}
        </button>
      </form>

      {taskData && (
        <div style={{ marginTop: '20px', background: '#f0f0f0', padding: '10px' }}>
          <h4>AIによる解析結果:</h4>
          <p><strong>タスク名:</strong> {taskData.taskName}</p>
          <p><strong>期限日:</strong> {taskData.dueDate || '未設定'}</p>
          <p><strong>時間:</strong> {taskData.dueTime || '未設定'}</p>
          {taskData.subTasks && taskData.subTasks.length > 0 && (
            <>
              <strong>サブタスク案:</strong>
              <ul>
                {taskData.subTasks.map((sub, index) => <li key={index}>{sub}</li>)}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default AITaskInput;
export default App;