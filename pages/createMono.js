document.getElementById('mono').onclick = e => {
    pages_clear();
    init_mono();
}

function click_mono(e) {
    const obj = { patterns: [] };
    document.getElementById('form').childNodes.forEach(currentValue => {
        if (currentValue.childNodes[0] instanceof HTMLLabelElement) {
            const el = currentValue.childNodes[1];
            if (el.type == 'text') {
                obj.name = el.value;
            } else if (el.type == 'radio' && el.checked) {
                obj.save_type = el.value;
            }
        } else {
            obj.patterns.push(currentValue.childNodes[0].innerHTML);
        }
    });

    fetch('http://127.0.0.1:5000/mono_create', {
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
            alert('Моно файл создан!');
        })
};

function init_mono() {
    const button = document.createElement('button');
    button.innerHTML = 'Отправить';
    button.onclick = click_mono;
    bottom.appendChild(button);

    const menu = document.createElement('article');
    menu.id = 'menu';
    fetch('http://127.0.0.1:5000/pattern_get_list')
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
        create_input_radio('save_type', 'pattern', 'pattern'),
        create_input_radio('save_type', 'mono', 'mono')
    );

    main.append(menu, form);
}