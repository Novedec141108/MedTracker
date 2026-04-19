# Troubleshooting

## Frontend Issues

### Calendar doesn't show weekday headers
- Make sure your browser supports CSS `display: contents`
- Modern browsers (Chrome 65+, Firefox 69+, Safari 16+, Edge 79+) support it

### Modal doesn't open when clicking a date
- Open browser console (F12) and check for JavaScript errors
- Make sure `dateModal` element is in the HTML

### Medicines not saving
- Check browser localStorage: F12 → Application → Local Storage → check `medicine-tracker-v1` key

## Backend Issues

### "Cannot find module" errors
- Run `npm install` again to ensure all dependencies are installed
- Check if you're in the correct directory

### Server won't start on port 3000
- Another app is using port 3000. Kill it or change PORT in server.js
- On Windows: `netstat -ano | findstr :3000`

### Email reminders not sending
- Check EMAIL_USER and EMAIL_PASS environment variables are set
- For Gmail: Use an app password, not your main password
- Verify the account has 2-factor authentication enabled
- Check server console for error messages

### "Could not sync to server" warning in browser
- This is normal if the backend isn't running
- Frontend still works with localStorage only
- Start the backend with `npm start` to enable backend sync

## Data

### How to reset all data
- Clear browser localStorage: F12 → Application → Clear All
- Delete `tracking-data.json` file to reset backend data

### How to backup data
- Export from browser: Copy localStorage value in F12
- From server: Copy `tracking-data.json` file

### How to export medicines list
- Currently not implemented, but you can:
  - Copy from browser console: `JSON.stringify(state.users, null, 2)`
  - Or manually screenshot the medicines list

## Email Customization

### Change reminder time from 8 AM
- Edit `server.js` line: `target.setHours(8, 0, 0, 0)`
- Change `8` to your desired hour (0-23, 24-hour format)

### Change email provider (not Gmail)
- Edit `server.js` transporter configuration
- See [Nodemailer transporter options](https://nodemailer.com/smtp/)
- Example for Office 365:
  ```javascript
  service: 'outlook',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  ```

### Customize email templates
- Edit HTML in `server.js` functions: `sendDailyReminders()` and `sendMonthlySheet()`
