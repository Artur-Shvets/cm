"use strict"

// ________________________________________________________
// ******************************************************************
// _________________________MOUSE DOWN_______________________________
let mouseDown = false;
let element;
let workSpace = document.getElementById('work-space');

function putDraggableClass () {
  element.querySelectorAll('.block, .row-block').forEach((block) => {
    block.classList.add('draggable');
  });
};

function setParameters (x, y) {
  element.style.position = 'absolute';
  element.style.transition = 'none';
  element.style.zIndex = 2;
  element.style.left = x + 10 + 'px';
  element.style.top = y + 10 + 'px';
  document.body.append(element);
};

function takeElement (e) {
  if (e.target.classList.contains('draggable')) {
    element = e.target
    setParameters(e.clientX, e.clientY);
    mouseDown = true;
  };
};

function takeSample (e) {
  if (e.target.classList.contains('sample')) {
    element = e.target.cloneNode(true);
    element.classList.remove('sample');
    element.classList.add('draggable', 'main-parent');
    putDraggableClass();
    setParameters(e.clientX, e.clientY);setParameters();
    mouseDown = true;
  };
};

// ___________________EVENT_____________________
document.addEventListener('mousedown', e => {
  if (mouseDown === false) {
    takeElement(e);
    takeSample(e);
  };
});

// _________________________MOUSE DOWN_______________________________
// ******************************************************************
// _________________________MOUSE MOVE_______________________________

let paste = document.createElement('div');
paste.id = 'paste-block';
paste.classList.add('paste-block');

function getRowPosition (e) {
  if (mainParent !== false & element.classList.contains('row-block') & e.target.classList.contains('row-block')) {
    if (document.getElementById('paste-block') !== null) {
      document.getElementById('paste-block').remove();
    };
    if (e.offsetY < e.target.offsetHeight / 2) {
      e.target.before(paste);
    } else {
      e.target.after(paste);
    };
  };
};

// ___________________EVENT_____________________
window.addEventListener('mousemove', e => {
  if (mouseDown) {
    element.style.left = e.clientX + 10 + 'px';
    element.style.top = e.clientY + 10 + 'px';
    getRowPosition(e);
  };
});

// _________________________MOUSE MOVE_______________________________
// ******************************************************************
// _________________________MOUSE UP_______________________________

function putElement (e) {
  if (document.getElementById('paste-block') !== null) {
    let cloneBlock = element.cloneNode(true);
    cloneBlock.style.position = 'static'
    cloneBlock.style.transition = '0.3s';
    cloneBlock.classList.remove('mainParent');
    cloneBlock.style.background = '';
    paste.replaceWith(cloneBlock);
  };
};

function putSample (e) {
  if (e.target.classList.contains('work-space')) {
    element.style.background = '';
    element.style.transition = '0.3s';
    workSpace.append(element);
  } else {
    element.remove();
  }
}



// ___________________EVENT_____________________
document.addEventListener('mouseup', e => {
  if (mouseDown) {
    putElement(e);
    putSample(e);
    element = false;
    mouseDown = false;
  };
});

// _________________________MOUSE UP_______________________________
// ******************************************************************
// _________________________MOUSE OVER_______________________________

let mainParent = false;
let lastMouseOver = false;

function getMainParent (someBlock) {
  let block = someBlock;
  while (block.classList.contains('main-parent') === false) {
    if (block.classList.contains('block-menu') === null ||block.classList.contains('work-space')||block.classList.contains('block-menu')||block.classList.contains('sample')) break;
    block = block.parentElement;
  };
  if (block.classList.contains('main-parent')) {
    mainParent = block;
  } else {
    mainParent = false;
  };
};

function deleteRowPosition () {
  if (mainParent === false & document.getElementById('paste-block') !== null) {
    paste.remove();
  };
};

function getActiveLight (e) {
  if (lastMouseOver) {
    lastMouseOver.style.background = '';
    lastMouseOver = false;
  };
  let listOfclass = e.target.classList;
  if (listOfclass.contains('block')||listOfclass.contains('row-block')||listOfclass.contains('main-block')) {
    e.target.style.background = 'white';
    lastMouseOver = e.target;
  };
};

// ___________________EVENT_____________________
document.addEventListener('mouseover', e => {
  getActiveLight(e);
  if (mouseDown) {
    getMainParent(e.target);
    deleteRowPosition();
  };
});
