import json
import genaudio as gen
from flask import Flask, jsonify, request
from scipy.io.wavfile import write

app = Flask(__name__)


@app.route('/')
def index():
    return ""


@app.route('/pattern_get_list', methods=['GET'])
def list_pattern():
    with open('./dir/patterns.json') as f:
        res = json.load(f)
    return jsonify(res)


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
        write('./dir/patterns/' + pattern['name'] + '.wav', gen.SAMPLERATE, data_file)

    return jsonify({'res': flag})


@app.route('/mono_create', methods=['POST'])
def mono_create():
    return ""


@app.route('/file_create', methods=['POST'])
def file_create():
    return ""


if __name__ == '__main__':
    app.run(debug=True)
