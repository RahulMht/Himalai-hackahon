# Himalai-hackahon

### Team member
- Rahul Ravi Mahatha
- Bhavuk Thapa

# Government Reporting System

A modern web application built with Next.js that streamlines the process of generating and sending government reports via email.

## Overview

The Government Reporting System is designed to simplify the process of creating, reviewing, and sending official reports. It features a user-friendly interface with real-time email content editing, report ID tracking, and secure submission handling.

## Features

- 📝 Dynamic report generation
- ✏️ Real-time email content editing
- 🔍 Report ID tracking system
- 🔒 Secure report submission
- 📧 Automated email delivery
- 🎨 Modern, responsive UI with animations
- 💫 Smooth user experience with Framer Motion

## Tech Stack

- Next.js 13+ (React Framework)
- TypeScript
- Tailwind CSS (Styling)
- Framer Motion (Animations)
- React Hot Toast (Notifications)

## Prerequisites

Before running this project, make sure you have:

- Node.js 16.x or later
- npm or yarn package manager
- Git (for version control)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/reporting-system.git
cd reporting-system
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add necessary environment variables:
```env
# Add any required environment variables here
NEXT_PUBLIC_API_ENDPOINT=your_api_endpoint
```

## Running the Application

1. For development:
```bash
npm run dev
# or
yarn dev
```

2. For production:
```bash
npm run build
npm start
# or
yarn build
yarn start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
reporting-system/
├── src/
│   ├── app/
│   │   ├── report/
│   │   │   └── success/
│   │   │       └── page.tsx
│   │   ├── components/
│   ├── styles/
│   └── utils/
├── public/
└── package.json
```

## Usage

1. Navigate to the report creation page
2. Fill in the required report details
3. Review the generated report
4. Edit the email content if needed
5. Submit the report for processing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
