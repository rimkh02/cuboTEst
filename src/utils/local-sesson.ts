export function setSession(_token: string) {
  localStorage.setItem('_token', _token);
}
export function getLocalSession() {
  const _token: any = localStorage.getItem('_token');
  return _token;
}
