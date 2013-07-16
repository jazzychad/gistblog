$(document).ready(
  function() {

    var hash = window.location.hash.substring(1);
    var parts = hash.split("&");
    var access_token;
    for (var i in parts) {
      var part = parts[i];
      var ps = part.split("=");
      if (ps[0] == "access_token") {
        access_token = ps[1];
        break;
      }
    }
    $.post('/auth/token', {access_token: access_token}, function(data) {
             console.log('sent token');
             console.log(data);
             if (data === 'ok') {
               window.location = '/';
             }
           });

});