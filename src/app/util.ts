export function getSearchParam(search: string, paramKey: string) {
  const query = search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair[0] === paramKey) {
      return pair[1];
    }
  }
  return null;
}
