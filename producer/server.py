import os
import json
import genaudio as gen
from flask import Flask, jsonify, request
from scipy.io.wavfile import write, read

app = Flask(__name__)


@app.route('/')
def index():
    return ""


@app.route('/pattern_get_list', methods=['GET'])
def list_pattern():
    path = os.getcwd()
    os.chdir(r'dir/patterns')
    answer: list = os.listdir()
    os.chdir(path)
    return jsonify(answer)


@app.route('/mono_get_list', methods=['GET'])
def list_mono_file():
    with open('./dir/monoFiles.json', 'r') as f:
        res = json.load(f)
    return jsonify(res)


@app.route('/pattern_create', methods=['POST'])
def pattern_create():
    if not request.json:
        abort(400)

    with open('./dir/patterns.json') as f:
        obj: list = json.load(f)

    flag = True
    pattern: dict = request.get_json()
    gen.gen_pattern_name(pattern)

    for el in obj:
        if (el == pattern):
            flag = False
            break

    if flag:
        with open('./dir/patterns.json', 'w') as f:
            obj.append(pattern)
            f.write(json.dumps(obj))
        data_file = gen.gen_pattern(pattern)
        write('./dir/patterns/' +
              pattern['name'] + '.wav', gen.SAMPLERATE, data_file)

    return jsonify({'res': flag})


@app.route('/mono_create', methods=['POST'])
def mono_create():
    if not request.json:
        abort(400)

    data: dict = request.get_json()
    name: str = data['name'] + '.wav'

    path = os.getcwd()
    os.chdir(r'dir/mono_files')

    content: list = os.listdir()
    if name in content:
        os.chdir(path)
        return jsonify({'res': False, 'file_name': name})


    os.chdir(path)
    os.chdir(r'dir/patterns')
    patterns = []
    for el in data['patterns']:
        _, file_bin = read(el)
        patterns.append(file_bin)

    data_file = gen.gen_mono(patterns)

    if data['save_type'] == 'mono':
        os.chdir(path)
        os.chdir(r'dir/mono_files')

    write(name, gen.SAMPLERATE, data_file)
    os.chdir(path)
    return jsonify({'res': True, 'name': name, 'type': data['save_type']})


@app.route('/file_create', methods=['POST'])
def file_create():
    if not request.json:
        abort(400)

    data: dict = request.get_json()
    files = []

    for el in data['files']:
        _, file_bin = read('./dir/mono_files/' + el + '.wav')
        files.append(file_bin)

    path = os.getcwd()
    os.chdir(r'dir/file')
    os.mkdir(data['folder'])
    os.chdir(data['folder'])

    files = gen.gen_file(files)
    for index, value in enumerate(files):
        write('./' + data['folder'] + '_' +
              str(index) + '.wav', gen.SAMPLERATE, value)

    os.chdir(path)
    return jsonify({'res': True})


if __name__ == '__main__':
    app.run(debug=True)
