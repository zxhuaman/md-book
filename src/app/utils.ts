import {Insertion} from './insertion';

export function insertText(textarea: HTMLTextAreaElement, insertion: Insertion) {
  textarea.focus();
  if (typeof textarea.selectionStart !== 'number' || typeof textarea.selectionEnd !== 'number') {
    alert('浏览器版本过低');
    return;
  }

  const start = textarea.selectionStart;
  if (textarea.selectionStart === textarea.selectionEnd) {
    insert(textarea, start, insertion.prefix + insertion.text + insertion.suffix);
    textarea.selectionStart = start + insertion.prefix.length;
    textarea.selectionEnd = textarea.selectionStart + insertion.text.length;
  } else {
    let end = textarea.selectionEnd;
    insert(textarea, start, insertion.prefix);
    textarea.selectionStart = start + insertion.prefix.length;
    end = end + insertion.prefix.length;
    insert(textarea, end, insertion.suffix);
    textarea.selectionEnd = end;
  }
  textarea.focus();
}

function insert(textarea: HTMLTextAreaElement, index: number, text: string) {
  const tmpValue = textarea.value;
  textarea.value = tmpValue.substring(0, index) + text + tmpValue.substring(index, tmpValue.length);
}
