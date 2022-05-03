import numpy as np

TYPE = np.uint8
SAMPLERATE = 1000
AMPLITUDE = np.iinfo(TYPE).max


def gen_pattern_name(data):
    data['name'] = str(data['time']) + 't' + str(data['duty_cycle']) + 'o' + str(
        data['number_pulses']) + 'p' + str(data['interval']) + 'i' + str(data['number']) + 'n'
    return


def gen_pattern(data):
    omega = float(data['duty_cycle'])
    tau = np.full(int(SAMPLERATE * float(data['interval'])), 0, dtype=TYPE)

    pulse = SAMPLERATE * float(data['time'])
    t1 = np.full(int(pulse * omega), AMPLITUDE, dtype=TYPE)
    interval = np.full(int(pulse * (1 - omega)), 0, dtype=TYPE)
    t = np.concatenate((t1, interval))

    for i in range(int(data['number_pulses'])):
        t = np.concatenate((t, t))

    answer = np.concatenate((t, tau))
    for i in range(int(data['number'])):
        answer = np.concatenate((answer, answer))

    return answer


def gen_mono(patterns):
    answer = np.array([], dtype=TYPE)
    for el in patterns:
        answer = np.concatenate((answer, el))
    return answer


def gen_file(files):
    answer = []
    for i in range(len(files)//2):
        data = np.hstack((files[2*i], files[2*i+1]))
        answer.append(data)

    if len(files) % 2 == 1:
        empty = np.full(files[-1].shape[0], 0, dtype=TYPE)
        data = np.hstack((files[-1], empty))
        answer.append(data)

    return answer
