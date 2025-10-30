import CalendarHeader from './CalendarHeader'
import CalendarGrid from './CalendarGrid'
import { formatDateKey, formatDateDisplay } from './dateUtils'

function CalendarPage({
  currentMonth,
  selectedDate,
  tasks,
  onPrevMonth,
  onNextMonth,
  onSelectDate
}) {
  const key = selectedDate ? formatDateKey(selectedDate) : null
  let selectedTasks = key && tasks[key] ? tasks[key] : []

  // ★ 重要度が高い順にソート
  selectedTasks = [...selectedTasks].sort((a, b) => (b.priority || 0) - (a.priority || 0))

  // ★ 重要度に応じた色（TaskPageと統一）
  const getPriorityColor = (level) => {
    switch (level) {
      case 1: return '#60a5fa' // 青（低）
      case 2: return '#34d399' // 緑（やや低）
      case 3: return '#facc15' // 黄（普通）
      case 4: return '#fb923c' // オレンジ（高）
      case 5: return '#ef4444' // 赤（最重要）
      default: return '#d1d5db' // グレー（未設定）
    }
  }

  return (
    <div className="page-content">
      <h1>カレンダー</h1>

      {/* 月移動ヘッダー */}
      <CalendarHeader
        currentMonth={currentMonth}
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
      />

      {/* カレンダー本体 */}
      <CalendarGrid
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onSelectDate={onSelectDate}
      />

      {/* 選択日表示 */}
      {selectedDate && (
        <p className="selected-date-info">
          選択中: {formatDateDisplay(selectedDate)}
        </p>
      )}

      {/* タスク一覧（重要度順） */}
      <div className="task-list-section">
        <h3>📅 {formatDateDisplay(selectedDate)} のタスク</h3>
        {selectedTasks.length === 0 ? (
          <p>タスクはありません</p>
        ) : (
          <ul className="task-list">
            {selectedTasks.map((task, index) => (
              <li key={index} className="task-item">
                {/* ← 左端に色バー */}
                <div
                  className="priority-bar"
                  style={{ backgroundColor: getPriorityColor(task.priority) }}
                ></div>

                {/* タスク内容 */}
                <div className="task-content">
                  <strong>{task.title}</strong>
                  <div className="task-meta">
                    {task.estimatedTime && <span>⏱ {task.estimatedTime}分</span>}
                    {task.startDate && task.endDate && (
                      <span>📆 {task.startDate}〜{task.endDate}</span>
                    )}
                    <span>重要度: {task.priority || 0}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <style jsx>{`
        .task-list-section {
          margin-top: 20px;
        }

        .task-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px; /* 少し詰める */
        }

        .task-item {
          position: relative;
          display: flex;
          align-items: stretch;
          border: 1.5px solid #e5e7eb;
          border-radius: 6px;
          background: white;
          transition: all 0.2s;
          overflow: hidden;
        }
        
        .priority-bar {
          position: absolute;
          left: -1.5px; /* ← border分ずらす */
          top: -1.5px;  /* 枠線に合わせる */
          bottom: -1.5px;
          width: 8px;   /* バー幅＋border分 */
          border-radius: 6px 0 0 6px;
        }

        .task-item:hover {
          border-color: #3b82f6;
          background: #f9fafb;
          transform: translateY(-1px);
        }

        .task-content {
          display: flex;
          flex-direction: column;
          padding: 6px 10px; /* 枠線とバーに沿う */
          color: #111;
          font-size: 0.9rem;
        }

        .task-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 0.8rem;
          color: #6b7280;
        }

        .selected-date-info {
          color: #374151;
          font-weight: 500;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  )
}

export default CalendarPage
