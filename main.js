// MAESTRO GLOBAL API CONFIGURATION
const API_URL = 'https://script.google.com/macros/s/AKfycbyLHwjBUAWRxO_eu8CIYy1gVJT791vZ9H6BhNlRckJBpn3FKc79zr1RndHr7CFHq7HrMw/exec';

// Fungsi untuk Mengambil Data Utama dari Google Sheets
async function getMasterData() {
    try {
        const response = await fetch(`${API_URL}?action=get_master_data`);
        const data = await response.json();
        console.log('Data dari Google Drive berhasil dimuat:', data);
        return data;
    } catch (error) {
        console.error('Gagal mengambil data dari Google Drive:', error);
        return null;
    }
}

// Fungsi untuk Mencatat Aktivitas ke Google Drive (Audit Trail)
async function pushLog(action, details) {
    const username = localStorage.getItem('username') || 'Unknown';
    try {
        await fetch(API_URL, {
            method: 'POST',
            mode: 'no-cors', // Penting untuk GAS
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'save_transaction',
                user: username,
                details: details
            })
        });
        console.log('Log aktivitas berhasil dikirim ke Google Drive');
    } catch (error) {
        console.log('Aktivitas dicatat secara lokal (Koneksi Database Offline)');
    }
}

// Inisialisasi Lucide Icons secara Global
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

// Fungsi Logout Global
function logout() {
    localStorage.clear();
    window.location.href = 'login.html';
}
