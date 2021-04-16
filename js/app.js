fetch('https://carlosreneas.github.io/endpoints/cartas.json')
  .then(response => response.json())
  .then(value => saveDataLocalStorage(value));


function saveDataLocalStorage(value) {
  let data = window.localStorage.getItem('cards');
  if (typeof data !== 'undefined' && data !== null) {
    loadTable(data);
  } else {
    window.localStorage.setItem('cards', JSON.stringify(value.data));
    let data = window.localStorage.getItem('cards');
    loadTable(data);
  }
}

function loadTable(data) {
  const info = JSON.parse(data);
  const tbody = document.getElementById('card-table-body');
  tbody.innerHTML = '';
  for (let i = 0; i < info.length; i++) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${info[i].numero}</td><td>${info[i].carta}</td><td>${info[i].valor}</td>`;
    tbody.appendChild(tr);
  }
}

function addCard(value) {

  switch (value) {
    case 1: loadCard('As de diamantes');
      break;
    case 2: loadCard('Dos de diamantes');
      break;
    case 3: loadCard('Cuatro de corazones');
      break;
    case 4: loadCard('Cinco de corazones');
      break;
    case 5: loadCard('Tres de corazones');
      break;
    case 6: loadCard('Seis de treboles');
      break;
    case 7: loadCard('Siete de diamantes');
      break;
    case 8: loadCard('Ocho de treboles');
      break;
    case 9: loadCard('Nueve de diamantes');
      break;
    case 10: loadCard('Diez de corazones');
      break;
    case 11: loadCard('J de treboles');
      break;
    case 12: loadCard('Q de picas');
      break;
    case 13: loadCard('K de diamantes');
      break;
    default: console.log('Error');
      break;
  }
}

/**
 * 
 * @param {String} card 
 */
function loadCard(card) {
  let data = JSON.parse(window.localStorage.getItem('cards'));
  let exist = false;
  for (let i = 0; i < data.length; i++) {
    if (data[i].carta.toLowerCase() === card.toLowerCase()) {
      exist = true;
      data[i].valor = (parseInt(data[i].valor) + 1).toString();
    }
  }

  if (!exist) {
    let new_card = {
      "numero": (data.length + 1).toString(),
      "carta": card,
      "valor": "1"
    };
    data.push(new_card);
  }
  window.localStorage.setItem('cards', JSON.stringify(data));
  loadTable(JSON.stringify(data));
}

let button = document.getElementById('form-card-button');
button.addEventListener('click', ev => {
  ev.preventDefault();
  const num = document.getElementById('num');
  const card = document.getElementById('card');
  if (num.value === '' || card.value === '') {
    const error = document.getElementById('card-error');
    error.textContent = 'Llene los campos por favor';
  } else {
    let data = JSON.parse(window.localStorage.getItem('cards'));
    let exist = false;
    for (let i = 0; i < data.length; i++) {
      if (data[i].carta.toLowerCase() === card.value.toLowerCase()) {
        exist = true;
      }
    }
    if (!exist) {
      let new_card = {
        "numero": num.value,
        "carta": card.value,
        "valor": "0"
      };
      data.push(new_card);
    }
    window.localStorage.setItem('cards', JSON.stringify(data));
    loadTable(JSON.stringify(data));
    num.value = '';
    card.value = '';
  }
});
