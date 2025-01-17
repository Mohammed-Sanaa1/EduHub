# EduHub

## Overview

EduHub is an innovative online educational platform designed to revolutionize the way people of all ages and backgrounds learn. It offers a comprehensive learning experience tailored to a wide range of subjects. The project is structured to include a user-friendly interface, progress tracking, and personalized recommendations based on user interests.

## Key Features

- User registration with personal information capture (name, age, interests).
- Tailored course recommendations.
- A broad selection of educational categories for exploration.
- Progress tracking and history of completed courses.
- Compatibility with a MongoDB database and React-based frontend.

## How to Run the Project

### Prerequisites

- Node.js installed.
- MongoDB database connection.
- A valid YouTube API key (if the API key in the project exceeds request limits).

### Steps

#### 1. Start the Frontend

Navigate to the `my-app_withDB` folder and execute the following command:

```bash
npm start
```

For more information about the React setup, refer to the `README.md` file in the `my-app_withDB` folder.

#### 2. Start the Backend

Navigate to the `server` folder and execute:

```bash
npx nodemon server.js
```

#### 3. Configure MongoDB

Update the `.env` file in the `server` folder with your MongoDB database credentials.

Example:

```env
DATABASE_URI=mongodb+srv://username:password@cluster0.3p5prrf.mongodb.net/eduhubDB?retryWrites=true&w=majority
```

You can find a sample database setup in the `my-app_withDB\data\db` folder.

#### 4. Update YouTube API Key

In case the provided YouTube API key becomes invalid after excessive requests:

1. Generate a new API key from the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. Update the API key in the `dashboard` page:
   ```bash
   /src/components/dashboard
   ```

---

Thank you for exploring EduHub! I hope you find the platform both innovative and easy to use.

