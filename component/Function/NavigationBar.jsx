function NavigationBar({ currentPage, onPageChange }) {
  const pages = [
    { id: 'tasks', label: 'タスク' },
    { id: 'chat', label: 'チャット' },
    { id: 'calendar', label: 'カレンダー' },
    { id: 'groupwork', label: 'グループワーク' },
    { id: 'settings', label: '設定' }
  ]

  return (
    <div className="nav-container">
      <nav className="navigation-bar">
        {pages.map(page => (
          <button
            key={page.id}
            className={`nav-button ${currentPage === page.id ? 'active' : ''}`}
            onClick={() => onPageChange(page.id)}
          >
            {page.label}
          </button>
        ))}
      </nav>

      <style jsx>{`
        /* ナビゲーション全体を中央に配置 */
        .nav-container {
          width: 100%;
          display: flex;
          justify-content: center; /* 中央寄せ */
          position: fixed;
          bottom: 0;
          left: 0;
          background: transparent;
          z-index: 100;
        }

        /* 実際のバー部分（細長い枠） */
        .navigation-bar {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 100%;
          max-width: 420px; /* ← ページ幅と揃える */
          height: 56px;
          background-color: #ffffff;
          border-top: 1.5px solid #e5e7eb;
          border-radius: 12px 12px 0 0; /* 丸みを上だけ */
          box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.08);
          margin: 0 auto;
        }

        .nav-button {
          flex: 1;
          text-align: center;
          background: none;
          border: none;
          font-size: 14px;
          color: #6b7280;
          font-weight: 500;
          height: 100%;
          cursor: pointer;
          transition: all 0.2s;
        }

        .nav-button:hover {
          background: #f3f4f6;
          color: #111827;
        }

        .nav-button.active {
          color: #3b82f6;
          border-top: 3px solid #3b82f6;
          background: #f9fafb;
        }
      `}</style>
    </div>
  )
}

export default NavigationBar