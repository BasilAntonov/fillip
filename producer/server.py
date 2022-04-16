from flask import Flask, jsonify
# from flask_restful import Resource, Api
from flask import request

import json

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
    # TODO
    pattern = {
        'name': 'rtt',
        'p1': request.json['p1'],
        'p2': request.json['p2'],
        'p3': request.json['p3'],
        'p4': request.json['p4'],
        'p5': request.json['p5'],
    }

    with open('./dir/patterns.json') as f:
        obj = json.load(f)

    flag = True

    for el in obj:
        if (el == pattern):
            flag = False
            break

    if flag:
        with open('./dir/patterns.json', 'w') as f:
            obj.append(pattern)
            f.write(json.dumps(obj))
        
        my_file = open("./dir/patterns/newfile.txt", "w+")
        my_file.write(json.dumps(pattern))
        my_file.close()

    return jsonify({'res': flag})


@app.route('/mono_create', methods=['POST'])
def mono_create():
    return ""


@app.route('/file_create', methods=['POST'])
def file_create():
    return ""


if __name__ == '__main__':
    app.run(debug=True)
