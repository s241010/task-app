import { useState } from 'react'
import './style.css'
import NavigationBar from '../component/Function/NavigationBar'
import TaskPage from '../component/Function/TaskPage'
import ChatPage from '../component/Function/ChatPage'
import CalendarPage from '../component/Function/CalendarPage'
import GroupWorkPage from '../component/Function/GroupWorkPage'
import SettingsPage from '../component/Function/SettingsPage'
import TaskDetailPage from '../component/Function/TaskDetailPage'
import { formatDateKey } from '../component/Function/dateUtils'

function App() {
  const [currentPage, setCurrentPage] = useState('calendar')
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [tasks, setTasks] = useState({})
  const [selectedTask, setSelectedTask] = useState(null)

  // --- 🟢 タスク追加処理 ---
  const handleAddTask = async (taskData) => {
    if (!taskData.startDate || !taskData.endDate) {
      alert('開始日と終了日を設定してください')
      return
    }

    const start = new Date(taskData.startDate)
    const end = new Date(taskData.endDate)
    const newTasks = { ...tasks }

    // 🔁 startDate〜endDateの範囲すべての日に登録
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const key = formatDateKey(new Date(d))
      if (!newTasks[key]) newTasks[key] = []

      // 🟡 各日に独立したオブジェクトを push（参照切り離し）
      newTasks[key].push({ ...taskData })
    }

    // --- 🔵 DB送信（オプション） ---
    try {
      await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      })
    } catch (e) {
      console.warn('DB保存エラー:', e)
    }

    setTasks(newTasks)
  }

  // --- カレンダー制御 ---
  const handlePrevMonth = () => {
    const newDate = new Date(currentMonth)
    newDate.setMonth(newDate.getMonth() - 1)
    setCurrentMonth(newDate)
  }

  const handleNextMonth = () => {
    const newDate = new Date(currentMonth)
    newDate.setMonth(newDate.getMonth() + 1)
    setCurrentMonth(newDate)
  }

  const handleSelectDate = (date) => setSelectedDate(date)

  const handleTaskClick = (task) => {
    setSelectedTask(task)
    setCurrentPage('task-detail')
  }

  const handleBackFromDetail = () => {
    setSelectedTask(null)
    setCurrentPage('tasks')
  }

  // --- ⏱ タスク時間を更新する（ストップウォッチ用） ---
  const handleUpdateTaskTime = (task, elapsedTime) => {
    setTasks(prev => {
      const updated = { ...prev }
      const key = task.startDate
      updated[key] = updated[key].map(t =>
        t.title === task.title ? { ...t, loggedTime: elapsedTime } : t
      )
      return updated
    })
  }

  // --- ページ切り替え ---
  const renderPage = () => {
    switch (currentPage) {
      case 'tasks':
        return (
          <TaskPage
            selectedDate={selectedDate}
            tasks={tasks}
            onAddTask={handleAddTask}
            onTaskClick={handleTaskClick}
          />
        )
      case 'task-detail':
        return (
          <TaskDetailPage
            task={selectedTask}
            onBack={handleBackFromDetail}
            onUpdateTaskTime={handleUpdateTaskTime}
          />
        )
      case 'chat':
        return <ChatPage />
      case 'calendar':
        return (
          <CalendarPage
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onSelectDate={handleSelectDate}
            tasks={tasks}
          />
        )
      case 'groupwork':
        return <GroupWorkPage />
      case 'settings':
        return <SettingsPage />
      default:
        return <CalendarPage />
    }
  }

  return (
    <div className="app-container">
      <div className="main-content">
        {renderPage()}
      </div>
      <NavigationBar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}

export default App
