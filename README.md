# Diagnosis Web App 🩺

A web-based AI diagnosis assistant that simulates a doctor-patient interaction. Users describe their health issues via a chat interface, and the AI guides them through a conversational diagnostic process using a predefined system prompt.

## ✨ Key Features

*   **Chat Interface**: Conversational UI for entering symptoms and receiving AI-driven diagnostic guidance.
*   **Conversational Memory**: AI maintains context within each session for relevant and coherent responses.
*   **New Diagnosis**: Start a fresh diagnostic session anytime.
*   **Local History**: Previous sessions are saved to browser local storage for later review.
*   **Export to PDF**: Download any diagnostic session as a formatted PDF document.
*   **Secure API Integration**: Backend API routes handle communication with the OpenAI API securely.

## 🚀 Tech Stack

*   **Frontend Framework**: Next.js (React)
*   **Styling**: Tailwind CSS
*   **UI Components**: shadcn/ui
*   **Icons**: Lucide-react
*   **State Management**: Zustand
*   **Data Fetching**: React Query (implicitly used for API calls)
*   **PDF Export**: html2pdf.js / jsPDF (planned)
*   **AI Backend**: Next.js API Route + OpenAI API
*   **Deployment**: Vercel

## ⚙️ Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-directory>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add your OpenAI API key:
    ```
    # Example environment variables for Diagnosis Web App

    ## DeepSeek API configuration
    DEEPSEEK_API_KEY=your-deepseek-api-key-here
    DEEPSEEK_API_URL=https://api.deepseek.com

    ## Optional OpenAI API key (if using OpenAI directly)
    OPENAI_API_KEY=your-openai-api-key-here

    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## ☁️ Deployment

This project is configured for easy deployment on [Vercel](https://vercel.com/). Ensure your `API_KEYS` is added as an environment variable in your Vercel project settings.
