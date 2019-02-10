export function insertText(textarea: HTMLTextAreaElement, prefix = '', text = '', suffix = ''): void {
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

export const insert = (textarea: HTMLTextAreaElement, index: number, text: string) => {
  const tmpValue = textarea.value;
  textarea.value = tmpValue.substring(0, index) + text + tmpValue.substring(index, tmpValue.length);
};

export function toggleFullScreen(): void {
  // @ts-ignore
  if (!document.fullscreenElement &&
    // @ts-ignore
    !document.mozFullScreenElement && !document.webkitFullscreenElement) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
      // @ts-ignore
    } else if (document.documentElement.mozRequestFullScreen) {
      // @ts-ignore
      document.documentElement.mozRequestFullScreen();
      // @ts-ignore
    } else if (document.documentElement.webkitRequestFullscreen) {
      // @ts-ignore
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    // @ts-ignore
    if (document.cancelFullScreen) {
      // @ts-ignore
      document.cancelFullScreen();
      // @ts-ignore
    } else if (document.mozCancelFullScreen) {
      // @ts-ignore
      document.mozCancelFullScreen();
      // @ts-ignore
    } else if (document.webkitCancelFullScreen) {
      // @ts-ignore
      document.webkitCancelFullScreen();
    }
  }
}

export function isFullScreen(): boolean {
  // @ts-ignore
  return document.fullscreenElement ||
    // @ts-ignore
    document.mozFullScreenElement || document.webkitFullscreenElement;
}

export function getSearchParam(search: string, paramKey: string) {
  const query = search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair[0] === paramKey) {
      return pair[1];
    }
  }
  return (false);
}
