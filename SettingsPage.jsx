function SettingsPage({ theme, onToggleTheme }) {
  return (
    <div className="page-content">
      <h1>設定</h1>

      <div className="settings-section">

        {/* 🌙 テーマ設定 */}
        <div className="setting-item">
          <h3>テーマ設定</h3>
          <p>現在のテーマ: {theme === 'light' ? '🌞 ライトモード' : '🌙 ダークモード'}</p>
          <button className="theme-toggle-btn" onClick={onToggleTheme}>
            テーマを切り替える
          </button>
        </div>

        {/* ℹ️ アプリ情報 */}
        <div className="setting-item">
          <h3>アプリケーション情報</h3>
          <p>バージョン: 1.0.0</p>
          <p>React + Vite で構築されたカレンダーアプリ</p>
        </div>

        {/* 🔧 今後の機能 */}
        <div className="setting-item">
          <h3>今後追加予定の設定:</h3>
          <ul>
            <li>通知設定</li>
            <li>テーマカラー変更</li>
            <li>言語設定</li>
            <li>データのエクスポート・インポート</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage