'use script';

let licenses = {
  start: {
    title: 'РЕВЕРС СТАРТ 8000'
  },
  '0-200': {
    title: 'РЕВЕРС 8000.200'
  },
  '200-1000': {
    title: 'РЕВЕРС 8000.1000'
  },
  '1000-5000': {
    title: 'РЕВЕРС 8000.5000'
  },
  '5000-10000': {
    title: 'РЕВЕРС 8000.10000'
  },
  postgresql: {
    title: 'РЕВЕРС 8000. Корпорация PostgreSQL'
  },
  robot: {
    title: 'РЕВЕРС 8000. Системный робот'
  },
  orion: {
    title: 'РЕВЕРС 8000. Интеграция с системой охранно-пожарной сигнализации Орион'
  },
  biometr: {
    title: 'РЕВЕРС 8000. Интеграция с системами биометрии'
  },
  beward: {
    title: 'РЕВЕРС 8000. Интеграция с терминалами BEWARD TFR'
  },
  carnumber: {
    title: 'РЕВЕРС 8000. Интеграция с системами распознавания автомобильных номеров'
  },
  corp: {
    title: 'РЕВЕРС 8000. Корпорация'
  },
  video: {
    title: 'РЕВЕРС 8000. Видео'
  },
  territory: {
    title: 'РЕВЕРС 8000. Схемы территории'
  },
  worktime: {
    title: 'РЕВЕРС 8000. Учет рабочего времени'
  },
  '1C': {
    title: 'РЕВЕРС 8000. Интеграция с 1С. Предприятие'
  },
  pass: {
    title: 'РЕВЕРС 8000. Оформление пропусков'
  },
  scan: {
    title: 'РЕВЕРС 8000. Сканирование документов ABBYY PassportReader API'
  },
  control: {
    title: 'РЕВЕРС 8000. Контроль действий оператора'
  },
  active: {
    title: 'РЕВЕРС 8000. Интеграция с Active Directory'
  }
};

let checkboxes = document.querySelectorAll('.check');
let startLic = document.querySelector('#start');
let showButton = document.querySelector('.show');
let usersNumberSelect = document.querySelector('.users-number');

let usersNumberOptions = document.querySelectorAll('option');

let clientLicenses = new Set();

function start () {
  if (startLic.checked) {
    checkboxes.forEach(function (checkbox) {
      if (checkbox.dataset.licenseName === 'pass' || checkbox.id === 'video-id' || checkbox.id === 'start') {
        checkbox.disabled = false;
      } else {
        checkbox.disabled = true;
        usersNumberSelect.disabled = true;
        checkbox.checked = false;
        usersNumberOptions[0].selected = true;
      }
    });
  } else {
    checkboxes.forEach(checkbox => checkbox.disabled = false);
    usersNumberSelect.disabled = false;
  }
}

function select () {
  usersNumberOptions.forEach(function (number) {
    if (number.selected && number.textContent !== '') {
      clientLicenses.add(number.dataset.licenseName);
      return clientLicenses;
    }
  });
}

function check () {
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      if (checkbox.dataset.licenseName === '1C') {
        clientLicenses.add('worktime');
      }
      clientLicenses.add(checkbox.dataset.licenseName);
    }
  });
  return clientLicenses;
}

function createPopup (set) {
  let popupTemplate = document.querySelector('#popup').content.querySelector('.report'); // шаблон, содержимое которого мы будем копировать
  let fragment = document.createDocumentFragment();
  let popupElement = popupTemplate.cloneNode(true);

  let title = popupElement.querySelector('.report__title');
  let licensesList = popupElement.querySelector('.popup__licenses-list');

  if (set.size === 0) title.textContent = 'Выберите нужный Вам функционал';

  licensesList.innerHTML = '';

  Array.from(set.values()).forEach(function (license) {
    let feature = document.createElement('li');
    feature.classList.add('popup__licenses-item');

    feature.textContent = licenses[license].title;
    fragment.appendChild(feature);
  });

  licensesList.appendChild(fragment);

  document.querySelector('main').appendChild(popupElement);
}

function resetPopup () {
  let report = document.querySelector('.report');
  if (report) report.remove();
  clientLicenses.clear();
}

function showPopup () {
  resetPopup();
  select();
  check();
  createPopup(clientLicenses);
  this.scrollIntoView();
}

startLic.addEventListener('click', start);
showButton.addEventListener('click', showPopup);