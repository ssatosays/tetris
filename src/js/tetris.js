import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../css/tetris.css';


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
const C_TETROMINO_SIZE = 4;
// onkeydown codes
const C_KEYDOWN_ARROWLEFT = "ArrowLeft";
const C_KEYDOWN_ARROWUP = "ArrowUp";
const C_KEYDOWN_ARROWRIGHT = "ArrowRight";
const C_KEYDOWN_ARROWDOWN = "ArrowDown";
const C_KEYDOWN_SPACE = "Space";
// drop speed
const C_DROP_SPEED = 600;

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


const fix_tetromino = () => {
  for (let y = 0; y < C_TETROMINO_SIZE; y++) {
    for (let x = 0; x < C_TETROMINO_SIZE; x++) {
      if (tetromino[y][x]) field[y + tetromino_y][x + tetromino_x] = 1;
    }
  }
}

const drop_tetromino = () => {
  if (can_next_move(0, 1)) {
    tetromino_y++;
    drow_field();
    drow_tetromino();
  } else {
    fix_tetromino();
    tetromino_y = 0;
    tetromino_x = 0;
  }
}

const rotate = () => {
  let new_tetromino = [];
  for (let y = 0; y < C_TETROMINO_SIZE; y++) {
    new_tetromino[y] = [];
    for (let x = 0; x < C_TETROMINO_SIZE; x++) {
      new_tetromino[y][x] = tetromino[C_TETROMINO_SIZE - x - 1][y];
    }
  }
  return new_tetromino;
}

const can_next_move = (move_x, move_y, check_tetromino) => {
  if (check_tetromino == undefined) check_tetromino = tetromino;
  for (let y = 0; y < C_TETROMINO_SIZE; y++) {
    for (let x = 0; x < C_TETROMINO_SIZE; x++) {
      let next_y = y + move_y + tetromino_y;
      let next_x = x + move_x + tetromino_x;
      if (check_tetromino[y][x]) {
        if (next_y < 0 || next_x < 0 || next_y >= C_FIELD_ROW || next_x >= C_FIELD_COL
          || field[next_y][next_x]) {
          return false;
        }
      }
    }
  }
  return true;
}

const drow_block = (x, y) => {
  const print_x = x * C_BLOCK_SIZE;
  const print_y = y * C_BLOCK_SIZE;
  con.fillStyle = "blue";
  con.fillRect(print_x, print_y, C_BLOCK_SIZE, C_BLOCK_SIZE);
  con.strokeStyle = "black";
  con.strokeRect(print_x, print_y, C_BLOCK_SIZE, C_BLOCK_SIZE);
}

const drow_tetromino = () => {
  for (let y = 0; y < C_TETROMINO_SIZE; y++) {
    for (let x = 0; x < C_TETROMINO_SIZE; x++) {
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
      if (can_next_move(-1, 0)) tetromino_x--;
      break;
    case C_KEYDOWN_ARROWUP:
      // if (can_next_move(0, -1)) tetromino_y--;
      break;
    case C_KEYDOWN_ARROWRIGHT:
      if (can_next_move(1, 0)) tetromino_x++;
      break;
    case C_KEYDOWN_ARROWDOWN:
      if (can_next_move(0, 1)) tetromino_y++;
      break;
    case C_KEYDOWN_SPACE:
      let new_tetromino = rotate();
      if (can_next_move(0, 0, new_tetromino)) tetromino = new_tetromino;
      break;
  }
  drow_field();
  drow_tetromino();
}

window.onload = () => {
  init();
  setInterval(drop_tetromino, C_DROP_SPEED);

}
