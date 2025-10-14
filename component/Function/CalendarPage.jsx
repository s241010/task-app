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
  const selectedTasks = key && tasks[key] ? tasks[key] : []

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

      {/* ↓ ここを追加 */}
      <div className="ta">
        <h3>📅 {formatDateDisplay(selectedDate)} のタスク</h3>
        {selectedTasks.length === 0 ? (
          <p>タスクはありません</p>
        ) : (
          <ul>
            {selectedTasks.map((task, index) => (
              <li key={index}>
                <strong>{task.title}</strong><br />
                {task.estimatedTime && <small>予想時間: {task.estimatedTime}分</small>}<br />
                {task.duration && <small>期間: {task.duration}</small>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default CalendarPage
