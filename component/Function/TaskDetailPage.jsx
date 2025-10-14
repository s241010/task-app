function TaskDetailPage({ task, onBack }) {
  if (!task) return <p>タスクが見つかりません</p>

  return (
    <div className="page-content">
      <button className="back-btn" onClick={onBack}>← 戻る</button>
      
      <div className="task-detail-container">
        <h1 className="task-title">{task.title}</h1>
        
        <div className="task-info-section">
          <div className="info-item">
            <span className="info-label">📅 期間:</span>
            <span className="info-value">
              {task.startDate} 〜 {task.endDate}
            </span>
          </div>
          
          {task.estimatedTime && (
            <div className="info-item">
              <span className="info-label">⏱ 予想時間:</span>
              <span className="info-value">{task.estimatedTime}分</span>
            </div>
          )}
        </div>

        {task.detail && (
          <div className="task-detail-section">
            <h3>📝 詳細</h3>
            <p className="task-detail-text">{task.detail}</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .back-btn {
          margin-bottom: 20px;
          padding: 8px 16px;
          border: 1px solid #d1d5db;
          background: #3b82f6;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .back-btn:hover {
          background: blue;
        }

        .task-detail-container {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .task-title {
          margin-bottom: 20px;
          color: #111827;
          font-size: 1.5rem;
        }

        .task-info-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .info-label {
          font-weight: 500;
          color: #6b7280;
          min-width: 100px;
        }

        .info-value {
          color: #111827;
        }

        .task-detail-section {
          margin-top: 20px;
        }

        .task-detail-section h3 {
          margin-bottom: 12px;
          color: #374151;
          font-size: 1.1rem;
        }

        .task-detail-text {
          background: #f9fafb;
          padding: 12px;
          border-radius: 6px;
          color: #374151;
          line-height: 1.6;
          white-space: pre-wrap;
        }
      `}</style>
    </div>
  )
}

export default TaskDetailPage
