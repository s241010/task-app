import { useState } from 'react'

function ChatPage() {
  const [aiInput, setAiInput] = useState('')
  const [aiResult, setAiResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleAskAi = async () => {
    const prompt = aiInput.trim()
    if (!prompt) return

    setIsLoading(true)
    setAiResult('読み込み中...')

    try {
      const res = await fetch('/api/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      })
      
      const data = await res.json()
      
      if (data.error) {
        setAiResult(`エラー: ${data.error}`)
      } else {
        setAiResult(data.choices?.[0]?.message?.content || 'AIから返答なし')
      }
    } catch (error) {
      setAiResult(`エラー: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="page-content">
      <h1>AIチャット</h1>
      
      <div className="chat-input-section">
        <input
          type="text"
          placeholder="AIに質問を入力"
          value={aiInput}
          onChange={(e) => setAiInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAskAi()}
          disabled={isLoading}
        />
        <button onClick={handleAskAi} disabled={isLoading}>
          送信
        </button>
      </div>
      
      <div className="chat-result-section">
        {aiResult && (
          <div className="ai-response">
            <h3>AI の回答:</h3>
            <p>{aiResult}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatPage
