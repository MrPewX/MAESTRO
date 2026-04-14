// MAESTRO GLOBAL API CONFIGURATION
const API_URL = 'https://script.google.com/macros/s/AKfycbyLHwjBUAWRxO_eu8CIYy1gVJT791vZ9H6BhNlRckJBpn3FKc79zr1RndHr7CFHq7HrMw/exec';

// FUNGSI PENDAFTARAN (POST ke Google Sheets)
async function registerToDB(userData) {
    try {
        await fetch(API_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({
                action: 'register',
                ...userData
            })
        });
        // Karena no-cors tidak bisa baca response, kita asumsikan sukses jika fetch berhasil
        return { status: 'success' };
    } catch (error) {
        console.error('Registration Error:', error);
        return { status: 'error' };
    }
}

// FUNGSI LOGIN (GET ke Google Sheets)
async function loginFromDB(username, password) {
    try {
        const url = `${API_URL}?action=login_check&user=${encodeURIComponent(username)}&pass=${encodeURIComponent(password)}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Login Error:', error);
        return { status: 'error' };
    }
}

async function getMasterData() {
    try {
        const response = await fetch(`${API_URL}?action=get_master_data`);
        return await response.json();
    } catch (error) {
        return null;
    }
}

async function pushLog(action, details) {
    const username = localStorage.getItem('username') || 'Unknown';
    try {
        await fetch(API_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({ action: 'save_transaction', user: username, details: details })
        });
    } catch (e) {}
}

function logout() {
    localStorage.clear();
    window.location.href = 'login.html';
}
