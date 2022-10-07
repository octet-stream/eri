export const isAppleDevice = (): boolean => typeof window !== "undefined"
  && /Mac OS X/.test(window.navigator.userAgent)
