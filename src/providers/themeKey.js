export const themeKey =
  process.env.NODE_ENV === 'test' ? 'theme' : Symbol('theme')
