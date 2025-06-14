# EdgeFit - AI-Powered Fitness Platform

EdgeFit is a cutting-edge fitness platform that combines artificial intelligence with personalized fitness tracking to help users achieve their health and wellness goals. The platform offers a comprehensive suite of features powered by advanced machine learning models and a modern tech stack.

## 🌟 Key Features

- **AI-Powered Workout Recommendations**: Personalized exercise routines generated using machine learning models trained on extensive fitness data
- **Smart Nutrition Planning**: Customized meal plans and dietary recommendations based on user profiles and goals
- **Real-time Progress Tracking**: Advanced analytics and visualization of fitness metrics and achievements
- **Intelligent Chatbot Assistant**: AI-driven chatbot for instant fitness and nutrition guidance
- **User Authentication**: Secure login and profile management system
- **Responsive Design**: Seamless experience across all devices with a modern, intuitive interface

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: 
  - shadcn/ui components
  - Radix UI primitives
  - Custom components
- **State Management**: React Hook Form with Zod validation
- **Data Visualization**: Recharts
- **Icons**: Lucide React & React Icons
- **Notifications**: React Hot Toast & Sonner

### Backend
- **Framework**: FastAPI (Python)
- **Database**: Custom database implementation
- **Authentication**: JWT-based auth system
- **AI Integration**: Custom LLM models for fitness recommendations
- **API**: RESTful architecture with CORS support

### Development Tools
- **Build Tool**: Next.js
- **Package Manager**: npm/yarn
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Version Control**: Git

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Python 3.8+
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Sarvesh0906/Edgefit
cd edgefit
```

2. Install frontend dependencies:
```bash
cd Edgefit
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
pip install -r requirements.txt
```

4. Set up environment variables:
   - Create `.env` files in both frontend and backend directories
   - Configure necessary API keys and database credentials

5. Start the development servers:

Frontend:
```bash
cd Edgefit
npm run dev
```

Backend:
```bash
cd backend
python main.py
```

6. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## 📁 Project Structure

```
├── Edgefit/              # Frontend application
│   ├── app/              # Next.js app directory
│   ├── components/       # Reusable UI components
│   ├── lib/              # Utility functions
│   └── public/           # Static assets
│
├── backend/              # Backend application
│   ├── main.py           # FastAPI application
│   ├── auth.py           # Authentication logic
│   ├── chatbot.py        # AI chatbot implementation
│   ├── database.py       # Database operations
│   ├── models.py         # Data models
|   └── utils.py          # Utility Functions
│
└── data/                 # ML model training data
    ├── dailyActivity_merged.csv
    ├── data_cleaning.ipynb
    └── llm_model.ipynb
```

## 🎨 Design System

The application uses a modern, accessible design system with:

- **Color Palette**:
  - Primary: #04BF62 (Brand Green)
  - Secondary: #3EC381 (Brand Accent)
  - Background: #E6F0DC (Brand Light)
  - Text: #1C2A18 (Brand Dark)
  - Accent: #6EEA8E (Success)
  - Warning: #FF9900
  - Neutral: #D9E0E2

- **Typography**: Modern, readable font stack
- **Components**: Consistent, accessible UI components
- **Animations**: Smooth, performant transitions

## 🔧 Available Scripts

- `npm run dev` - Start frontend development server
- `npm run build` - Build frontend for production
- `npm run start` - Start production frontend server
- `npm run lint` - Run ESLint
- `python main.py` - Start backend server

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Built with ❤️ by the EdgeFit Team