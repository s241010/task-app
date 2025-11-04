import { useState } from 'react'
import { formatDateKey } from './dateUtils'

function TaskPage({ selectedDate, tasks, onAddTask, onTaskClick }) {
  const [showModal, setShowModal] = useState(false)
  const [taskInput, setTaskInput] = useState('')
  const [detail, setDetail] = useState('')
  const [estimatedTime, setEstimatedTime] = useState('')
  const [priority, setPriority] = useState(3) // ★ 重要度：デフォルトは3（普通）
  const [startDate, setStartDate] = useState(selectedDate || null)
  const [endDate, setEndDate] = useState(selectedDate || null)

  const today = formatDateKey(new Date())
  const todayTasks = (tasks[today] || []).sort((a, b) => b.priority - a.priority) // ★ 重要度高い順に並べる

  const handleAddClick = () => {
    setShowModal(true)
  }

  const handleConfirmAdd = () => {
    const title = taskInput.trim()
    if (!title) return alert('タスク名を入力してください')
    if (!startDate || !endDate) return alert('開始日と終了日を選択してください')
    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime()))
      return alert('有効な日付を選択してください')
    if (endDate < startDate) return alert('終了日は開始日以降の日付を選んでください')

    const newTask = {
      title,
      detail,
      estimatedTime,
      priority: Number(priority), // ★ 追加
      startDate: formatDateKey(startDate),
      endDate: formatDateKey(endDate),
    }

    onAddTask(newTask)
    resetForm()
  }

  const resetForm = () => {
    setShowModal(false)
    setTaskInput('')
    setDetail('')
    setEstimatedTime('')
    setPriority(3)
    setStartDate(selectedDate || null)
    setEndDate(selectedDate || null)
  }

  const formatDate = (date) => {
    if (!date) return '日付未選択'
    const y = date.getFullYear()
    const m = date.getMonth() + 1
    const d = date.getDate()
    return `${y}年${m}月${d}日`
  }

  // ★ 重要度に応じた色
  const getPriorityColor = (level) => {
    switch (level) {
      case 1: return '#60a5fa' // 青
      case 2: return '#34d399' // 緑
      case 3: return '#facc15' // 黄
      case 4: return '#fb923c' // オレンジ
      case 5: return '#ef4444' // 赤
      default: return '#d1d5db' // グレー
    }
  }

  return (
    <div className="page-content">
      <h1>タスク管理</h1>

      <button className="add-task-btn" onClick={handleAddClick}>
        ＋ タスクを追加
      </button>

      <div className="task-list-section">
        <h3>📅 今日のタスク</h3>
        {todayTasks.length === 0 ? (
          <p className="empty-message">今日のタスクはありません</p>
        ) : (
          <div className="task-buttons">
            {todayTasks.map((task, index) => (
              <button
                key={index}
                className="task-item-btn"
                onClick={() => onTaskClick(task)}
              >
                <div
                  className="priority-bar"
                  style={{ backgroundColor: getPriorityColor(task.priority) }}
                ></div>
                <div className="task-btn-content">
                  <strong>{task.title}</strong>
                  <div className="task-btn-meta">
                    <span>重要度: {task.priority}</span>
                    {task.estimatedTime && <span>⏱ {task.estimatedTime}分</span>}
                    {task.startDate && task.endDate && (
                      <span>📆 {task.startDate}〜{task.endDate}</span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* モーダル */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>新しいタスクを追加</h2>

            <input
              type="text"
              placeholder="タスク名"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
            <textarea
              placeholder="詳細"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
            />

            <div className="date-range-picker">
              <label>開始日：</label>
              <input
                type="date"
                value={startDate ? formatDateKey(startDate) : ''}
                onChange={(e) => {
                  const [y, m, d] = e.target.value.split('-').map(Number)
                  setStartDate(new Date(y, m - 1, d))
                }}
              />

              <label>終了日：</label>
              <input
                type="date"
                value={endDate ? formatDateKey(endDate) : ''}
                onChange={(e) => {
                  const [y, m, d] = e.target.value.split('-').map(Number)
                  setEndDate(new Date(y, m - 1, d))
                }}
              />
            </div>

            {/* ★ 重要度選択 */}
            <div className="priority-select">
              <label>重要度：</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="1">1（低）</option>
                <option value="2">2（やや低）</option>
                <option value="3">3（普通）</option>
                <option value="4">4（高）</option>
                <option value="5">5（最重要）</option>
              </select>
            </div>

            <input
              type="number"
              placeholder="予想時間（分）"
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
            />

            <div className="modal-buttons">
              <button onClick={resetForm}>キャンセル</button>
              <button onClick={handleConfirmAdd}>追加</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .add-task-btn {
          margin-bottom: 10px;
          padding: 8px 16px;
          border: none;
          background: #3b82f6;
          color: white;
          border-radius: 8px;
          cursor: pointer;
        }

        .task-buttons {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .task-item-btn {
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          padding: 12px 16px;
          cursor: pointer;
          display: flex;
          align-items: stretch; /* ← stretchに変更 */
          transition: all 0.2s;
          text-align: left;
          color: #000;
          position: relative;
        }
        
        .priority-bar {
          width: 8px;
          flex-shrink: 0;
          border-radius: 4px 0 0 4px;
          margin-right: 12px;
        }
        
        .task-item-btn:hover {
          border-color: #3b82f6;
          background: #eff6ff;
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .task-btn-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .task-btn-meta {
          display: flex;
          gap: 12px;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .priority-select {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 10px;
          width: 90%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .modal-buttons {
          display: flex;
          justify-content: space-between;
        }

        .date-range-picker {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        textarea {
          resize: vertical;
          min-height: 60px;
        }
      `}</style>
    </div>
  )
}

export default TaskPage