import { useState, useRef, useEffect } from 'react'

function TaskDetailPage({ task, onBack, onUpdateTask }) {
  const [elapsedTime, setElapsedTime] = useState(task.loggedTime || 0)
  const [isRunning, setIsRunning] = useState(false)
  const timerRef = useRef(null)

  // タイマー動作
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1)
      }, 1000)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [isRunning])

  // 時間のフォーマット
  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0')
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
    const s = String(seconds % 60).padStart(2, '0')
    return `${h}:${m}:${s}`
  }

  // --- 時間を記録する処理 ---
  const handleSaveTime = () => {
    if (onUpdateTask) {
      onUpdateTask(task, elapsedTime)
      alert('作業時間を記録しました！')
    }
  }

  return (
    <div className="page-content">
      <button className="back-btn" onClick={onBack}>← 戻る</button>

      <div className="task-detail-container">
        <h1 className="task-title">{task.title}</h1>

        <div className="task-info-section">
          <div className="info-item">
            <span className="info-label">📅 期間:</span>
            <span className="info-value">{task.startDate} 〜 {task.endDate}</span>
          </div>

          {task.estimatedTime && (
            <div className="info-item">
              <span className="info-label">⏱ 予想時間:</span>
              <span className="info-value">{task.estimatedTime}分</span>
            </div>
          )}
        </div>

        {task.detail && (
          <div className="task-detail-section">
            <h3>📝 詳細</h3>
            <p className="task-detail-text">{task.detail}</p>
          </div>
        )}

        {/* --- ストップウォッチ --- */}
        <div className="stopwatch-section">
          <h3>⏳ 作業時間を記録</h3>
          <div className="time-display">{formatTime(elapsedTime)}</div>
          <div className="stopwatch-buttons">
            <button onClick={() => setIsRunning(true)} disabled={isRunning}>▶ 開始</button>
            <button onClick={() => setIsRunning(false)} disabled={!isRunning}>⏸ 停止</button>
            <button onClick={() => setElapsedTime(0)}>⏹ リセット</button>
            <button onClick={handleSaveTime}>💾 記録する</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .stopwatch-section {
          margin-top: 30px;
          background: #f3f4f6;
          padding: 16px;
          border-radius: 10px;
          text-align: center;
        }

        .time-display {
          font-size: 2rem;
          margin: 12px 0;
          color: #111827;
          font-weight: bold;
        }

        .stopwatch-buttons {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .stopwatch-buttons button {
          padding: 6px 14px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
        }

        .stopwatch-buttons button:nth-child(1) {
          background: #10b981;
          color: white;
        }

        .stopwatch-buttons button:nth-child(2) {
          background: #f59e0b;
          color: white;
        }

        .stopwatch-buttons button:nth-child(3) {
          background: #ef4444;
          color: white;
        }

        .stopwatch-buttons button:nth-child(4) {
          background: #3b82f6;
          color: white;
        }

        .stopwatch-buttons button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  )
}

export default TaskDetailPage