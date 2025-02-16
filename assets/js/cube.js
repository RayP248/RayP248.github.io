(function () {
  "use strict";

  // Canvas and context initialization
  const canvas = document.getElementById("cube");
  const ctx = canvas.getContext("2d");
  let angleX = 0;
  let angleY = 0;
  let size, fov;

  // Define cube vertices
  const points = [
    { x: -1, y: -1, z: -1 },
    { x: 1, y: -1, z: -1 },
    { x: 1, y: 1, z: -1 },
    { x: -1, y: 1, z: -1 },
    { x: -1, y: -1, z: 1 },
    { x: 1, y: -1, z: 1 },
    { x: 1, y: 1, z: 1 },
    { x: -1, y: 1, z: 1 },
  ];

  // Define cube edges by connecting vertex indices
  const edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0], // front face
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4], // back face
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7], // sides
  ];

  // Initialize canvas dimensions
  const initCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    size = Math.min(canvas.width, canvas.height) / 4;
    fov = size * 2;
  };

  // Rotate and project a 3D point into 2D space with perspective
  const rotateAndProject = (point) => {
    // Rotate around Y-axis
    let x = point.x * Math.cos(angleY) - point.z * Math.sin(angleY);
    let z = point.x * Math.sin(angleY) + point.z * Math.cos(angleY);
    // Rotate around X-axis
    let y = point.y * Math.cos(angleX) - z * Math.sin(angleX);
    z = point.y * Math.sin(angleX) + z * Math.cos(angleX);

    // Apply perspective projection
    const scale = fov / (fov + (z * size) / 150);
    return {
      x: x * size * scale + canvas.width / 2,
      y: y * size * scale + canvas.height / 2,
    };
  };

  // Draw the cube with updated rotation
  const drawCube = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const projected = points.map(rotateAndProject);

    // Update stroke style to gray
    ctx.strokeStyle = "#808080";
    ctx.lineWidth = 2;
    ctx.beginPath();

    // Draw every edge of the cube
    edges.forEach((edge) => {
      const [startIdx, endIdx] = edge;
      const start = projected[startIdx];
      const end = projected[endIdx];
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
    });
    ctx.stroke();

    updateAngles();
  };

  function updateAngles() {
    angleX += 0.01;
    angleY += 0.01;
  }

  // Render loop using requestAnimationFrame for smooth animations
  const animate = () => {
    drawCube();
    requestAnimationFrame(animate);
  };

  // Event listeners
  window.addEventListener("resize", initCanvas);
  window.addEventListener("load", () => {
    setTimeout(() => {
      const preloader = document.getElementById("preloader");
      if (preloader) preloader.style.display = "none";
    }, 500);
    initCanvas();
  });

  // Initialize and start animation
  initCanvas();
  animate();
})();
