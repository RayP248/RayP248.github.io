(function () {
  var canvas = document.getElementById("cube");
  var ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var angleX = 0;
  var angleY = 0;
  var size = 150;
  function drawCube() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var points = [
      { x: -1, y: -1, z: -1 },
      { x: 1, y: -1, z: -1 },
      { x: 1, y: 1, z: -1 },
      { x: -1, y: 1, z: -1 },
      { x: -1, y: -1, z: 1 },
      { x: 1, y: -1, z: 1 },
      { x: 1, y: 1, z: 1 },
      { x: -1, y: 1, z: 1 }
    ];
    var rotatedPoints = points.map(function (point) {
      var x = point.x * Math.cos(angleY) - point.z * Math.sin(angleY);
      var z = point.x * Math.sin(angleY) + point.z * Math.cos(angleY);
      var y = point.y * Math.cos(angleX) - z * Math.sin(angleX);
      z = point.y * Math.sin(angleX) + z * Math.cos(angleX);
      return { x: x, y: y, z: z };
    });
    ctx.strokeStyle = "#FFF";
    ctx.beginPath();
    for (var i = 0; i < 4; i++) {
      var start = rotatedPoints[i];
      var end = rotatedPoints[(i + 1) % 4];
      ctx.moveTo((start.x * size) + canvas.width / 2, (start.y * size) + canvas.height / 2);
      ctx.lineTo((end.x * size) + canvas.width / 2, (end.y * size) + canvas.height / 2);
    }
    for (var i = 4; i < 8; i++) {
      var start = rotatedPoints[i];
      var end = rotatedPoints[(i + 1) % 4 + 4];
      ctx.moveTo((start.x * size) + canvas.width / 2, (start.y * size) + canvas.height / 2);
      ctx.lineTo((end.x * size) + canvas.width / 2, (end.y * size) + canvas.height / 2);
    }
    for (var i = 0; i < 4; i++) {
      var start = rotatedPoints[i];
      var end = rotatedPoints[i + 4];
      ctx.moveTo((start.x * size) + canvas.width / 2, (start.y * size) + canvas.height / 2);
      ctx.lineTo((end.x * size) + canvas.width / 2, (end.y * size) + canvas.height / 2);
    }
    ctx.stroke();
    angleX += 0.01;
    angleY += 0.01;
  }
  setInterval(drawCube, 50);
  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  window.addEventListener("load", function () {
    setTimeout(function () {
      document.getElementById("preloader").style.display = "none";
    }, 500);
  });
})();
