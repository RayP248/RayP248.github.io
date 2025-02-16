(function () {
  var canvas = document.getElementById("face");
  var ctx = canvas.getContext("2d");
  var faceX,
    faceY,
    faceRadius,
    eyeRadius,
    eyeOffsetX,
    eyeOffsetY,
    pupilRadius,
    pupilOffset;
  var faceState = "smile";
  var targetMouthY, currentMouthY, currentCurve, targetCurve;
  var showBubble = false;
  var mouseX, mouseY;

  function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    faceX = canvas.width / 2;
    faceY = canvas.height / 2;
    faceRadius = Math.min(canvas.width, canvas.height) / 6;
    eyeRadius = faceRadius / 5;
    eyeOffsetX = faceRadius / 2;
    eyeOffsetY = faceRadius / 3;
    pupilRadius = eyeRadius / 2;
    pupilOffset = eyeRadius / 2;
    targetMouthY = faceY + faceRadius / 2;
    currentMouthY = targetMouthY;
    currentCurve = faceRadius / 2;
    targetCurve = currentCurve;
    mouseX = faceX;
    mouseY = faceY;
  }

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
    ctx.moveTo(faceX - faceRadius / 2, currentMouthY);
    ctx.quadraticCurveTo(
      faceX,
      currentMouthY + currentCurve,
      faceX + faceRadius / 2,
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

  window.addEventListener("resize", initCanvas);
  window.addEventListener("mousemove", function (event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });
  window.addEventListener("click", function () {
    faceState = faceState === "surprised" ? "smile" : "surprised";
    if (faceState === "surprised") {
      targetMouthY = faceY + faceRadius / 1.5;
      targetCurve = faceRadius;
    } else {
      targetMouthY = faceY + faceRadius / 2;
      targetCurve = faceRadius / 2;
    }
  });
  window.addEventListener("load", function () {
    setTimeout(function () {
      var preloader = document.getElementById("preloader");
      if (preloader) preloader.style.display = "none";
    }, 500);
    initCanvas();
  });

  animate();
})();
