import { useState } from 'react'

function AiPanel() {
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
    <div>
      <h2>AIに質問</h2>
      <input
        type="text"
        id="aiInput"
        placeholder="質問"
        value={aiInput}
        onChange={(e) => setAiInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAskAi()}
        disabled={isLoading}
      />
      <button id="aiBtn" onClick={handleAskAi} disabled={isLoading}>
        送信
      </button>
      <p id="aiResult">{aiResult}</p>
    </div>
  )
}

export default AiPanel
