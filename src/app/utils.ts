export function insertText(textarea: HTMLTextAreaElement, prefix = '', text = '', suffix = '') {
  textarea.focus();
  if (typeof textarea.selectionStart !== 'number' || typeof textarea.selectionEnd !== 'number') {
    alert('浏览器版本过低');
    return;
  }

  const start = textarea.selectionStart;
  if (textarea.selectionStart === textarea.selectionEnd) {
    insert(textarea, start, prefix + text + suffix);
    textarea.selectionStart = start + prefix.length;
    textarea.selectionEnd = textarea.selectionStart + text.length;
  } else {
    let end = textarea.selectionEnd;
    insert(textarea, start, prefix);
    textarea.selectionStart = start + prefix.length;
    end = end + prefix.length;
    insert(textarea, end, suffix);
    textarea.selectionEnd = end;
  }
  textarea.focus();
}

const insert = (textarea: HTMLTextAreaElement, index: number, text: string) => {
  const tmpValue = textarea.value;
  textarea.value = tmpValue.substring(0, index) + text + tmpValue.substring(index, tmpValue.length);
};
