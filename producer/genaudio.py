import numpy as np

TYPE = np.uint8
SAMPLERATE = 1000
AMPLITUDE = np.iinfo(TYPE).max


def gen_pattern_name(data):
    return str(data['time']) + 't' + str(data['duty_cycle']) + 'o' + str(data['number_pulses']) + 'p' + str(data['interval']) + 'i' + str(data['number']) + 'n'


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


def gen_file(files: list, _type: str):
    answer = []
    for i in range(len(files)//2):
        left = files[2*i]
        right = files[2*i+1]
        if (_type == 'cut'):
            size = min(left.size, right.size)
            if (left.size != size):
                left = left[0:size]
            else:
                right = right[0:size]
        else:
            pass #TODO
            # size = max(left.size, right.size)
            # if (left.size != size):
            #     left = np.concatenate(left, left[0:int(size-left.size)])
            # else:
            #     right = np.concatenate(right, right[0:int(size-right.size)])

        data = np.hstack((left, right))
        answer.append(data)

    if len(files) % 2 == 1:
        empty = np.full(files[-1].size, 0, dtype=TYPE)
        data = np.hstack((files[-1], empty))
        answer.append(data)

    return answer
