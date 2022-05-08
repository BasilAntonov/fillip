const main = document.getElementById('main');
const bottom = document.getElementById('bottom');

function click(e) {
    const button = document.createElement('button');
    button.onclick = clickDel;
    button.innerHTML = 'del';

    const data = document.createElement('div');
    data.innerHTML = e.target.innerHTML;

    const el = document.createElement('div');
    el.append(data);
    el.append(button);

    document.getElementById('form').append(el);
}

function clickDel(e) {
    e.target.parentNode.remove();
}

function pages_clear() {
    while (main.firstChild) { main.removeChild(main.firstChild); }
    while (bottom.firstChild) { bottom.removeChild(bottom.firstChild); }
}

function create_input(name, text, type) {
    const input = _create_input(name, text, type);
    const label = _create_label(name, text);
    const el = document.createElement('div');
    el.append(label, input);
    return el;
}

function create_input_radio(name, text, value) {
    const input = _create_input(name, text, 'radio');
    input.value = value;

    const label = _create_label(name, text);
    const el = document.createElement('div');
    el.append(label, input);
    return el;
}

function _create_input(name, text, type) {
    const input = document.createElement('input');
    input.name = name;
    input.type = type ? type : 'text';
    input.placeholder = text;
    return input;
}

function _create_label(name, text) {
    const label = document.createElement('label');
    label.innerHTML = text;
    label.htmlFor = name;
    return label;
}