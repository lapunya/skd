'use script';

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

  clientName.textContent = document.querySelector('#client-name').value;
  licensesList.innerHTML = '';

  Array.from(set.values()).forEach(function (license) {
    let feature = document.createElement('li');

    feature.classList.add('popup__licenses-item');
    feature.textContent = `РЕВЕРС 8000 ${license}`;

    fragment.appendChild(feature);
  });

  licensesList.appendChild(fragment);

  document.querySelector('main').appendChild(popupElement);
  console.log(check());
}

function show () {
  createPopup(check());
}

document.querySelector('.show').addEventListener('click', show);