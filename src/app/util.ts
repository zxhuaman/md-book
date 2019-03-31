/*export function getSearchParam(search: string, paramKey: string) {
  const query = search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair[0] === paramKey) {
      return pair[1];
    }
  }
  return null;
}*/


import Constant from './constants';

function download(content, type, name) {
  let blob;
  if (typeof window.Blob === 'function') {
    blob = new Blob([content], {type: type});
  } else {
    // @ts-ignore
    const BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder;
    const bb = new BlobBuilder();
    bb.append(content);
    blob = bb.getBlob(type);
  }
  // @ts-ignore
  const URL = window.URL || window.webkitURL;
  const blobUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  if ('download' in anchor) {
    anchor.style.visibility = 'hidden';
    anchor.href = blobUrl;
    anchor.download = name;
    document.body.appendChild(anchor);
    const evt = document.createEvent('MouseEvents');
    evt.initEvent('click', true, true);
    anchor.dispatchEvent(evt);
    document.body.removeChild(anchor);
  } else if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, name);
  } else {
    location.href = blobUrl;
  }
}


function getWordCount(content: string): number {
  let count = 0;
  try {
    content = content.replace(/(\r\n+|\s+|　+)/g, '龘');
    content = content.replace(/[\x00-\xff]/g, 'm');
    content = content.replace(/m+/g, '*');
    content = content.replace(/龘+/g, '');
    count = content.length;
  } catch (e) {

  }
  return count;
}

function assembleHtml(title: string, content: string) {
  return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>${Constant.contents_css}</style>
        <style>${Constant.highlight_css}</style>
    </head>
    <body>
    <div class="content">
      ${content}
    </div>
    </body>
    </html>`;
}

export {download, getWordCount, assembleHtml};
