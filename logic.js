var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = canvas.height = 600;

var blocksPerRow = 4;
var blockSize = canvas.width / blocksPerRow;
var colors = ["#ff0000", "#0043ff", "#00aa00"];
var blocks = [];

function makeBlocks() {
  var x = 0;
  var y = 0;

  // make a bunch of blocks
  while (true) {
    // end of row, start new one
    if (x >= canvas.width) {
      x = 0;
      y += blockSize;
    }

    // end of canvas
    if (y >= canvas.height) {
      break;
    }

    blocks.push({
      toDelete: false,
      x: x,
      y: y,
      size: blockSize,
      color: colors[Math.floor(Math.random() * colors.length)],
      draw: function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
      }
    });
  
    x += blockSize;
  }
}

function findAdjacents(block) {
  if (!block.toDelete) {
    // mark as needing to delete
    block.toDelete = true;

    // start looking for touching blocks
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i].color === block.color) { 
        // same row
        if (blocks[i].y === block.y && (blocks[i].x === block.x + block.size || blocks[i].x + blocks[i].size === block.x)) {
          findAdjacents(blocks[i]);
        }
        // same column
        else if (blocks[i].x === block.x && (blocks[i].y === block.y + block.size || blocks[i].y + blocks[i].size === block.y)) {
          findAdjacents(blocks[i]);
        }
      }
    }
  }
}

function redraw() {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < blocks.length; i++) {
    blocks[i].draw();
  }
}

canvas.onclick = function(event) {
  for (let i = 0; i < blocks.length; i++) {
    // find the block that was clicked
    if (event.offsetX > blocks[i].x && event.offsetX < blocks[i].x + blocks[i].size && event.offsetY > blocks[i].y && event.offsetY < blocks[i].y + blocks[i].size) {
      // start finding touching blocks
      findAdjacents(blocks[i]);
      break;
    }
  }

  // once done, go back through and delete all "marked" blocks
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].toDelete) {
      blocks.splice(i, 1);

      // backtrack one step
      i--;
    }
  }
  
  // redraw the canvas with the blocks removed
  redraw();

  // if we've deleted everything, let's fill the canvas up again
  if (blocks.length === 0) {
    setTimeout(function() {
      makeBlocks();
      redraw();
    }, 1000);
  }
};

// start app
makeBlocks();
redraw();