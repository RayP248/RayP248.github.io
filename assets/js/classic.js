(function () {
  var canvas = document.getElementById("classic");
  var ctx = canvas.getContext("2d");

  function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function drawClassic() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function render() {
    drawClassic();
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
  window.addEventListener("resize", initCanvas);
  window.addEventListener("load", function () {
    setTimeout(function () {
      document.getElementById("preloader").style.display = "none";
    }, 500);
    initCanvas();
  });
})();
