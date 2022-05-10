document.getElementById('pattern').onclick = e => {
    if (page == 'pattern') { return; }
    pages_clear();
    init_pattern();
}

function click_pattern(e) {
    const obj = {}

    const form = document.getElementById('form').childNodes;
    for (let i = 0; i < form.length; i++) {
        const el = form[i].childNodes[1];
        switch (el.name) {
            case 'name':
                if (el.value.trim() !== '') { obj[el.name] = el.value.trim(); }
                break;
            case 'time':
            case 'interval':
                if (+el.value > 0) { obj[el.name] = el.value; }
                else {
                    if (el.name == 'time') { alert('Период импульсов должен быть больше нуля!'); return; }
                    else { alert('Пауза между пачками должна быть больше нуля!'); return; }
                }
                break;
            case 'duty_cycle':
                if (+el.value > 0 && +el.value < 1) { obj[el.name] = el.value }
                else { alert('В поле для значения Скважности введено некорректное число!'); return; }
                break;
            case 'number_pulses':
            case 'number':
                if (+el.value > 0 && Number.isInteger(+el.value)) { obj[el.name] = el.value }
                else {
                    if (el.name == 'number') { alert('Количество повторов должно быть больше нуля и целым числом!'); return; }
                    else { alert('Количество импульсов в пачке должно быть больше нуля и целым числом!'); return; }
                }
                break;
        }
    }

    fetch('http://127.0.0.1:5000/pattern_create', {
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
        if (res.res) { alert(`Паттерн создан! Название файла: ${res.name}`); }
        else { alert(`Паттерн с такими параметрами существует. Название файла: ${res.name}`); }
    })
};

document.getElementById('pattern').onclick = (e) => {
    pages_clear();
    init_pattern();
}

function init_pattern() {
    page = 'pattern';
    bottom.appendChild(_create_button('Отправить', click_pattern));

    const form = document.createElement('article');
    form.id = 'form';
    form.className = 'column';
    form.append(
        create_input('name', 'Имя файла'),
        create_input('time', 'Частота следования импульсов (Период)', 'number'),
        create_input('duty_cycle', 'Скважность (от 0 до 1)', 'number'),
        create_input('number_pulses', 'Количество импульсов в пачке', 'number'),
        create_input('interval', 'Длительность паузы', 'number'),
        create_input('number', 'Количество повторов в пачке', 'number')
    );

    main.appendChild(form);
}
