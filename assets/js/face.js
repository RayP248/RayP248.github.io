(function () {
  // Canvas initialization and global variables
  var canvas = document.getElementById("face");
  var ctx = canvas.getContext("2d");
  initCanvas();

  var faceX = canvas.width / 2;
  var faceY = canvas.height / 2;
  var faceRadius = 100;
  var eyeRadius = 20;
  var eyeOffsetX = 40;
  var eyeOffsetY = 30;
  var pupilRadius = 10;
  var pupilOffset = 10;

  var faceState = "smile"; // initial state
  var targetMouthY = faceY + 20;
  var currentMouthY = faceY + 20;
  var currentCurve = 40;
  var targetCurve = 40;
  // Bubble flag for confused face
  var showBubble = false;
  // Global mouse coordinates, starting at face center.
  var mouseX = faceX,
    mouseY = faceY;

  // In drawFace(), handle the "closed" state explicitly.
  function drawFace(x, y) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawFaceCircle();
    var angles = calculateEyeAngles(x, y);
    drawEyes();
    drawPupils(angles.left, angles.right);
    drawMouth();
    if (showBubble) drawBubble();
  }

  function drawFaceCircle() {
    ctx.fillStyle = "#FFD700";
    ctx.beginPath();
    ctx.arc(faceX, faceY, faceRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  function calculateEyeAngles(x, y) {
    var angleLeft = Math.atan2(
      y - (faceY - eyeOffsetY),
      x - (faceX - eyeOffsetX)
    );
    var angleRight = Math.atan2(
      y - (faceY - eyeOffsetY),
      x - (faceX + eyeOffsetX)
    );
    return { left: angleLeft, right: angleRight };
  }

  function drawEyes() {
    ctx.fillStyle = "#FFF";
    ctx.beginPath();
    ctx.arc(faceX - eyeOffsetX, faceY - eyeOffsetY, eyeRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(faceX + eyeOffsetX, faceY - eyeOffsetY, eyeRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawPupils(angleLeftEye, angleRightEye) {
    var leftPupilX = faceX - eyeOffsetX + Math.cos(angleLeftEye) * pupilOffset;
    var leftPupilY = faceY - eyeOffsetY + Math.sin(angleLeftEye) * pupilOffset;
    var rightPupilX =
      faceX + eyeOffsetX + Math.cos(angleRightEye) * pupilOffset;
    var rightPupilY =
      faceY - eyeOffsetY + Math.sin(angleRightEye) * pupilOffset;

    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(leftPupilX, leftPupilY, pupilRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(rightPupilX, rightPupilY, pupilRadius, 0, Math.PI * 2);
    ctx.fill();

    // Eye highlights
    ctx.fillStyle = "#FFF";
    ctx.beginPath();
    ctx.arc(leftPupilX - 3, leftPupilY - 3, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(rightPupilX - 3, rightPupilY - 3, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawMouth() {
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(faceX - 50, currentMouthY);
    ctx.quadraticCurveTo(
      faceX,
      currentMouthY + currentCurve,
      faceX + 50,
      currentMouthY
    );
    ctx.stroke();
  }

  function drawBubble() {
    ctx.fillStyle = "#FFF";
    ctx.beginPath();
    ctx.arc(faceX, faceY - faceRadius - 50, 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.font = "16px Arial";
    ctx.fillText("?", faceX - 5, faceY - faceRadius - 45);
  }

  function updateMouth() {
    var speed = 0.1;
    currentMouthY += (targetMouthY - currentMouthY) * speed;
    currentCurve += (targetCurve - currentCurve) * speed;
  }

  function animate() {
    updateMouth();
    drawFace(mouseX, mouseY);
    requestAnimationFrame(animate);
  }

  function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", function () {
    initCanvas();
    faceX = canvas.width / 2;
    faceY = canvas.height / 2;
  });

  // Updated mousemove handler using smooth transition if not already transitioning
  window.addEventListener("mousemove", function (event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  // Updated click handler to trigger smooth transition for surprised state
  window.addEventListener("click", function () {
    faceState = faceState === "surprised" ? "smile" : "surprised";
    if (faceState === "surprised") {
      targetMouthY = faceY + 40;
      targetCurve = 80;
    } else {
      targetMouthY = faceY + 20;
      targetCurve = 40;
    }
  });

  window.addEventListener("load", function () {
    setTimeout(function () {
      var preloader = document.getElementById("preloader");
      if (preloader) preloader.style.display = "none";
    }, 500);
  });

  animate();
})();
