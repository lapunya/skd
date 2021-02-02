'use script';

let licenses = {
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

function check () {
  let clientLicenses = new Set();
  let checkboxes = document.querySelectorAll('.check');
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      clientLicenses.add(checkbox.dataset.licenseName);
    }
  });
  return clientLicenses;
}

function createPopup (set) {
  let popupTemplate = document.querySelector('#popup').content.querySelector('.report'); // шаблон, содержимое которого мы будем копировать
  var fragment = document.createDocumentFragment();
  let popupElement = popupTemplate.cloneNode(true);

  let clientName = popupElement.querySelector('.popup__client-name');
  let licensesList = popupElement.querySelector('.popup__licenses-list');
  let total = popupElement.querySelector('.popup__total');
  let sum = 0;
  clientName.textContent = document.querySelector('#client-name').value;
  licensesList.innerHTML = '';

  Array.from(set.values()).forEach(function (license) {
    let feature = document.createElement('li');
    feature.classList.add('popup__licenses-item');

    feature.textContent = `РЕВЕРС 8000 ${licenses[license].title} - ${licenses[license].price} руб.`;
    fragment.appendChild(feature);
    sum += licenses[license].price;
  });

  licensesList.appendChild(fragment);

  total.textContent = `Количество лицензий: ${set.size}. Сумма: ${sum} руб.`;

  document.querySelector('main').appendChild(popupElement);
  console.log(check());
}

function show () {
  createPopup(check());
}

document.querySelector('.show').addEventListener('click', show);