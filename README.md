# AI Fitness Assistant

A personalized AI-powered fitness platform that provides customized workout plans, nutrition advice, and fitness tracking tailored to your individual profile.

## Features

- **Personalized Workout Plans**: AI-generated exercise routines based on your weight, height, age, and fitness goals
- **Nutrition Advice**: Customized dietary recommendations and meal planning
- **Fitness Tracking**: Monitor your progress and achievements
- **AI-Powered Chatbot**: Get instant answers to your fitness and nutrition questions
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui
- **Build Tool**: Vite
- **Routing**: React Router
- **State Management**: TanStack Query
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd ai-fitness-assistant
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── ContactForm.tsx # Contact form component
├── pages/              # Page components
│   ├── Index.tsx       # Home page
│   ├── Contact.tsx     # Contact page
│   └── NotFound.tsx    # 404 page
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── App.tsx             # Main application component
```

## Design System

The app uses a custom green-based color palette:

- **Brand Green** (#04BF62): Primary buttons, headers
- **Brand Accent** (#3EC381): Secondary elements, icons
- **Brand Light** (#E6F0DC): Backgrounds, cards
- **Brand Dark** (#1C2A18): Text, navigation
- **Success** (#6EEA8E): Success states
- **Warning** (#FF9900): Alerts, warnings
- **Neutral Gray** (#D9E0E2): Borders, dividers

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features in Development

- User authentication and profiles
- Workout plan generation based on user metrics
- Nutrition tracking and meal planning
- Progress analytics and reporting
- Social features and community

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please visit our [contact page](/contact) or reach out to:
- Email: support@aifitness.com
- Phone: +1 (555) 123-FLEX

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
