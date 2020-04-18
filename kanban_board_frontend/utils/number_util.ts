let positiveNumRegExp = new RegExp(/^[0-9]+(\.[0-9]+)?$/);
export function isPositiveInteger(numStr: string): boolean {
  return positiveNumRegExp.test(numStr);
}
