import { useState } from 'react'
import { formatDateKey } from './dateUtils'

function TaskPage({ selectedDate, tasks, onAddTask, onTaskClick }) {
  const [showModal, setShowModal] = useState(false)
  const [taskInput, setTaskInput] = useState('')
  const [detail, setDetail] = useState('')
  const [estimatedTime, setEstimatedTime] = useState('')
  const [priority, setPriority] = useState(3)
  const [startDate, setStartDate] = useState(selectedDate || null)
  const [endDate, setEndDate] = useState(selectedDate || null)

  const today = formatDateKey(new Date())
  const todayTasks = (tasks[today] || []).sort((a, b) => b.priority - a.priority)

  const handleAddClick = () => setShowModal(true)

  const handleConfirmAdd = async () => {
    const title = taskInput.trim()
    if (!title) return alert('タスク名を入力してください')
    if (!startDate || !endDate) return alert('開始日と終了日を選択してください')
    if (endDate < startDate) return alert('終了日は開始日以降の日付を選んでください')

    const newTask = {
      title,
      detail,
      estimatedTime,
      priority: Number(priority),
      startDate: formatDateKey(startDate),
      endDate: formatDateKey(endDate),
    }

    await onAddTask(newTask)
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

  const getPriorityColor = (level) => {
    switch (level) {
      case 1: return '#60a5fa'
      case 2: return '#34d399'
      case 3: return '#facc15'
      case 4: return '#fb923c'
      case 5: return '#ef4444'
      default: return '#d1d5db'
    }
  }

  return (
    <>
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
      </div>

      {/* CSS */}
      <style jsx>{`
        .add-task-btn {
          margin-bottom: 10px;
          padding: 8px 16px;
          border: none;
          background: var(--accent);
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
          background: var(--card-bg);
          border: 2px solid var(--border-color);
          border-radius: 8px;
          padding: 12px 16px;
          display: flex;
          align-items: stretch;
          transition: 0.2s;
          color: var(--text-color);
          text-align: left;
        }

        .task-item-btn:hover {
          border-color: var(--accent);
          background: rgba(59,130,246,0.1);
        }

        .priority-bar {
          width: 8px;
          flex-shrink: 0;
          border-radius: 4px 0 0 4px;
          margin-right: 12px;
        }

        .modal-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100vw; height: 100vh;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: var(--card-bg);
          color: var(--text-color);
          border: 1px solid var(--border-color);
          padding: 20px;
          border-radius: 10px;
          width: 90%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .modal-content input,
        .modal-content textarea,
        .modal-content select {
          background: var(--bg-color);
          color: var(--text-color);
          border: 1px solid var(--border-color);
          padding: 8px;
          border-radius: 6px;
        }

        .modal-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }

        .modal-buttons button {
          background: var(--accent);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px 16px;
          cursor: pointer;
        }

        .modal-buttons button:first-child {
          background: #9ca3af;
        }
      `}</style>
    </>
  )
}

export default TaskPage