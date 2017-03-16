import css from './css'
import GlobalStyle from '../models/GlobalStyle'

const injectGlobal = (strings, ...interpolations) => {
  const globalStyle = new GlobalStyle(css(strings, ...interpolations))
  globalStyle.generateAndInject()
}

export default injectGlobal
