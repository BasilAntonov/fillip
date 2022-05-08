document.getElementById('mono').onclick = e => {
    pages_clear();
    init_mono();
}

function click_mono(e) {
    const obj = { patterns: [] };
    const form = document.getElementById('form').childNodes;
    for (let i = 0; i < form.length; i++) {
        const field = form[i].childNodes;
        if (field[0] instanceof HTMLLabelElement) {
            const el = field[1];
            if (el.type == 'text') {
                if (el.value.trim() != '') { obj.name = el.value.trim(); }
                else { alert('Поле для ввода имени файла пустое!'); return; }
            } else if (el.type == 'radio' && el.checked) { obj.save_type = el.value; }
        } else { obj.patterns.push(field[0].innerHTML); }
    }

    if (!obj.save_type) { alert('Выберите тип сохранения файла!'); return; }
    if (obj.patterns.length < 2) { alert ('Выберите хотя бы два патерна для генерации нового файла!'); return;}

    fetch('http://127.0.0.1:5000/mono_create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(obj)
    }).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            const str = 'Error! response status: ' + res.status;
            alert(str);
            throw str;
        }
    }).then(res => {
        if (res.res) {
            if (res.type == 'mono') { alert(`Моно файл создан! Название файла: ${res.name}`); }
            else { alert(`Паттерн создан! Название файла: ${res.name}`); }
        } else {
            if (res.type == 'mono') { alert(`Моно файл с таким названием существует. Название файла: ${res.name}`); }
            else { alert(`Паттерн с таким названием существует. Название файла: ${res.name}`); }
        }
    })
};

function init_mono() {
    const button = document.createElement('button');
    button.innerHTML = 'Отправить';
    button.onclick = click_mono;
    bottom.appendChild(button);

    const menu = document.createElement('article');
    menu.id = 'menu';
    fetch('http://127.0.0.1:5000/pattern_get_list').then(res => {
        if (res.ok) { return res.json(); }
        else {
            const str = 'Error! response status: ' + res.status;
            alert(str);
            throw str;
        }
    }).then(res => {
        for (let i = 0; i < res.length; i++) {
            let el = document.createElement('button');
            el.onclick = click;
            el.innerHTML = res[i];
            menu.append(el);
        }
    });

    const form = document.createElement('article');
    form.id = 'form';
    form.append(
        create_input('name', 'Имя файла'),
        create_input_radio('save_type', 'Сохранить как новый паттерн', 'pattern'),
        create_input_radio('save_type', 'Сохранить как моно файл', 'mono')
    );

    main.append(menu, form);
}