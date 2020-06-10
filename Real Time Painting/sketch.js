var database;
var Paint = [];
var Path = [];
var Drawing = false;
var point;

function setup() {
  canvas = createCanvas(800,620);
  canvas.mousePressed(StartPoint);
  canvas.mouseReleased(EndPoint);
  var saveButton = createButton('save');
  saveButton.mousePressed(SaveDrawingpage);

  var clearButton = createButton('clear');
  clearButton.mousePressed(ClearDrawingpage);
  clearButton.position(5,50);
  database = firebase.database;

  var redbutton = createButton('red');
  redbutton.mousePressed(red);
  redbutton.position(5,75);
  }

function StartPoint(){
  Drawing = true;
  Path = [];
  Paint.push(Path);
}

function EndPoint(){
Drawing = false;
}
function draw() {
  background(0); 
  var b  = rect(0,0,800,50);
  b.fill("red");
  if(Drawing){
    point = {
      x:mouseX,
      y:mouseY
    };
    Path.push(point);
  }
  stroke("white");
  strokeWeight(4);
  noFill();
  for (var a = 0;a<Paint.length;a++)
  {
    var path2 = Paint[a];
    beginShape();
    for (var b = 0;b<path2.length;b++)
    {
      vertex(path2[b].x,path2[b].y);
    }
    endShape();
  } 

  
}

function SaveDrawingpage(){
  var ref = database.ref('drawings');
  var data = {
    drawing:Paint
  };
  ref.push(data);
}

function ClearDrawingpage(){
Paint=[];
}

function red(){
  strokeWeight(50);
  stroke("red");
}










