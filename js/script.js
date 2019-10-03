
var interval = 5000
var identifiant;
var token;
console.log('coucou')

if ("geolocation" in navigator) {

  const request = new Request('https://30556981.ngrok.io', { method: 'POST', body: `{}` });
  fetch(request)
    .then(response => {
      identifiant = request.identifiant
      token = request.token
      document.getElementById('identifiant').innerHTML = request.identifiant + ' ' + request.token
    })

  setInterval(function () {
    navigator.geolocation.getCurrentPosition((position) => {
      var myPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      document.getElementById('position').innerHTML = myPosition.latitude + ', ' + myPosition.longitude
      const request = new Request(`https://30556981.ngrok.io/${identifiant}`, { method: 'POST', body: `{token: ${token}, localisation: : ${position}}` });
    });
  }, interval);
} else {
  document.getElementById('position').innerHTML = 'Gélolocalisation indisponible'
}