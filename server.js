import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || ''
  }
});

// Endpoint: save tracking data (called by frontend)
app.post('/api/save-tracking', (req, res) => {
  try {
    const dataPath = path.join(process.cwd(), 'tracking-data.json');
    fs.writeFileSync(dataPath, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Endpoint: load tracking data
app.get('/api/load-tracking', (req, res) => {
  try {
    const dataPath = path.join(process.cwd(), 'tracking-data.json');
    let trackingData = { users: [], records: {} };
    if (fs.existsSync(dataPath)) {
      trackingData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    }
    res.json(trackingData);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Simple cron-like scheduler for reminders (runs at 5:00 PM daily)
function scheduleReminders() {
  const now = new Date();
  const target = new Date();
  target.setHours(17, 0, 0, 0); // 5:00 PM
  
  if (now > target) {
    target.setDate(target.getDate() + 1);
  }
  
  const timeUntil = target - now;
  console.log(`Next medicine reminder scheduled for ${target.toLocaleString()}`);
  
  setTimeout(() => {
    console.log('Sending medicine reminders at 5:00 PM...');
    sendDailyReminders();
    scheduleReminders(); // Reschedule for next day
  }, timeUntil);
}

// Send email reminders
async function sendDailyReminders() {
  try {
    const dataPath = path.join(process.cwd(), 'tracking-data.json');
    let trackingData = { users: [] };
    
    if (fs.existsSync(dataPath)) {
      trackingData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    }
    
    const users = trackingData.users || [];
    const today = new Date().toISOString().split('T')[0];
    
    for (const user of users) {
      if (!user.email) continue;
      
      const pendingMeds = (user.meds || []).filter(med => med.name).map(m => m.name).join(', ');
      
      if (!pendingMeds) continue;
      
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: '💊 Medicine Reminder - 4:05 PM',
        html: `
          <h2>Time for your medicines!</h2>
          <p>Hi ${user.name},</p>
          <p>This is a reminder to take your medicines:</p>
          <p><strong>${pendingMeds}</strong></p>
          <p>Please mark them as taken in the app.</p>
          <p>Stay healthy! 💪</p>
        `
      };
      
      await transporter.sendMail(mailOptions);
      console.log(`Reminder sent to ${user.email}`);
    }
  } catch (err) {
    console.error('Error sending reminders:', err);
  }
}

app.listen(PORT, () => {
  console.log(`Medicine Tracker Server running on http://localhost:${PORT}`);
  console.log('Set EMAIL_USER and EMAIL_PASS environment variables for email reminders.');
  console.log('Daily reminders will be sent at 5:00 PM.');
  scheduleReminders();
});
