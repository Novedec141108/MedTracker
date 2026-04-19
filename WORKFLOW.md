# Multi-Page Medicine Tracker Workflow

## Page Flow

### Page 1: Start / Manage Users
- **Add User**: Enter name + email (optional)
- **View Users**: List all users (max 4)
- **Delete User**: Remove a user and all their medicines
- **Next**: Click "Select a User" button to go to Page 2

### Page 2: Select User
- **List Users**: Click on any user to select them
- **Next**: Automatically goes to Page 3 (Manage Medicines)
- **Back**: Returns to Page 1

### Page 3: Manage Medicines
- **Shows**: Selected user's name at the top
- **Add Medicine**: Enter medicine name + frequency
  - Every day
  - Alternate day (odd days of month)
  - Custom cycle (e.g., 2 days on / 1 day off)
- **View Medicines**: List all medicines for this user (max 5)
- **Delete Medicine**: Remove a medicine
- **Next**: Click "View Calendar" to go to Page 4
- **Back**: Returns to Page 2 to select another user

### Page 4: Calendar
- **Shows**: Selected user's name and calendar for 2026
- **Month Selector**: Switch between months
- **Calendar Display**:
  - Red dot = medicines scheduled but NOT all taken
  - Green background = ALL medicines taken
  - Click any date to mark medicines
- **Mark Medicines**: Modal popup to mark/undo taken medicines
- **Back**: Returns to Page 3 (can view medicines again or go back to Page 2)

## Features

✅ Multiple users (max 4)
✅ Multiple medicines per user (max 5)
✅ Flexible scheduling (daily, alternate, custom cycle)
✅ Per-user calendar view
✅ Red dot indicator for pending medicines
✅ Green background when all medicines taken
✅ Timestamp capture
✅ Undo functionality
✅ Email reminders (if backend running)
✅ Data persistence (localStorage + backend)

## User Journey Example

1. Start on Page 1
2. Add "Alice" with email alice@example.com
3. Add "Bob" with email bob@example.com
4. Click "Select a User" → Page 2
5. Click "Alice" → Page 3
6. Add medicines for Alice (e.g., "Aspirin" - daily)
7. Click "View Calendar" → Page 4
8. See April 2026 calendar with red dots on dates Alice has medicines
9. Click a date → Mark medicines as taken
10. Date turns green when all taken
11. Click "Back" → Page 3 → "Back" → Page 2
12. Click "Bob" → Add medicines for Bob
13. Follow same process for Bob

## Key Differences from Previous Version

- **Single-user view**: Each user has their own dedicated calendar
- **Clear navigation**: Back buttons throughout to navigate between pages
- **Focused workflow**: Add/manage/view is streamlined per user
- **Easier switching**: "Back" button lets you switch to another user
