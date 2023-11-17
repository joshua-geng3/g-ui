/* istanbul ignore */
export function isPlatformMac(): boolean {
  return /(mac\sos|macintosh)/i.test(navigator.appVersion);
}
