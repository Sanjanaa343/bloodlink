import os
from flask import Flask, render_template, request, redirect, url_for
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default-dev-key')

# --- Routes & Navigation Handlers ---

@app.route('/')
def index():
    return render_template('auth/login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        return redirect(url_for('donor_dashboard'))
    return render_template('auth/register.html')

@app.route('/login', methods=['POST'])
def login():
    role = request.form.get('roleSelect', 'admin')
    email = request.form.get('email', '')

    if 'staff@citybloodbank' in email or role == 'bloodbank':
        return redirect(url_for('bloodbank_dashboard'))
    elif 'er@cityhospital' in email or role == 'hospital':
        return redirect(url_for('hospital_dashboard'))
    elif 'donor' in email or role == 'donor':
        return redirect(url_for('donor_dashboard'))
    else:
        return redirect(url_for('admin_dashboard'))

@app.route('/logout')
def logout():
    return redirect(url_for('index'))

@app.route('/admin')
def admin_dashboard():
    return render_template('admin/dashboard.html')

@app.route('/bloodbank')
def bloodbank_dashboard():
    return render_template('blood_bank/dashboard.html')

@app.route('/hospital')
def hospital_dashboard():
    return render_template('hospital/dashboard.html')

@app.route('/donor')
def donor_dashboard():
    return render_template('donor/dashboard.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)