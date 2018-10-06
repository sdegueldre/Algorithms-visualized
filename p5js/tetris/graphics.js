// Globals: refreshed before every drawCall
let frameCount = 0;
let windowHeight;
let windowWidth;
let itemsToLoad = 0;

window.onload = function(){
  windowHeight = window.innerHeight;
  windowWidth = window.innerWidth;
  window.addEventListener('keydown', keyPressHandler);
  window.addEventListener('keyup', keyReleaseHandler);
  if(typeof preload == "function"){
    preload();
    if(itemsToLoad != 0)
      return;
  }
  startSketch();
}

function startSketch(){
  if(typeof setup == "function")
    setup();
  refresher();
}

function refresher(){
  windowHeight = window.innerHeight;
  windowWidth = window.innerWidth;
  draw();
  frameCount++;
  requestAnimationFrame(refresher);
}

function createCanvas(width, height){
  let canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.context = canvas.getContext('2d');
  canvas.style.position = "absolute";
  canvas.clear = function(){
    this.context.clearRect(0, 0, this.width, this.height);
  }
  document.body.appendChild(canvas);
  return canvas;
}

function loadImage(path){
  let img = new Image();
  img.src = path;
  itemsToLoad++;
  img.addEventListener('load', loadingHandler);
  return img;
}

function loadingHandler(){
 if(--itemsToLoad == 0)
  startSketch();
}

function keyPressHandler(event){
  if(typeof keyPressed == "function")
    keyPressed(event);
}

function keyReleaseHandler(event){
  if(typeof keyReleased == "function")
    keyReleased(event);
}