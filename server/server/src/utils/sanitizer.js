import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

const sanitizeInput = (input) => {
    const { window } = new JSDOM('');
    const purify = DOMPurify(window);
    return purify.sanitize(input);
    }

export default sanitizeInput;
