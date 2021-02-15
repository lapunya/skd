'use script';

let licenses = {
  start: {
    title: 'Бесплатное ПО РЕВЕРС СТАРТ 8000'
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
    title: 'РЕВЕРС 8000. Сканирование документов + ABBYY PassportReader API'
  },
  control: {
    title: 'РЕВЕРС 8000. Контроль действий оператора'
  },
  active: {
    title: 'РЕВЕРС 8000. Интеграция с Active Directory'
  }
};

let main = document.querySelector('.functionality')

let functionalityCheckList = main.querySelectorAll('.functionality__check');
let startCheckItem = main.querySelector('#start');
let postgresqlLic = main.querySelector('#postgresql');

let showButton = main.querySelector('.functionality__button');
let usersNumberSelect = main.querySelector('.functionality__select');
let usersNumberOptions = main.querySelectorAll('option');

let successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
let errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
let messageElement;

let messageForm = document.querySelector('.message-form');
let messageFormInputs = messageForm.querySelectorAll('input');
let messageFormSubmit = messageForm.querySelector('.message-form__button');


let clientLicenses = new Set();

const escKey = 'Escape';
const timeout = 10000;

(function () {
  window.IMask(
      document.getElementById('telephoneNumber'), {
        mask: '00000000000'
      });
})();

function isEscPress (evt, action) {
  if (evt.key === escKey) {
    action();
  }
}

function isLeftMouseButtonClick (evt, action) {
  if (evt.button === 0) {
    action();
  }
}

function onMessageClick (evt) {
  isLeftMouseButtonClick(evt, closeMessage);
}

function onMessageEscPress (evt) { // нажатие Esc на сообщении
  isEscPress(evt, closeMessage);
}

function closeMessage () { // функция закрытия сообщения
  messageElement.remove();
  setActiveForm();
  document.removeEventListener('keydown', onMessageEscPress);
  document.removeEventListener('click', onMessageClick);
}

function setInactiveForm () {
  messageFormInputs.forEach(function (item) {
    item.disabled = true;
  });
  messageFormSubmit.disabled = true;
}

function setActiveForm () {
  messageFormInputs.forEach(function (item) {
    item.disabled = false;
  });
  messageFormSubmit.disabled = false;
}

function checkStart () { // Функция, которая скрывает/отображает чекбоксы при вкл/выкл чекбокса "Однопользовательское ПО" 
  if (startCheckItem.checked) {
    functionalityCheckList.forEach(function (checkbox) {
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
    functionalityCheckList.forEach(checkbox => checkbox.disabled = false);
    usersNumberSelect.disabled = false;
  }
}

function checkPostgresql () { // Функция, которая скрывает/отображает чекбоксы при вкл/выкл чекбокса "СУБД PostgreSQL" 
  if (postgresqlLic.checked) {
    usersNumberSelect.disabled = true;
    usersNumberOptions[0].selected = true;
  } else {
    usersNumberSelect.disabled = false;
  }
}

function selectUsersNumber () { // Функция, которая добавляет лицензии в зависимости от выбора в выпадающем списке "Количество пользователей"
  usersNumberOptions.forEach(function (number) {
    if (number.selected && number.textContent !== '') {
      clientLicenses.add(number.dataset.licenseName);
      return clientLicenses;
    }
  });
}

function check () { // Функция, которая добавляет лицензии в зависимости от выбранных чекбоксов
  functionalityCheckList.forEach(function (checkbox) {
    if (checkbox.checked) {
      if (checkbox.dataset.licenseName === '1C') {
        clientLicenses.add('worktime');
      }
      clientLicenses.add(checkbox.dataset.licenseName);
    }
  });
  return clientLicenses;
}

function createPopup (set) { // Функция создания блока со списком лицензий
  let popupTemplate = document.querySelector('#popup').content.querySelector('.report'); // шаблон, содержимое которого мы будем копировать
  let fragment = document.createDocumentFragment();
  let popupElement = popupTemplate.cloneNode(true);

  let title = popupElement.querySelector('.report__title');
  let licensesList = popupElement.querySelector('.popup__licenses-list');
  let messageText = messageForm.querySelector('.message-form__text');

  if (set.size === 0) title.textContent = 'Выберите нужный Вам функционал';

  licensesList.innerHTML = '';

  Array.from(set.values()).forEach(function (license) {
    let feature = document.createElement('li');
    feature.classList.add('popup__licenses-item');

    feature.textContent = licenses[license].title;
    fragment.appendChild(feature);
  });

  licensesList.appendChild(fragment);

  Array.from(set.values()).forEach(function (license) {
    messageText.textContent += `${licenses[license].title}\n`;
  });

  main.appendChild(popupElement);
}

function showForm () { // Функция отображения формы обратной связи
  if (clientLicenses.size > 0) {
    messageForm.classList.add('message-form--active');
  }
}

function resetPopup () { // Функция скрытия блока со списком лицензий
  let report = document.querySelector('.report');
  if (report) report.remove();
  clientLicenses.clear();
  messageForm.classList.remove('message-form--active');
}

function onSuccessApiResponse () {
  messageElement = successMessageTemplate;

  main.appendChild(successMessageTemplate);
  document.addEventListener('keydown', onMessageEscPress);
  document.addEventListener('click', onMessageClick);
}

function showErrorMessage (xhr, onError) {
  xhr.addEventListener('error', function () {
    onError('Произошла ошибка соединения');
  });

  xhr.addEventListener('timeout', function () {
    onError('Превышено время ожидания');
  });

  xhr.timeout = timeout;
}

function onErrorApiResponse (errorMessage) {
  messageElement = errorMessageTemplate;

  errorMessageTemplate.querySelector('.error__message').textContent = errorMessage;

  main.appendChild(errorMessageTemplate);
  document.addEventListener('keydown', onMessageEscPress);
  document.addEventListener('click', onMessageClick);
}

function send (data, onSuccess, onError) { // Функция отправки сообщения (данных формы) на почту
  let xhr = new XMLHttpRequest();
  xhr.open('POST', 'send.php', true);

  xhr.addEventListener('load', function () {
    switch (xhr.status) {
      case 200:
        onSuccess();
        break;
      case 400:
        onError('В запросе клиента синтаксическая ошибка');
        break;
      case 404:
        onError('Страница не найдена');
        break;
      default:
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    }
  });

  showErrorMessage(xhr, onError);

  xhr.send(data);
}

function showPopup () { // Основная функция, которая показывает список нужных лицензий и отображает форму обратной связи
  resetPopup();
  selectUsersNumber();
  check();
  createPopup(clientLicenses);
  showForm();
  this.scrollIntoView();
}

startCheckItem.addEventListener('click', checkStart);
postgresqlLic.addEventListener('click', checkPostgresql);
showButton.addEventListener('click', showPopup);

messageForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  send(new FormData(messageForm), onSuccessApiResponse, onErrorApiResponse);
  setInactiveForm();
});