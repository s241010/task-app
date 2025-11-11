import { useState, useEffect } from 'react'
import './style.css'
import NavigationBar from '../component/Function/NavigationBar'
import TaskPage from '../component/Function/TaskPage'
import ChatPage from '../component/Function/ChatPage'
import CalendarPage from '../component/Function/CalendarPage'
import GroupWorkPage from '../component/Function/GroupWorkPage'
import SettingsPage from '../component/Function/SettingsPage'
import TaskDetailPage from '../component/Function/TaskDetailPage'
import { formatDateKey } from '../component/Function/dateUtils'
import { createClient } from '@supabase/supabase-js'

// ✅ Supabase初期化
const supabaseUrl = 'https://zcbubwuhbkbjoxpneemg.supabase.co'
const supabaseAnonKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjYnVid3VoYmtiam94cG5lZW1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4NTM5NzEsImV4cCI6MjA3NjQyOTk3MX0.1pRZrkCSqD97qRjZBYNM2sd4t1ZFkd-HQP2kUJQMA28'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

function App() {
  const [currentPage, setCurrentPage] = useState(() => localStorage.getItem('lastPage') || 'calendar')
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : {}
  })
  const [selectedTask, setSelectedTask] = useState(null)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('lastPage', currentPage)
  }, [currentPage])

  // 起動時にSupabaseからタスク取得
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data, error } = await supabase.from('task_fn').select('*')
        if (error) throw error
        const loadedTasks = {}
        data.forEach((row) => {
          const task = {
            title: row.tit,
            detail: row.det,
            estimatedTime: row.est,
            priority: row.pri,
            startDate: row.sta,
            endDate: row.end,
          }
          const key = formatDateKey(new Date(task.startDate))
          if (!loadedTasks[key]) loadedTasks[key] = []
          loadedTasks[key].push(task)
        })
        setTasks(loadedTasks)
        localStorage.setItem('tasks', JSON.stringify(loadedTasks))
      } catch (err) {
        console.warn('Supabase読み込み失敗:', err.message)
      }
    }
    fetchTasks()
  }, [])

  const handleAddTask = async (taskData) => {
    const newTasks = { ...tasks }

    // カレンダー表示用に日付ごとにコピー
    const start = new Date(taskData.startDate)
    const end = new Date(taskData.endDate)
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const key = formatDateKey(new Date(d))
      if (!newTasks[key]) newTasks[key] = []
      newTasks[key].push({ ...taskData })
    }

    // Supabaseに一度だけ保存
    try {
      const { error } = await supabase.from('task_fn').insert([
        {
          tit: taskData.title,
          det: taskData.detail,
          est: taskData.estimatedTime,
          pri: taskData.priority,
          sta: taskData.startDate,
          end: taskData.endDate,
        },
      ])
      if (error) console.warn('Supabase保存失敗:', error.message)
    } catch (e) {
      console.warn('Supabase通信エラー:', e)
    }

    setTasks(newTasks)
    localStorage.setItem('tasks', JSON.stringify(newTasks))
  }

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
  const handleTaskClick = (task) => { setSelectedTask(task); setCurrentPage('task-detail') }
  const handleBackFromDetail = () => { setSelectedTask(null); setCurrentPage('tasks') }
  const handleUpdateTaskTime = (task, elapsedTime) => {
    setTasks(prev => {
      const updated = { ...prev }
      const key = task.startDate
      updated[key] = updated[key].map(t =>
        t.title === task.title ? { ...t, loggedTime: elapsedTime } : t
      )
      localStorage.setItem('tasks', JSON.stringify(updated))
      return updated
    })
  }
  const handleToggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))

  const renderPage = () => {
    switch (currentPage) {
      case 'tasks':
        return <TaskPage selectedDate={selectedDate} tasks={tasks} onAddTask={handleAddTask} onTaskClick={handleTaskClick} />
      case 'task-detail':
        return <TaskDetailPage task={selectedTask} onBack={handleBackFromDetail} onUpdateTaskTime={handleUpdateTaskTime} />
      case 'chat': return <ChatPage />
      case 'calendar':
        return <CalendarPage currentMonth={currentMonth} selectedDate={selectedDate} onPrevMonth={handlePrevMonth} onNextMonth={handleNextMonth} onSelectDate={handleSelectDate} tasks={tasks} />
      case 'groupwork': return <GroupWorkPage />
      case 'settings': return <SettingsPage theme={theme} onToggleTheme={handleToggleTheme} />
      default: return <CalendarPage />
    }
  }

  return (
    <div className="app-container">
      <div className="main-content">
        {renderPage()}
      </div>
      <NavigationBar currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  )
}

export default App
