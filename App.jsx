import { useState } from 'react'
import './style.css'
import CalendarHeader from './components/CalendarHeader'
import CalendarGrid from './components/CalendarGrid'
import TaskPanel from './components/TaskPanel'
import AiPanel from './components/AiPanel'

function App() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [tasks, setTasks] = useState({})

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

  const handleAddTask = (taskText) => {
    if (!selectedDate) {
      alert('日付を選んでください')
      return
    }
    
    const key = selectedDate.toISOString().split('T')[0]
    setTasks(prevTasks => ({
      ...prevTasks,
      [key]: [...(prevTasks[key] || []), taskText]
    }))
  }

  return (
    <div>
      <h1>デモカレンダー</h1>
      
      <CalendarHeader
        currentMonth={currentMonth}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      
      <CalendarGrid
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onSelectDate={handleSelectDate}
      />
      
      <TaskPanel
        selectedDate={selectedDate}
        tasks={tasks}
        onAddTask={handleAddTask}
      />
      
      <AiPanel />
    </div>
  )
}

export default App
