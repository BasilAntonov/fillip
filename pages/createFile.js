document.getElementById('file').onclick = e => {
    pages_clear();
    init_file();
}

function click_file(e) {
    const obj = { files: [] };
    document.getElementById('form').childNodes.forEach(currentValue => {
        if (currentValue.childNodes[0] instanceof HTMLLabelElement) {
            const el = currentValue.childNodes[1];
            if (el.type == 'text') {
                obj.name = el.value;
            } else if (el.type == 'radio' && el.checked) {
                obj.file_type = el.value;
            }
        } else {
            obj.files.push(currentValue.childNodes[0].innerHTML);
        }
    });

    fetch('http://127.0.0.1:5000/file_create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(obj)
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                const str = 'Error! response status: ' + res.status;
                alert(str);
                throw str;
            }
        })
        .then(res => {
            alert('Файл создан!');
        })
};

function init_file() {
    const button = document.createElement('button');
    button.innerHTML = 'Отправить';
    button.onclick = click_file;
    bottom.appendChild(button);

    const menu = document.createElement('article');
    menu.id = 'menu';
    fetch('http://127.0.0.1:5000/mono_get_list')
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                const str = 'Error! response status: ' + res.status;
                alert(str);
                throw str;
            }
        })
        .then(res => {
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
        create_input('name', 'name'),
        create_input_radio('save_type', 'repeat', 'repeat'),
        create_input_radio('save_type', 'cut', 'cut')
    );

    main.append(menu, form);
}