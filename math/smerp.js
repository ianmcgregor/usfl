import smoothstep from './smoothstep';

export default function smoothLerp(from, to, startTime, endTime, time) {
    return from + (to - from) * smoothstep(startTime, endTime, time);
}
