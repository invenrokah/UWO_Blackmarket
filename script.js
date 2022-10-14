const rootadjust = 0

const row2 = document.querySelectorAll('.row2');
row2.forEach((element) => {element.style.display = 'none'});

const toggleRadio = document.querySelector('#toggleRadio');
function toggleEvent() {
  row2.forEach((element) => {
    if(element.style.display == 'none'){
      element.style.display = 'block';
    } else {
      element.style.display = 'none'
    }
  }
  
)};
toggleRadio.addEventListener('click',toggleEvent);

function save() {
  const checkbox = document.getElementsByName('buttons');
  for (let i=0; i < checkbox.length; i++) {
    localStorage.setItem(checkbox[i].id,checkbox[i].checked)
  };
  localStorage.setItem('addHour',document.querySelector("#addHour").innerText);
  localStorage.setItem('addMin',document.querySelector("#addMin").innerText);
  const town = document.querySelectorAll('.town');
  for (var element of town) {
    let radios = element.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => {
      if(radio.checked) {
        localStorage.setItem(`shoptime-${element.id}`,radio.value);
        element.dataset.shoptime = radio.value
      }
    });
    switch (element.dataset.shoptime) {
      case '0':
        element.querySelector('.status').style.visibility = 'hidden';
        element.dataset.open = '99';
        element.dataset.close = '99';
        break;
      case '1':
        element.querySelector('.status').style.visibility = "visible";
        element.dataset.open = '26';
        element.dataset.close = '29';
        break;
      case '2':
        element.querySelector('.status').style.visibility = "visible";
        element.dataset.open = '24';
        element.dataset.close = '30';
        break;
      case '3':
        element.querySelector('.status').style.visibility = "visible";
        element.dataset.open = '22';
        element.dataset.close = '30';
        break;
      case '4':
        element.querySelector('.status').style.visibility = "visible";
        element.dataset.open = '21';
        element.dataset.close = '30';
        break;
      case '5':
        element.querySelector('.status').style.visibility = "visible";
        element.dataset.open = '20';
        element.dataset.close = '30';
        break;
      default:
        break;
    };
  };
  getClock();
};

function reset() {
  const checkbox = document.getElementsByName('buttons');
  for (let i=0; i < checkbox.length; i++) {
    checkbox[i].checked = false;
  };
  window.localStorage.clear();
  save();
};

function reset2() {
  const checkbox = document.getElementsByName('buttons');
  for (let i=0; i < checkbox.length; i++) {
    checkbox[i].checked = false;
  };
  window.localStorage.clear();
  location.reload();
};

function load() {
  if (localStorage.getItem('addHour') !== null) {document.querySelector("#addHour").innerText = localStorage.getItem('addHour');};
  if (localStorage.getItem('addMin') !== null) {document.querySelector("#addMin").innerText = localStorage.getItem('addMin');};
  const checkbox = document.getElementsByName('buttons');
  for (let i=0; i < checkbox.length; i++) {
    var status = JSON.parse(localStorage.getItem(checkbox[i].id));
    if (status == true) {checkbox[i].checked = status;};
  };
  const town = document.querySelectorAll('.town');
  for(var element of town) {
    let shoptime = localStorage.getItem(`shoptime-${element.id}`);
    if (shoptime !== null) {element.dataset.shoptime = shoptime};
    element.querySelector(`input[value="${element.dataset.shoptime}"]`).checked = true;
    switch (element.dataset.shoptime) {
      case '0':
        element.querySelector('.status').style.visibility = 'hidden';
        element.dataset.open = '99';
        element.dataset.close = '99';
        break;
      case '1':
        element.querySelector('.status').style.visibility = "visible";
        element.dataset.open = '26';
        element.dataset.close = '29';
        break;
      case '2':
        element.querySelector('.status').style.visibility = "visible";
        element.dataset.open = '24';
        element.dataset.close = '30';
        break;
      case '3':
        element.querySelector('.status').style.visibility = "visible";
        element.dataset.open = '22';
        element.dataset.close = '30';
        break;
      case '4':
        element.querySelector('.status').style.visibility = "visible";
        element.dataset.open = '21';
        element.dataset.close = '30';
        break;
      case '5':
        element.querySelector('.status').style.visibility = "visible";
        element.dataset.open = '20';
        element.dataset.close = '30';
        break;
      default:
        break;
    };
  };
  
  
};

load();

const addHour = document.querySelector("#addHour");
const increaseHour = document.querySelector("#increaseHour");
const decreaseHour = document.querySelector("#decreaseHour");
const addMin = document.querySelector("#addMin");
const increaseMin = document.querySelector("#increaseMin");
const decreaseMin = document.querySelector("#decreaseMin");
increaseHour.onclick = () => {
  const current = parseInt(addHour.innerText, 10);
  addHour.innerText = current + 1;
  save();
};
decreaseHour.onclick = () => {
  const current = parseInt(addHour.innerText, 10);
  addHour.innerText = current - 1;
  save();
};
increaseMin.onclick = () => {
  const current = parseInt(addMin.innerText, 10);
  addMin.innerText = current + 2;
  save();
};
decreaseMin.onclick = () => {
  const current = parseInt(addMin.innerText, 10);
  addMin.innerText = current - 2;
  save();
};

function getClock() {
  const date = new Date();
  const rtc0 = (date.getSeconds() + date.getMinutes()*60 + date.getHours()*3600)*2 + parseInt(addHour.innerText, 10)*60 + parseInt(addMin.innerText, 10) + parseInt(rootadjust)  ;
  const container = document.querySelectorAll(".town");
  const checkbox = document.querySelectorAll(".town input[type=checkbox]");
  for (let i=0; i < container.length; i++) {
    let time = (1440+rtc0+6*parseInt(container[i].dataset.rtc))%1440;
    container[i].querySelector(".hour").innerText = String(parseInt(time/60)).padStart(2,"0");
    container[i].querySelector(".min").innerText = String(time%60).padStart(2,"0");
    if (time<720) {time = time+1440};
    let opentime = parseInt(container[i].dataset.open)*60;
    let closetime = parseInt(container[i].dataset.close)*60;
    container[i].style.background = 'rgba(0,0,0,0)';
    container[i].style.color = '';  
    if (container[i].dataset.open == 99) {container[i].querySelector('h2').style.color = 'rgba(0,0,0,0.1)';}
    else if ((time >= opentime) && (time < closetime)) {
      container[i].style.background = 'rgba(0,255,0,0.5)';
      if (parseInt(container[i].dataset.close) == 48) {
        container[i].querySelector(".status").innerText = "" 
      } else {
        let remaintime = ((closetime - time)/2) % 720;
        container[i].querySelector(".status").innerText = " OPEN (-" + parseInt(remaintime/60) + ":" + String(remaintime%60).padStart(2, "0") + ")";
        if(remaintime <= 120) {
        container[i].style.background = 'rgba(0,255,0,0.3)';
        }
      };
    } else {
      let remaintime = ((opentime + 1440 - time)/2) % 720;
      container[i].querySelector(".status").innerText = "(-" + parseInt(remaintime/60) + ":" + String(remaintime%60).padStart(2, "0") + ")";
      if(remaintime <= 120) {
        container[i].style.background = 'rgba(255,255,0,0.5)';
      } else if(remaintime <= 240) {
        container[i].style.background = 'rgba(255,255,0,0.3)';
      } else if(remaintime <= 360) {
        container[i].style.background = 'rgba(255,255,0,0.1)';
      };
    };
    if(checkbox[i].checked){
      container[i].style.background = 'transparent';
      container[i].style.color = 'rgba(0,0,0,0.1)';
    };
  };

};
getClock();
setInterval(getClock, 1000);
