document.getElementById('out').onclick = (e) => {
    const obj = {
        'time': document.getElementById('p1').value,
        'duty_cycle': document.getElementById('p2').value,
        'number_pulses': document.getElementById('p3').value,
        'interval': document.getElementById('p4').value,
        'number': document.getElementById('p5').value
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

createNav([{
    href: '../createMono/createMono.html',
    innerHTML: 'Генератор моно файлов'
}, {
    href: '../createFile/CreateFile.html',
    innerHTML: 'Генератор файлов'
}, {
    href: '../../index.html',
    innerHTML: 'Главная страница'
}]);