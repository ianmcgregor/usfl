import removeExtraWhitespace from './removeExtraWhitespace';

// whether str contains any text
export default function hasText(str) {
    return !!removeExtraWhitespace(str).length;
}
