function SettingsPage() {
  return (
    <div className="page-content">
      <h1>設定</h1>
      
      <div className="settings-section">
        <div className="setting-item">
          <h3>アプリケーション情報</h3>
          <p>バージョン: 1.0.0</p>
          <p>React + Vite で構築されたカレンダーアプリ</p>
        </div>
        
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
