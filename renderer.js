const list = document.getElementById('menu');
const mono = document.getElementById('data');
const nav = document.getElementById('nav');

function click(e) {
    const button = document.createElement('button');
    button.onclick = clickDel;
    button.innerHTML = 'del';
    const data = document.createElement('div');
    data.innerHTML = e.target.innerHTML;
    const el = document.createElement('div');
    el.append(data);
    el.append(button);
    mono.append(el);
}

function clickDel(e) {
    e.target.parentNode.remove();
}

function createNav(data) {
    while (nav.firstChild) {
        nav.removeChild(nav.firstChild);
    }
    for (let i = 0; i < data.length; i++) {
        const button = document.createElement('button');
        button.onclick = () => document.location = data[i].href;
        button.innerHTML = data[i].innerHTML;
        nav.append(button);
    }
}