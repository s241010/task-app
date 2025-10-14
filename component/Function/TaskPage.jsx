import { useState } from 'react'
import { formatDateKey } from './dateUtils'

function TaskPage({ selectedDate, tasks, onAddTask, onTaskClick }) {
  const [showModal, setShowModal] = useState(false)
  const [taskInput, setTaskInput] = useState('')
  const [detail, setDetail] = useState('')
  const [estimatedTime, setEstimatedTime] = useState('')
  const [startDate, setStartDate] = useState(selectedDate || null)
  const [endDate, setEndDate] = useState(selectedDate || null)

  const today = formatDateKey(new Date())
  const todayTasks = tasks[today] || []

  const handleAddClick = () => {
    setShowModal(true)
  }

  const handleConfirmAdd = () => {
    const title = taskInput.trim()
    if (!title) {
      alert('タスク名を入力してください')
      return
    }

    if (!startDate || !endDate) {
      alert('開始日と終了日を選択してください')
      return
    }

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      alert('有効な日付を選択してください')
      return
    }

    if (endDate < startDate) {
      alert('終了日は開始日以降の日付を選んでください')
      return
    }

    const newTask = {
      title,
      detail,
      estimatedTime,
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
                <div className="task-btn-content">
                  <strong>{task.title}</strong>
                  <div className="task-btn-meta">
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
                  if (!e.target.value) {
                    setStartDate(null)
                    return
                  }
                  const [year, month, day] = e.target.value.split('-').map(Number)
                  const date = new Date(year, month - 1, day)
                  if (!Number.isNaN(date.getTime())) {
                    setStartDate(date)
                  }
                }}
              />

              <label>終了日：</label>
              <input
                type="date"
                value={endDate ? formatDateKey(endDate) : ''}
                onChange={(e) => {
                  if (!e.target.value) {
                    setEndDate(null)
                    return
                  }
                  const [year, month, day] = e.target.value.split('-').map(Number)
                  const date = new Date(year, month - 1, day)
                  if (!Number.isNaN(date.getTime())) {
                    setEndDate(date)
                  }
                }}
              />
            </div>

            <input
              type="number"
              placeholder="予想時間（分）"
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
            />

            <div className="modal-buttons">
              <button onClick={handleConfirmAdd}>追加</button>
              <button onClick={resetForm}>キャンセル</button>
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
          transition: all 0.2s;
          text-align: left;
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
