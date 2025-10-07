import { useState } from 'react'
import './style.css'
import NavigationBar from './components/NavigationBar'
import TaskPage from './pages/TaskPage'
import ChatPage from './pages/ChatPage'
import CalendarPage from './pages/CalendarPage'
import GroupWorkPage from './pages/GroupWorkPage'
import SettingsPage from './pages/SettingsPage'
import TaskDetailPage from './pages/TaskDetailPage'
import { formatDateKey } from './utils/dateUtils'

function App() {
  const [currentPage, setCurrentPage] = useState('calendar')
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [tasks, setTasks] = useState({})
  const [selectedTask, setSelectedTask] = useState(null)

  // --- タスク追加処理 ---
  const handleAddTask = async (taskData) => {
    if (!selectedDate) return
    const key = formatDateKey(selectedDate)

    // DBにも送信（API用意済み想定）
    try {
      await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: key, ...taskData }),
      })
    } catch (e) {
      console.warn('DB保存エラー:', e)
    }

    // ローカル反映
    setTasks(prev => ({
      ...prev,
      [key]: [...(prev[key] || []), taskData]
    }))
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

  const handleSelectDate = (date) => {
    setSelectedDate(date)
  }

  const handleTaskClick = (task) => {
    setSelectedTask(task)
    setCurrentPage('task-detail')
  }

  const handleBackFromDetail = () => {
    setSelectedTask(null)
    setCurrentPage('tasks')
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
