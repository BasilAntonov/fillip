document.getElementById('pattern').onclick = e => {
    pages_clear();
    init_pattern();
}

function click_pattern(e) {
    const obj = {
        'time': document.getElementsByName('time')[0].value,
        'duty_cycle': document.getElementsByName('duty_cycle')[0].value,
        'number_pulses': document.getElementsByName('number_pulses')[0].value,
        'interval': document.getElementsByName('interval')[0].value,
        'number': document.getElementsByName('number')[0].value
    }

    fetch('http://127.0.0.1:5000/pattern_create', {
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
            alert('Паттерн создан!');
        })
};

document.getElementById('pattern').onclick = (e) => {
    pages_clear();
    init_pattern();
}

function init_pattern() {
    const button = document.createElement('button');
    button.innerHTML = 'Отправить';
    button.onclick = click_pattern;
    bottom.appendChild(button);

    const form = document.createElement('article');
    form.id = 'form'
    form.append(
        create_input('time', 'Частота следования импульсов (Период)'),
        create_input('duty_cycle', 'Скважность (от 0 до 1)'),
        create_input('number_pulses', 'Количество импульсов в пачке'),
        create_input('interval', 'Длительность паузы'),
        create_input('number', 'Количество повторов в пачке')
    );

    main.appendChild(form);
}
