'use script';

let licenses = {
  free: {
    title: 'Старт',
    price: 0
  },
  '0-200': {
    title: '200',
    price: 300
  },
  '200-1000': {
    title: '1000',
    price: 300
  },
  '1000-5000': {
    title: '5000',
    price: 300
  },
  '5000-10000': {
    title: '10000',
    price: 300
  },
  postgresql: {
    title: 'Корпорация PostgreSQL',
    price: 300
  },
  robot: {
    title: 'Системный робот',
    price: 300
  },
  orion: {
    title: 'Интеграция с системой охранно-пожарной сигнализации Орион',
    price: 300
  },
  biometr: {
    title: 'Интеграция с системами биометрии',
    price: 300
  },
  beward: {
    title: 'Интеграция с терминалами BEWARD TFR',
    price: 300
  },
  carnumber: {
    title: 'Интеграция с системами распознавания автомобильных номеров',
    price: 300
  },
  corp: {
    title: 'Корпорация',
    price: 300
  },
  video: {
    title: 'Видео',
    price: 300
  },
  territory: {
    title: 'Схемы территории',
    price: 300
  },
  worktime: {
    title: 'Учет рабочего времени',
    price: 300
  },
  '1C': {
    title: 'Интеграция с 1С. Предприятие',
    price: 300
  },
  pass: {
    title: 'Оформление пропусков',
    price: 300
  },
  scan: {
    title: 'Сканирование документов ABBYY PassportReader API',
    price: 300
  },
  control: {
    title: 'Контроль действий оператора',
    price: 300
  },
  active: {
    title: 'Интеграция с Active Directory',
    price: 300
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
  let total = popupElement.querySelector('.popup__total');
  let sum = 0;

  licensesList.innerHTML = '';

  Array.from(set.values()).forEach(function (license) {
    let feature = document.createElement('li');
    feature.classList.add('popup__licenses-item');

    feature.textContent = `РЕВЕРС 8000. ${licenses[license].title} - ${licenses[license].price} руб.`;
    fragment.appendChild(feature);
    sum += licenses[license].price;
  });

  licensesList.appendChild(fragment);

  total.textContent = `Количество лицензий: ${set.size}. Сумма: ${sum} руб.`;

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