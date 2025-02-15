(function () {
  var canvas = document.getElementById("face");
  var ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

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

  // In drawFace(), handle the "closed" state explicitly.
  function drawFace(mouseX, mouseY) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw face circle
    ctx.fillStyle = "#FFD700";
    ctx.beginPath();
    ctx.arc(faceX, faceY, faceRadius, 0, Math.PI * 2);
    ctx.fill();

    // Calculate eye positions
    var angleLeftEye = Math.atan2(mouseY - (faceY - eyeOffsetY), mouseX - (faceX - eyeOffsetX));
    var angleRightEye = Math.atan2(mouseY - (faceY - eyeOffsetY), mouseX - (faceX + eyeOffsetX));
    var leftPupilX = (faceX - eyeOffsetX) + Math.cos(angleLeftEye) * pupilOffset;
    var leftPupilY = (faceY - eyeOffsetY) + Math.sin(angleLeftEye) * pupilOffset;
    var rightPupilX = (faceX + eyeOffsetX) + Math.cos(angleRightEye) * pupilOffset;
    var rightPupilY = (faceY - eyeOffsetY) + Math.sin(angleRightEye) * pupilOffset;

    // Draw eyes
    ctx.fillStyle = "#FFF";
    ctx.beginPath();
    ctx.arc(faceX - eyeOffsetX, faceY - eyeOffsetY, eyeRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(faceX + eyeOffsetX, faceY - eyeOffsetY, eyeRadius, 0, Math.PI * 2);
    ctx.fill();

    // Draw pupils
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(leftPupilX, leftPupilY, pupilRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(rightPupilX, rightPupilY, pupilRadius, 0, Math.PI * 2);
    ctx.fill();

    // Draw eye highlights
    ctx.fillStyle = "#FFF";
    ctx.beginPath();
    ctx.arc(leftPupilX - 3, leftPupilY - 3, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(rightPupilX - 3, rightPupilY - 3, 3, 0, Math.PI * 2);
    ctx.fill();

    // Animate mouth vertical position and curve shape
    currentMouthY += (targetMouthY - currentMouthY) * 0.1;
    currentCurve += (targetCurve - currentCurve) * 0.1;

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 5;
    ctx.beginPath();
    if (faceState === "smile" || faceState === "confused") {
      ctx.moveTo(faceX - 50, currentMouthY);
      ctx.quadraticCurveTo(faceX, currentMouthY + currentCurve, faceX + 50, currentMouthY);
    } else if (faceState === "surprised") {
      ctx.arc(faceX, currentMouthY, 20, 0, Math.PI * 2, true);
    } else if (faceState === "closed") {
      // Draw a straight line for closed mouth.
      ctx.moveTo(faceX - 30, currentMouthY);
      ctx.lineTo(faceX + 30, currentMouthY);
    }
    ctx.stroke();

    // If in confused state and bubble is active, draw question mark bubble
    if (faceState === "confused" && showBubble) {
      ctx.fillStyle = "#FFF";
      ctx.strokeStyle = "#FFF";
      ctx.lineWidth = 2;
      // Draw bubble circle near the top-right of the head.
      var bubbleX = faceX + faceRadius * 0.8;
      var bubbleY = faceY - faceRadius * 0.8;
      ctx.beginPath();
      ctx.arc(bubbleX, bubbleY, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Draw the question mark text in the bubble.
      ctx.fillStyle = "#000";
      ctx.font = "20px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("?", bubbleX, bubbleY);
    }
  }

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    faceX = canvas.width / 2;
    faceY = canvas.height / 2;
  });

  // Updated mousemove handler using smooth transition if not already transitioning
  window.addEventListener("mousemove", function (event) {
    var dx = event.clientX - faceX;
    var dy = event.clientY - faceY;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < faceRadius) {
      faceState = "confused";
      targetMouthY = faceY + 20;
      targetCurve = 0;
      showBubble = true;
    } else {
      faceState = "smile";
      targetMouthY = faceY + 20;
      targetCurve = 40;
      showBubble = false;
    }
    drawFace(event.clientX, event.clientY);
  });

  // Updated click handler to trigger smooth transition for surprised state
  window.addEventListener("click", function () {
    faceState = "surprised";
    targetMouthY = faceY + 20;
    drawFace(faceX, faceY);
  });

  window.addEventListener("load", function () {
    setTimeout(function () {
      document.getElementById("preloader").style.display = "none";
    }, 500);
    drawFace(faceX, faceY);
  });

  // Animate the face continuously
  function animate() {
    drawFace(faceX, faceY);
    requestAnimationFrame(animate);
  }
  animate();
})();
