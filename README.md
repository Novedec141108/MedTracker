Medicine Tracker

Daily medicine tracker with calendar, email reminders, and monthly reports.

## Features

- **Up to 4 users** with email support (for reminders and monthly reports)
- **Up to 5 medicines per user** with flexible frequency presets
  - Every day
  - Alternate day (odd days of month)
  - Custom cycle (e.g., 2 days on / 1 day off)
- **Monthly calendar** for 2026 with weekday headers
- **Click a date** → modal shows user/medicine list for that date
- **Mark medicine taken** → timestamp captured, date turns green
- **Undo button** to revert a marked medicine
- **Daily email reminders** (sent at 8 AM)
- **Monthly info sheet** emailed at start of each month (summary of medicines taken)
- **Data persistence**: localStorage (frontend) + file (backend)

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Email (Required for Reminders)
Edit your environment variables or set them before running:
```bash
$env:EMAIL_USER = "your-email@gmail.com"
$env:EMAIL_PASS = "your-app-password"
```
**Note**: Use a Gmail app password, not your main password. [Get one here](https://support.google.com/accounts/answer/185833).

### 3. Start the Backend Server
```bash
npm start
```
Server runs on `http://localhost:3000`.

### 4. Open Frontend
Open `index.html` in a browser (e.g., `http://localhost:3000/index.html` or just open the file locally).

## How to Use

1. **Add Users**: Enter name + email (email optional but required for email reminders)
2. **Select a User**: Click their name
3. **Add Medicines**: Choose medicine name and frequency
4. **View Calendar**: Select month (2026)
5. **Mark Medicines**: Click any date → modal opens showing scheduled medicines
   - Click "Mark Taken" to log the time
   - Click "Undo" to remove a mark
6. **Email Reminders**: Daily reminders sent at 8 AM with list of medicines for that day
7. **Monthly Report**: Auto-sent monthly with summary of medicines taken

## API Endpoints

- `POST /api/save-tracking` – Save tracking data
- `GET /api/load-tracking` – Load tracking data
- `POST /api/send-daily-reminders` – Trigger daily reminder email (called automatically at 8 AM)
- `POST /api/send-monthly-sheet` – Trigger monthly report email

## Files

- `index.html` – Frontend UI
- `app.css` – Styles
- `app.js` – Frontend logic (modal, calendar, mark/undo)
- `server.js` – Backend (Express, Nodemailer, scheduler)
- `package.json` – Dependencies
- `README.md` – This file

## Notes

- Data is stored both in browser localStorage and on the server (file-based).
- Daily reminders scheduled for 8 AM daily.
- Monthly reports sent at start of each month.
- For testing without email, you can comment out the transporter configuration in `server.js`.
