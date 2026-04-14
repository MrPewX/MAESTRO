// MAESTRO GLOBAL API CONFIGURATION
const API_URL = 'https://script.google.com/macros/s/AKfycbz064mnnDQk44jyE7Kj9RZg6fVkJHQP4ng36IUM9a38Mk44Fiz088HSRxFIkLXGqk3TfA/exec';

// FUNGSI DAFTAR (POST ke Google Sheets)
async function registerToDB(userData) {
    try {
        await fetch(API_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'register', ...userData })
        });
        return { status: 'success' };
    } catch (e) {
        console.error('Register Error:', e);
        return { status: 'error' };
    }
}

// FUNGSI LOGIN (GET ke Google Sheets untuk response JSON yang stabil)
async function loginFromDB(username, password) {
    try {
        const url = `${API_URL}?action=login_check&user=${encodeURIComponent(username)}&pass=${encodeURIComponent(password)}`;
        const response = await fetch(url, { redirect: 'follow' });
        const result = await response.json();
        return result;
    } catch (e) {
        console.error('Login Error:', e);
        return { status: 'error', message: 'Koneksi database terputus' };
    }
}

async function getMasterData() {
    try {
        const response = await fetch(`${API_URL}?action=get_master_data`, { redirect: 'follow' });
        return await response.json();
    } catch (e) { return null; }
}

async function pushLog(action, details) {
    try {
        await fetch(API_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({ action: 'save_transaction', user: localStorage.getItem('username'), details: details })
        });
    } catch (e) {}
}

function logout() {
    localStorage.clear();
    window.location.href = 'login.html';
}
