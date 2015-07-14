var remote = require('remote');
var browserWindow = remote.getCurrentWindow();
var fs = require('fs');

var video = document.getElementById("photobooth");
var tools = document.getElementById("tools");

navigator.webkitGetUserMedia({ 
  video:true, 
  audio:true
}, function(stream) {
  video.src = window.webkitURL.createObjectURL(stream);
}, function(err){
  console.log(err);
});

video.onclick = function() {
  var filename = (new Date()).getTime();
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0);

  var uri = canvas.toDataURL('image/jpeg');
  var data = uri.split(',')[1];
  var buffer = new Buffer(data, 'base64');
  var destination = '/Users/luke/Desktop/' + filename + '.jpg';

  fs.writeFile(destination, buffer, 'binary', function(err) {
    if (err) return console.log(err);

    console.log('Photo saved as ', destination);
  });
};

tools.onclick = function() {
  browserWindow.openDevTools();
}
