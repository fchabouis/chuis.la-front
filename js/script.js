function sharePosition() {
  var interval = 5000
  var identifiant;
  var token;
  console.log('coucou')

  if ("geolocation" in navigator) {
    const request = new Request('https://30556981.ngrok.io', { method: 'POST', body: `{}` });
    fetch(request)
      .then(response => {
        console.log('identifiants recus !')
        response.json().then(data => {
          identifiant = data.id
          token = data.token
          document.getElementById('identifiant').innerHTML = `Réponse du serveur<br>identifiant: ${identifiant}<br>token: ${token}`
        });
      })

    setInterval(function () {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
        var myPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        };
        document.getElementById('position').innerHTML = myPosition.latitude + ', ' + myPosition.longitude
        document.getElementById('dateDernierePosition').innerHTML = new Date();
        let body = {'token': token, 'localisation': myPosition}
        const request = new Request(`https://30556981.ngrok.io/${identifiant}`, { method: 'POST', body: JSON.stringify(body)});
        fetch(request).then(response => console.log(response))
      });
    }, interval);
  } else {
    document.getElementById('position').innerHTML = 'Gélolocalisation indisponible'
  }
}