
var interval = 5000
var identifiant;
var secret;
console.log('coucou')

if ("geolocation" in navigator) {

  const request = new Request('https://30556981.ngrok.io', { method: 'POST', body: `{}` });
  fetch(request)
    .then(response => {
      identifiant = request.identifiant
      secret = request.secret
      document.getElementById('identifiant').innerHTML = request.identifiant + ' ' + request.secret
    })

  setInterval(function () {
    navigator.geolocation.getCurrentPosition((position) => {
      var myPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      document.getElementById('position').innerHTML = myPosition.latitude + ', ' + myPosition.longitude
      const request = new Request(`https://30556981.ngrok.io/${identifiant}`, { method: 'POST', body: `{secret: ${secret}, localisation: : ${position}}` });
    });
  }, interval);
} else {
  document.getElementById('position').innerHTML = 'Gélolocalisation indisponible'
}