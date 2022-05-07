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
    path = os.getcwd()
    os.chdir(r'dir/mono')
    answer: list = os.listdir()
    os.chdir(path)
    return jsonify(answer)


@app.route('/pattern_create', methods=['POST'])
def pattern_create():
    if not request.json:
        abort(400)

    pattern: dict = request.get_json()

    if not pettern.get('name'):
        name = gen.gen_pattern_name(pattern) + '.wav'
    else:
        name = pattern['name'] + '.wav'

    path = os.getcwd()
    os.chdir(r'dir/patterns')

    if name in os.listdir():
        os.chdir(path)
        return jsonify({'res': False, 'name': name})

    data_file = gen.gen_pattern(pattern)
    write(name, gen.SAMPLERATE, data_file)

    os.chdir(path)
    return jsonify({'res': True, 'name': name})


@app.route('/mono_create', methods=['POST'])
def mono_create():
    if not request.json:
        abort(400)

    data: dict = request.get_json()
    name: str = data['name'] + '.wav'

    path = os.getcwd()
    os.chdir(r'dir/mono')

    if name in os.listdir():
        os.chdir(path)
        return jsonify({'res': False, 'name': name})

    os.chdir(path)
    os.chdir(r'dir/patterns')
    patterns = []
    for el in data['patterns']:
        _, file_bin = read(el)
        patterns.append(file_bin)

    data_file = gen.gen_mono(patterns)

    if data['save_type'] == 'mono':
        os.chdir(path)
        os.chdir(r'dir/mono')

    write(name, gen.SAMPLERATE, data_file)
    os.chdir(path)
    return jsonify({'res': True, 'name': name, 'type': data['save_type']})


@app.route('/file_create', methods=['POST'])
def file_create():
    if not request.json:
        abort(400)

    data: dict = request.get_json()

    path = os.getcwd()
    os.chdir(r'dir/file')
    if data['name'] in os.listdir():
        os.chdir(path)
        return jsonify({'res': False, 'name': data['name']})

    os.chdir(path)
    os.chdir(r'dir/mono')
    files = []
    for el in data['files']:
        _, file_bin = read(el)
        files.append(file_bin)

    os.chdir(path)
    os.chdir(r'dir/file')
    os.mkdir(data['name'])
    os.chdir(data['name'])

    files = gen.gen_file(files, data['save_type'])
    for index, value in enumerate(files):
        write(data['name'] + '_' + str(index) + '.wav', gen.SAMPLERATE, value)

    os.chdir(path)
    return jsonify({'res': True, 'name': data['name']})


if __name__ == '__main__':
    app.run(debug=True)
