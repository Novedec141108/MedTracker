#!/usr/bin/env python3
import smtplib
import json
import os
import time
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from pathlib import Path

# Email credentials
EMAIL_USER = 'iksha.jain@gmail.com'
EMAIL_PASS = 'gcrb qrso qhzs jcrk'

def send_reminders():
    """Send medicine reminders to all users via email"""
    try:
        # Load user data
        data_file = Path(__file__).parent / 'tracking-data.json'
        if not data_file.exists():
            print("No tracking data found yet")
            return
        
        with open(data_file, 'r') as f:
            data = json.load(f)
        
        users = data.get('users', [])
        
        # Connect to Gmail
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.login(EMAIL_USER, EMAIL_PASS)
        
        # Send emails
        for user in users:
            if not user.get('email'):
                continue
            
            meds = ', '.join([m['name'] for m in user.get('meds', [])])
            if not meds:
                continue
            
            # Create email
            msg = MIMEMultipart()
            msg['From'] = EMAIL_USER
            msg['To'] = user['email']
            msg['Subject'] = '💊 Medicine Reminder - 5:00 PM'
            
            body = f"""
            <html>
                <body>
                    <h2>Time for your medicines!</h2>
                    <p>Hi {user['name']},</p>
                    <p>This is a reminder to take your medicines at 5:00 PM:</p>
                    <p><strong>{meds}</strong></p>
                    <p>Please mark them as taken in the app.</p>
                    <p>Stay healthy! 💪</p>
                </body>
            </html>
            """
            
            msg.attach(MIMEText(body, 'html'))
            server.send_message(msg)
            print(f"✅ Reminder sent to {user['email']}")
        
        server.quit()
        
    except Exception as e:
        print(f"❌ Error sending reminders: {e}")

def schedule_daily_reminders():
    """Schedule reminders to run at 4:46 PM every day"""
    while True:
        now = datetime.now()
        target = now.replace(hour=16, minute=46, second=0, microsecond=0)
        
        # If time has passed today, schedule for tomorrow
        if now > target:
            target = target.replace(day=target.day + 1)
        
        wait_seconds = (target - now).total_seconds()
        print(f"Next reminder scheduled for {target.strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"Waiting {int(wait_seconds)} seconds...")
        
        time.sleep(wait_seconds)
        print(f"⏰ Sending reminders at {datetime.now().strftime('%H:%M:%S')}...")
        send_reminders()

if __name__ == '__main__':
    print("🔔 Medicine Tracker - Email Reminder Service")
    print(f"📧 Using email: {EMAIL_USER}")
    print("⏰ Reminders will be sent at 4:46 PM daily")
    print("-" * 50)
    schedule_daily_reminders()
