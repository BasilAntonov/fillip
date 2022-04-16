document.getElementById('out').onclick = (e) => {
    const mes = [];
    mono.childNodes.forEach((currentValue, currentIndex, listObj) => {
        mes.push(currentValue.childNodes[0].innerHTML);
    });
    fetch('http://127.0.0.1:5000/file_create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(mes)
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
            el.innerHTML = res[i].name;
            list.append(el);
        }
    });

createNav([{
    href: '../createPattern/createPattern.html',
    innerHTML: 'Генератор паттерно'
}, {
    href: '../createMono/createMono.html',
    innerHTML: 'Генератор моно файлов'
}, {
    href: '../../index.html',
    innerHTML: 'Главная страница'
}]);