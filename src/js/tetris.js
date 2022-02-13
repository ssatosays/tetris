import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


// block size
const C_BLOCK_SIZE = 30;
// canvas size
const C_FIELD_COL = 10;
const C_FIELD_ROW = 20;
const C_CANV_WIDTH = C_BLOCK_SIZE * C_FIELD_COL;
const C_CANV_HEIGHT = C_BLOCK_SIZE * C_FIELD_ROW;
// canvas style
const C_CANV_STYLE_BORDER = "2px solid #000000";
// tetro size
const C_TETRO_SIZE = 4;
// onkeydown codes
const C_KEYDOWN_ARROWLEFT = "ArrowLeft";
const C_KEYDOWN_ARROWUP = "ArrowUp";
const C_KEYDOWN_ARROWRIGHT = "ArrowRight";
const C_KEYDOWN_ARROWDOWN = "ArrowDown";
const C_KEYDOWN_SPACE = "Space";


// canvas
let canv;
// 2d
let con;
// tetromino
let tetromino = [];
let tetromino_y = 0;
let tetromino_x = 0;
// field
let field = [];


const drow_block = (x, y) => {
  const print_x = x * C_BLOCK_SIZE;
  const print_y = y * C_BLOCK_SIZE;
  con.fillStyle = "blue";
  con.fillRect(print_x, print_y, C_BLOCK_SIZE, C_BLOCK_SIZE);
  con.strokeStyle = "black";
  con.strokeRect(print_x, print_y, C_BLOCK_SIZE, C_BLOCK_SIZE);
}

const drow_tetromino = () => {
  for (let y = 0; y < C_TETRO_SIZE; y++) {
    for (let x = 0; x < C_TETRO_SIZE; x++) {
      if (tetromino[y][x]) drow_block(x + tetromino_x, y + tetromino_y);
    }
  }
}

const drow_field = () => {
  con.clearRect(0, 0, C_CANV_WIDTH, C_CANV_HEIGHT);
  for (let y = 0; y < C_FIELD_ROW; y++) {
    for (let x = 0; x < C_FIELD_COL; x++) {
      if (field[y][x]) drow_block(x, y);
    }
  }
}

const get_initial_field = (row, col) => {
  let field = [];
  for (let y = 0; y < row; y++) {
    field[y] = [];
    for (let x = 0; x < col; x++) {
      field[y][x] = 0;
    }
  }
  return field;
}

const get_tetromino = () => {
  return [
    [ 0, 0, 0, 0 ],
    [ 1, 1, 0, 0 ],
    [ 0, 1, 1, 0 ],
    [ 0, 0, 0, 0 ]
  ];
}

const init = () => {
  canv = document.getElementById("canv");
  canv.width = C_CANV_WIDTH;
  canv.height = C_CANV_HEIGHT;
  canv.style.border = C_CANV_STYLE_BORDER;
  con = canv.getContext("2d");
  tetromino = get_tetromino();
  field = get_initial_field(C_FIELD_ROW, C_FIELD_COL);
  field[5][8] = 1;
  field[6][8] = 1;
  field[7][8] = 1;
  drow_field();
  drow_tetromino();
}

document.onkeydown = (e) => {
  const codes = [
    C_KEYDOWN_ARROWLEFT, C_KEYDOWN_ARROWUP, C_KEYDOWN_ARROWRIGHT,
    C_KEYDOWN_ARROWDOWN, C_KEYDOWN_SPACE
  ];
  if (!codes.includes(e.code)) return;
  switch (e.code) {
    case C_KEYDOWN_ARROWLEFT:
      tetromino_x--;
      break;
    case C_KEYDOWN_ARROWUP:
      tetromino_y--;
      break;
    case C_KEYDOWN_ARROWRIGHT:
      tetromino_x++;
      break;
    case C_KEYDOWN_ARROWDOWN:
      tetromino_y++;
      break;
    case C_KEYDOWN_SPACE:
      break;
  }
  drow_field();
  drow_tetromino();
}

window.onload = () => {
  init();
}
