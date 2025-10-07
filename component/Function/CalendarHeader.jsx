function CalendarHeader({ currentMonth, onPrevMonth, onNextMonth }) {
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth() + 1

  return (
    <div id="calendarHeader">
      <button onClick={onPrevMonth}>◀</button>
      <span id="monthLabel">{year}年 {month}月</span>
      <button onClick={onNextMonth}>▶</button>
    </div>
  )
}

export default CalendarHeader
