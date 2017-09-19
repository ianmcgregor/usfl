import smoothstep from './smoothstep';

export default function smerp(from, to, startTime, endTime, time) {
    return from + (to - from) * smoothstep(startTime, endTime, time);
}
