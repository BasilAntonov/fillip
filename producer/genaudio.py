import numpy as np

SAMPLERATE = 1000


def gen_pattern_name(data):
    data['name'] = str(data['time']) + 't' + str(data['duty_cycle']) + 'o' + str(data['number_pulses']) + 'p' + str(data['interval']) + 'i' + str(data['number']) + 'n'
    return


def gen_pattern(data):
    omega = float(data['duty_cycle'])
    tau = np.full(int(SAMPLERATE * float(data['interval'])), 0, dtype=np.uint8)

    T_sample = SAMPLERATE * float(data['time'])
    t = np.full(int(T_sample * omega), np.iinfo(np.uint8).max, dtype=np.uint8)
    T_interval = np.full(int(T_sample * (1 - omega)), 0, dtype=np.uint8)
    T = np.concatenate((t, T_interval))

    for i in range(int(data['number_pulses'])):
        T = np.concatenate((T, T))

    answer = np.concatenate((T, tau))
    for i in range(int(data['number'])):
        answer = np.concatenate((answer, answer))

    return answer


def gen_mono(patterns):
    pass


def gen_file(files):
    pass
