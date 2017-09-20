import removeExtraWhitespace from './remove-extra-whitespace';

// whether str contains any text
export default function hasText(str) {
    return !!removeExtraWhitespace(str).length;
}
