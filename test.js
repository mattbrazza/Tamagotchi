const _CNVS = document.getElementById('canvas');
//const _CTX = _CNVS.getContext('2d');
const _OPTIONS = document.getElementById('options-div');

const _IDLE_PNG = document.getElementById('idle-png');
const _EAT_PNG = document.getElementById('eat-png');
const _OTHER_PNG = document.getElementById('other-png');

let __DEBUGGING = false;

const pal = new Tamagotchi(_CNVS, 150, 20);
const app = new App(pal);

const _BTN_A = document.getElementById('button-a');
_BTN_A.addEventListener('click', () => {
  app.start();
  return;
});

const _BTN_B = document.getElementById('button-b');
_BTN_B.addEventListener('click', () => {
  showOptions();
  return;
});

const _BTN_C = document.getElementById('button-c');
//_BTN_C.addEventListener('click', () => { return; });

function showOptions() {
  if (!app.isRunning) {
    console.error('App is not running yet...');
    return null;
  }

  _OPTIONS.style.visibility = 'visible';
  _OPTIONS.children.item(0).innerText = 'Burger';
  _OPTIONS.children.item(0).onclick = () => { callFeed('burger'); return; };
  _OPTIONS.children.item(1).innerText = 'Candy';
  _OPTIONS.children.item(1).onclick = () => { callFeed('candy'); return; };
  return;
}

function callFeed(food) {
  _OPTIONS.style.visibility = 'hidden';
  app.userEvents.push(pal.feed.bind(pal, food));
  return;
}



const _BTN_S = document.getElementById('button-s');
_BTN_S.addEventListener('click', () => {
  const val = document.getElementById('input').value;
  app.userEvents.push(pal.feed.bind(pal, val));
  return;
});

