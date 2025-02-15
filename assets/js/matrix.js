(function() {
  /* Initialize canvas */
  var canvas = document.getElementById("matrix");
  var ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Clear canvas with black to avoid white artifacts
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  /* Create characters set */
  var chars = "01".split("");

  var fontSize = 20; // Increase font size to reduce number of drops
  var columns = canvas.width / fontSize;
  var drops = [];
  for (var x = 0; x < columns; x++) {
    drops[x] = 1;
  }

  /* Draw function */
  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px monospace";

    for (var i = 0; i < drops.length; i++) {
      var text = chars[Math.floor(Math.random() * chars.length)];
      var x = i * fontSize;
      var y = drops[i] * fontSize;

      // Draw the character
      ctx.fillText(text, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 100); // Increase interval to reduce CPU usage

  /* Responsive canvas */
  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = canvas.width / fontSize;
    drops = [];
    for (var x = 0; x < columns; x++) {
      drops[x] = 1;
    }
  });

  // Hide preloader once canvas is ready
  window.addEventListener("load", function () {
    setTimeout(function () {
      document.getElementById("preloader").style.display = "none";
    }, 500); // Delay to ensure canvas is fully ready
  });
})();
