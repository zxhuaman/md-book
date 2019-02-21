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

export default function download(content, type, name) {
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
