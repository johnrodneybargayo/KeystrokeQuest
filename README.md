![keystrokequest_logo](https://github.com/user-attachments/assets/ad5f22a8-8f1d-41bb-b2af-7719e784cb44)


# KeystrokeQuest

KeystrokeQuest is a React-based web application that allows developers and users to practice their typing speed and accuracy by typing randomly generated code snippets. The application tracks typing performance in real-time, saves scores to Firebase Realtime Database, and displays a leaderboard of top performers.

## Features

- **Randomized Code Snippets**: Generates random code snippets for typing practice.
- **Real-Time Performance Tracking**: Tracks words per minute (WPM) and accuracy as users type.
- **Timer**: Selectable countdown timer with durations of 60, 120, 180, and 300 seconds.
- **Save Scores**: Saves scores (username, WPM, accuracy) to Firebase Realtime Database.
- **Leaderboard**: Displays top performers with their WPM and accuracy.
- **Responsive Design**: Optimized for various screen sizes.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or above)
- npm or Yarn
- Firebase project setup

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/keystrokequest.git
   cd keystrokequest
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Add a `.env.local` file in the root directory with the following:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
     NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_firebase_database_url
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
     NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open the application in your browser at `http://localhost:3000`.

---

## Usage

1. Select a timer duration from the options provided.
2. Begin typing the code snippet displayed.
3. Monitor your real-time performance (accuracy and WPM).
4. Save your score to the leaderboard by entering your username.
5. View the leaderboard to see the top performers.

---

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Firebase Realtime Database
- **State Management**: React Hooks
- **UI Components**: Custom Button Component

---

## Changelog

### [1.0.0] - 11/28/2024
- Initial setup of the project with React and TypeScript.
- Firebase integration with Realtime Database for saving and retrieving scores.
- Randomized code snippet generation using `getRandomCodeSnippet`.
- Typing interface displaying real-time accuracy and WPM calculations.
- Timer functionality with selectable durations (60, 120, 180, 300 seconds).
- Save scores to Firebase with username, WPM, accuracy, and timestamp.

### [1.0.1] - 11/29/2024
- Leaderboard component to display top performers fetched from Firebase.
- Type-safe Firebase data mapping for leaderboard entries.
- Addressed null reference errors for `codeToType`.
- Fixed hydration mismatch by aligning code snippet fetching between SSR and CSR.

### [1.0.2] - 11/30/2024
- Modals for displaying test results and the leaderboard.
- Error handling for Firebase operations to ensure data integrity.
- Updated responsive UI for the leaderboard modal.
- Improved accuracy calculation logic for better precision.

### [1.0.3] - 12/01/2024
- Added a visible countdown timer above the typing interface.
- Added close buttons for modals with proper state management.
- Timer bug fix for proper reset functionality.

### [1.0.4] - 12/02/2024
- Improved Firebase rules to enhance security for read and write operations.
- Sorting logic in the leaderboard to rank users by WPM in descending order.
- Resolved hydration mismatch warnings during leaderboard modal rendering.

### [1.0.5] - 12/03/2024
- Type-safe interfaces for Firebase leaderboard entries.
- Error handling for invalid or missing username input.
- Addressed rare edge cases causing incorrect WPM calculations.
- Fixed leaderboard modal not opening on certain button clicks.

### [1.0.6] **2024-12-04**
- Added visual feedback for the running timer.
- Customized Reset and View Scoreboard button colors.

---

## Planned Features

- Add themes (light/dark mode).
- Implement user authentication for personal leaderboards.
- Introduce analytics to track typing trends over time.
- Add additional typing challenges with varied difficulty.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
