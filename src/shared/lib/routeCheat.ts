const cheatCode = ['/dashboard', '/', '/dashboard', '/user'];
const history: string[] = [];

export function trackRoute(path: string): boolean {
  history.push(path);
  if (history.length > cheatCode.length) {
    history.shift();
  }

  return cheatCode.every((step, i) => step === history[i]);
}
