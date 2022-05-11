document.getElementById('file').onclick = e => {
    if (page == 'file') { return; }
    pages_clear();
    init_file();
}

function click_file(e) {
    const obj = { files: [] };
    const form = document.getElementById('form').childNodes;
    for (let i = 0; i < form.length; i++) {
        const field = form[i].childNodes;
        if (field[0] instanceof HTMLLabelElement) {
            const el = field[1];
            if (el.type == 'text') {
                if (el.value.trim() != '') { obj.name = el.value.trim(); }
                else { alert('Поле для ввода имени файла пустое!'); return; }
            } else if (el.type == 'radio' && el.checked) { obj.save_type = el.value; }
        } else { obj.files.push(field[0].innerHTML); }
    }

    if (!obj.save_type) { alert('Выберите тип сохранения файла!'); return; }
    if (obj.files.length < 2) { alert('Выберите хотя бы два файла для генерации папки!'); return; }

    fetch('http://127.0.0.1:5000/file_create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(obj)
    }).then(res => {
        if (res.ok) { return res.json(); }
        else {
            const str = 'Error! response status: ' + res.status;
            alert(str);
            throw str;
        }
    }).then(res => {
        if (res.res) { alert(`Папка с упокованными файлами создан! Название папки: ${res.name}`); }
        else { alert(`Папка с такими названием существует. Название папки: ${res.name}`); }
    })
};

function init_file() {
    page = 'file';
    bottom.appendChild(_create_button('Отправить', click_file));

    const menu = document.createElement('article');
    menu.id = 'mono';
    menu.className = 'column';
    fetch('http://127.0.0.1:5000/mono_get_list').then(res => {
        if (res.ok) { return res.json(); }
        else {
            const str = 'Error! response status: ' + res.status;
            alert(str);
            throw Error(str);
        }
    }).then(res => res.forEach(el => menu.append(create_el(el))));

    const form = document.createElement('article');
    form.id = 'form';
    form.className = 'column';
    form.append(
        create_input('name', 'Имя папки'),
        create_input_radio('save_type', 'При сохранение меньший файл расширять до большего', 'repeat'),
        create_input_radio('save_type', 'При сохранении больший файл обрезать до меньшего', 'cut')
    );

    main.append(menu, form);
}