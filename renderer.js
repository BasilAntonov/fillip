const main = document.getElementById('main');
const bottom = document.getElementById('bottom');

function click_open(e) {
    const name = e.target.parentNode.childNodes[0].innerHTML;
    const type = e.target.parentNode.parentNode.id;

    fetch(`http://127.0.0.1:5000/open_file?type=${type}&name=${name}`).then(res => {
        if (res.ok) { return res.json(); }
        else {
            const str = 'Error! response status: ' + res.status;
            alert(str);
            throw Error(str);
        }
    }).then(res => { });
}

function _create_el(name, buttons) {
    const data = document.createElement('div');
    data.innerHTML = name;

    const el = document.createElement('div');
    el.appendChild(data);

    buttons.forEach(button => { el.appendChild(_create_button(button.name, button.fun)); });
    return el;
}

function create_el(name) { return _create_el(name, [{ name: 'open', fun: click_open }, { name: 'add', fun: click }]) }

function _create_button(name, fun) {
    const button = document.createElement('button');
    button.onclick = fun;
    button.innerHTML = name;
    return button;
}

function click(e) {
    const data = e.target.parentNode.childNodes[0].innerHTML;
    const el = _create_el(data, [{ name: 'del', fun: clickDel }]);
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