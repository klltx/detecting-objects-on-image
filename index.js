let objectDetector;
let status;
let objects = [];
let canvas, ctx;
const width = 640;
const height = 420;
const newImage = document.getElementById("newImage");

let img = new Image(width, height);
img.src = "./3.jpg";

async function make() {
  console.log("loading model...");
  objectDetector = await ml5.objectDetector("cocossd", startDetecting);

  canvas = createCanvas(width, height);
  ctx = canvas.getContext("2d");
}

window.addEventListener("DOMContentLoaded", function () {
  make();
});

function startDetecting() {
  console.log("model ready");
  detect();
}

function detect() {
  objectDetector.detect(img, function (err, results) {
    if (err) {
      console.log(err);
      return;
    }
    objects = results;

    if (objects) {
      draw();
    }
  });
}

function draw() {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, width, height);

  ctx.drawImage(img, 0, 0, width, height);
  for (let i = 0; i < objects.length; i += 1) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "green";
    ctx.fillText(objects[i].label, objects[i].x + 4, objects[i].y + 16);

    ctx.beginPath();
    ctx.rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    ctx.strokeStyle = "green";
    ctx.stroke();
    ctx.closePath();
  }
  console.log("draw");
  console.log(objects);
}

function createCanvas(w, h) {
  const canvas = document.getElementById("canvas");
  canvas.width = w;
  canvas.height = h;
  return canvas;
}

function previewFile() {
  const file = document.querySelector("input[type=file]").files[0];
  const reader = new FileReader();

  reader.onloadend = function () {
    img.src = reader.result;
    startDetecting();
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    img.src = "";
  }
}

newImage.addEventListener("change", previewFile);
