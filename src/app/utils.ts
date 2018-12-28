export function insertText(textarea: HTMLTextAreaElement, prefix = '', text = '', suffix = '') {
  textarea.focus();
  if (typeof textarea.selectionStart !== 'number' || typeof textarea.selectionEnd !== 'number') {
    alert('浏览器版本过低');
    return;
  }

  if (textarea.selectionStart === textarea.selectionEnd) {
    const tmpValue = textarea.value;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    textarea.value = tmpValue.substring(0, start) + prefix + text + suffix + tmpValue.substring(end, tmpValue.length);
    textarea.selectionStart = start + prefix.length;
    textarea.selectionEnd = textarea.selectionStart + text.length;
  } else {
    // todo
  }
  textarea.focus();
}

function insert(textarea: HTMLTextAreaElement, index: number, text: string) {
  const tmpValue = textarea.value;
  textarea.value = tmpValue.substring(0, index) + text + tmpValue.substring(index, tmpValue.length);
}
