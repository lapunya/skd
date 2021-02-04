'use script';

let licenses = {
  free: {
    title: 'Старт'
  },
  '0-200': {
    title: '200'
  },
  '200-1000': {
    title: '1000'
  },
  '1000-5000': {
    title: '5000'
  },
  '5000-10000': {
    title: '10000'
  },
  postgresql: {
    title: 'Корпорация PostgreSQL'
  },
  robot: {
    title: 'Системный робот'
  },
  orion: {
    title: 'Интеграция с системой охранно-пожарной сигнализации Орион'
  },
  biometr: {
    title: 'Интеграция с системами биометрии'
  },
  beward: {
    title: 'Интеграция с терминалами BEWARD TFR'
  },
  carnumber: {
    title: 'Интеграция с системами распознавания автомобильных номеров'
  },
  corp: {
    title: 'Корпорация'
  },
  video: {
    title: 'Видео'
  },
  territory: {
    title: 'Схемы территории'
  },
  worktime: {
    title: 'Учет рабочего времени'
  },
  '1C': {
    title: 'Интеграция с 1С. Предприятие'
  },
  pass: {
    title: 'Оформление пропусков'
  },
  scan: {
    title: 'Сканирование документов ABBYY PassportReader API'
  },
  control: {
    title: 'Контроль действий оператора'
  },
  active: {
    title: 'Интеграция с Active Directory'
  }
};

let clientLicenses = new Set();

function select () {
  let usersNumber = document.querySelectorAll('option');
  usersNumber.forEach(function (number) {
    if (number.selected && number.textContent !== '') {
      clientLicenses.add(number.dataset.licenseName);
      return clientLicenses;
    }
  });
}

function check () {
  let checkboxes = document.querySelectorAll('.check');
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

  let licensesList = popupElement.querySelector('.popup__licenses-list');

  licensesList.innerHTML = '';

  Array.from(set.values()).forEach(function (license) {
    let feature = document.createElement('li');
    feature.classList.add('popup__licenses-item');

    feature.textContent = `РЕВЕРС 8000. ${licenses[license].title}`;
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

document.querySelector('.show').addEventListener('click', showPopup);