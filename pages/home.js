document.getElementById('home').onclick = e => {
    pages_clear();
    init_home();
}

function init_home() {
    const footer = document.createElement('p');
    footer.append('Дипломная работа.', document.createElement('br'), 'Автор: Антонов Василий');
    bottom.appendChild(footer);
}

init_home();
