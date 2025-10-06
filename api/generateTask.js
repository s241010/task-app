import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.AIzaSyAFKBLrIdGKIILK3deHeZnKo9ZvzQHKKrE);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text input is required' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // プロンプト記述
    const prompt = `
      以下のテキストからタスク情報を抽出し、JSON形式で出力してください。
      ・taskName: タスクの内容
      ・dueDate: 日付 (YYYY-MM-DD形式)。日付が不明な場合はnull。
      ・dueTime: 時間 (HH:MM形式)。時間が不明な場合はnull。
      ・subTasks: 推定されるサブタスクの配列。なければ空配列[]。

      テキスト: "${text}"
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();

    const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch && jsonMatch[1]) {
        const jsonData = JSON.parse(jsonMatch[1]);
        res.status(200).json(jsonData);
    } else {
        res.status(500).json({ error: "Failed to parse AI response" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'AI service request failed' });
  }
}