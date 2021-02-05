"use strict"

// _________________________MOUSE OVER_______________________________

let mainParent = false;
let main = false;
let lastMouseOver = false;
let sample = false;

function getMainParent (e) {
  let block = e.target;
  while (!block.classList.contains('main-parent') || !block.classList.contains('sample')) {
    if (block.classList.contains('body')||block.classList.contains('sample')||block.classList.contains('main-parent')) break;
    block = block.parentElement;
  };
  if (block.classList.contains('main-parent')) {
    mainParent = block;
  } else {
    mainParent = false;
  };
  if (block.classList.contains('sample')) {
    sample = block;
  } else {
    sample = false;
  };
};

function deleteRowPosition () {
  if (!mainParent && document.getElementById('paste-block') !== null) {
    paste.remove();
  };
};

function deleteActiveLight (e) {
  if (lastMouseOver) {
    lastMouseOver.style.background = '';
    lastMouseOver = false;
  };
};

function getActiveLight (e) {
  deleteActiveLight(e);
  if (e.target.classList.contains('block')||e.target.classList.contains('row-block')||e.target.classList.contains('main-block')) {
    e.target.style.background = 'white';
    lastMouseOver = e.target;
  };
};

let paste = document.createElement('div');
paste.id = 'paste-block';
paste.classList.add('paste-block');

function getPastePosition (e) {
  if (mainParent && !e.target.classList.contains('main-parent')) {
    if (e.target.classList.contains('row-block') || e.target.classList.contains('main-block')) {
      if (document.getElementById('paste-block') !== null) {
        document.getElementById('paste-block').remove();
      };
      if (e.offsetY < e.target.offsetHeight / 2) {
        e.target.before(paste);
      } else {
        e.target.after(paste);
      };
    };
    if (e.target.classList.contains('sub-block') && e.target.children.length == 0) {
      e.target.append(paste);
    };
  };
};

// ___________________EVENT_____________________
document.addEventListener('mouseover', e => {
  // console.log(e.target.children.length)
  getActiveLight(e);
  getMainParent(e);
  if (mouseDown) {
    deleteRowPosition();
    getPastePosition(e);
  };
});

// _________________________MOUSE OVER_______________________________
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
    deleteActiveLight(e);
    if (sample) {
      element = sample.cloneNode(true);
      element.classList.remove('sample');
      element.classList.add('draggable', 'main-parent');
      putDraggableClass();
      setParameters(e.clientX, e.clientY);
      mouseDown = true;
    };
    if (mainParent) {
      element = e.target;
      while (element.classList.contains('draggable') === false) {
        if (element.classList.contains('draggable')) break;
        element = element.parentElement;
      };
      setParameters(e.clientX, e.clientY);
      mouseDown = true;
    };
};

// ___________________EVENT_____________________
document.addEventListener('mousedown', e => {
  if (mouseDown === false) {
    takeElement(e);
  };
});

// _________________________MOUSE DOWN_______________________________
// ******************************************************************
// _________________________MOUSE MOVE_______________________________

// ___________________EVENT_____________________
window.addEventListener('mousemove', e => {
  if (mouseDown) {
    element.style.left = e.clientX + 10 + 'px';
    element.style.top = e.clientY + 10 + 'px';
    // getRowPosition(e);
  };
});

// _________________________MOUSE MOVE_______________________________
// ******************************************************************
// _________________________MOUSE UP_______________________________

function pasteElement (e) {
  if (document.getElementById('paste-block') !== null) {
    let cloneBlock = element.cloneNode(true);
    cloneBlock.style.position = 'static'
    cloneBlock.style.transition = '0.3s';
    cloneBlock.classList.remove('main-parent');
    cloneBlock.style.background = '';
    paste.replaceWith(cloneBlock);
  };
};

function putElement (e) {
  if (e.target.classList.contains('work-space')) {
    element.style.background = '';
    element.style.transition = '0.3s';
    if (element.classList.contains('main-parent') === false) {
      element.classList.add('main-parent');
    };
    workSpace.append(element);
  } else {
    element.remove();
  }
}



// ___________________EVENT_____________________
document.addEventListener('mouseup', e => {
  if (mouseDown) {
    pasteElement(e);
    putElement(e);
    element = false;
    mouseDown = false;
  };
});

// _________________________MOUSE UP_______________________________
// ******************************************************************
