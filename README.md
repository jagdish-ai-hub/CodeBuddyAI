# CodeBuddy AI

An AI-powered programming tutor built for Hackathons.

## 🚀 Deployment to Vercel

1. **Push to GitHub:** Ensure this code is pushed to a repository.
2. **Import in Vercel:** Create a new project in Vercel and import your repository.
3. **Environment Variables:**
   - Go to **Settings** > **Environment Variables**.
   - Add a new variable:
     - **Key:** `API_KEY`
     - **Value:** Your Gemini API Key (starts with `AIza...`).
4. **Deploy:** Vercel will automatically detect Vite and build the project.

## 🛠 Local Development

1. Create a `.env` file in the root directory:
   ```bash
   API_KEY=your_actual_api_key_here
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the dev server:
   ```bash
   npm run dev
   ```

## 🏗 Tech Stack
- **Framework:** React 18 + Vite
- **AI:** Google Gemini API (Gemini 3 Flash, Gemini 2.5 TTS/Vision)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
