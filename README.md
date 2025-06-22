# Surf Forecast Pro

A modern Next.js web application that provides two-week surf forecasts and revenue tracking for surf businesses and enthusiasts.

## Features

### 🌊 Surf Forecast
- **14-Day Forecast**: Detailed wave predictions with height, wind, and tide information
- **Multiple Locations**: Support for popular California surf spots
- **Condition Ratings**: Star-based rating system for surf quality
- **Weather Summary**: Current conditions and weekly averages
- **Best Days Highlighting**: Automatically identifies optimal surf days

### 💰 Revenue Tracker
- **Income & Expense Tracking**: Monitor surf-related business revenue
- **Category Management**: Organize entries by surf lessons, equipment, etc.
- **Real-time Calculations**: Automatic net revenue calculations
- **Entry Management**: Add, edit, and delete financial entries
- **Visual Summaries**: Quick overview of income, expenses, and net profit

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Ocean Theme**: Beautiful gradient design with surf-inspired colors
- **Interactive Components**: Smooth animations and hover effects
- **Loading States**: Professional loading animations
- **Real-time Updates**: Dynamic data updates without page refresh

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Charts**: Recharts (ready for future enhancements)
- **HTTP Client**: Axios (for API integrations)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd surf-forecast-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
surf-forecast-app/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── SurfForecast.tsx   # 14-day forecast display
│   ├── RevenueTracker.tsx # Revenue tracking system
│   ├── LocationSelector.tsx # Location picker
│   └── WeatherSummary.tsx # Weather summary widget
├── public/               # Static assets
└── package.json          # Dependencies and scripts
```

## Features in Detail

### Surf Forecast Component
- Displays 14-day forecast with detailed wave information
- Color-coded wave heights (green for small, yellow for medium, red for large)
- Condition badges (Good, Fair, Poor)
- Star ratings for each day
- Responsive grid layout

### Revenue Tracker Component
- Add income and expense entries
- Categorize transactions (Surf Lessons, Equipment, etc.)
- Real-time calculation of totals
- Delete entries functionality
- Visual summary cards

### Location Selector
- Dropdown with popular California surf spots
- Coordinates display
- Quick stats for each location
- Current conditions summary

### Weather Summary
- Today's detailed weather conditions
- Weekly averages
- Best surf days highlighting
- Weather icons based on conditions

## Future Enhancements

- **Real API Integration**: Connect to weather APIs for live data
- **Charts & Analytics**: Add revenue charts and surf statistics
- **User Authentication**: User accounts and data persistence
- **Mobile App**: React Native version
- **Notifications**: Surf alerts and reminders
- **Social Features**: Share conditions and photos
- **Advanced Analytics**: Historical data and trends

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.

---

**Surf Forecast Pro** - Making surf forecasting and business management easier for surf enthusiasts and professionals. 