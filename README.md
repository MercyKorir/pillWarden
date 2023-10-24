# PillWarden App

The PillWarden App is a simple application that helps users manage their medications and keep track of their medication schedule. Users can create medication schedules, set reminders for when to take them, and even assign caretakers or caregivers to receive notifications. The app sends notifications to remind users when it's time to take their medication.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Deployment](#deployment)
- [License](#license)

## Features

- **User Authentication:** Secure user authentication using JWT tokens.
- **Medication Management:** Create, update, and delete medication entries.
- **Medication Scheduling:** Set specific times and frequencies for medication reminders.
- **Notification Channels:** Receive reminders via email, SMS, WhatsApp, or call.
- **Caretaker/Giver Assignments:** Users can assign others to receive notifications.
- **User Preferences:** Customize notification preferences.

## Tech Stack

- **Node.js and Express:** Server-side application logic.
- **MongoDB:** Database to store user data and medication schedules.
- **React:** Frontend user interface.
- **Passport.js:** Authentication handling.
- **JWT (JSON Web Tokens):** Secure user authentication.
- **Third-Party APIs:** Integration for email, SMS, WhatsApp, and call notifications.

## Installation

1. Clone the repository: `git clone https://github.com/MercyKorir/pillWarden.git`
2. Install dependencies with `cd server && npm install`
3. Start the app with `cd client && npm install`

## Configuration

1. Create a `.env` file in the server directory with the following environment variables:

```env```
DB_URI=your-mongodb-connection-uri
JWT_SECRET=your-secret-key
# Add other API keys for WhatsApp, SMS, etc.

2. Configure your email, SMS, and other API services as per your requirements

## Usage

1. Start the server: `cd server && npm start`
2. Start the client:  `cd client && npm start`

## Deployment

- Deploy your app to a hosting platform of your choice.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
