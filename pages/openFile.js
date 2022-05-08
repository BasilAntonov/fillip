document.getElementById('dir').onclick = e => {
    pages_clear();
    init_dir();
}

function open_file(e) {
    const name = e.target.parentNode.childNodes[0].innerHTML;
    const folder = e.target.parentNode.parentNode.childNodes[0].innerHTML;
    fetch(`http://127.0.0.1:5000/open_file?type=file&name=${name}&folder=${folder}`).then(res => {
        if (res.ok) { return res.json(); }
        else {
            const str = 'Error! response status: ' + res.status;
            alert(str);
            throw Error(str);
        }
    }).then(res => { });
}

function init_dir() {
    const menu = document.createElement('article');
    menu.id = 'menu';
    menu.className = 'column';
    fetch('http://127.0.0.1:5000/file_get_list').then(res => {
        if (res.ok) { return res.json(); }
        else {
            const str = 'Error! response status: ' + res.status;
            alert(str);
            throw Error(str);
        }
    }).then(res => {
        for (el in res) {
            const header = document.createElement('div');
            header.className = 'dir_name'
            header.innerHTML = el;

            const folder = document.createElement('div');
            folder.className = 'dir'
            folder.appendChild(header);
            res[el].forEach(file => {
                const _file = _create_el(file, [{name: 'open', fun: open_file}])
                _file.className = 'dir_file'
                folder.appendChild(_file)
            });
            menu.appendChild(folder);
        }
    });

    main.appendChild(menu);
}