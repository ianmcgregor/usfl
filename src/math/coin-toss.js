export default function coinToss(heads = true, tails = false) {
    return Math.random() > 0.5 ? heads : tails;
}
