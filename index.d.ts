import * as Vue from 'vue'

type Component = Vue.Component | Vue.DefineComponent

type KnownHTMLElement = keyof IntrinsicElementAttributes

interface DefaultTheme {
  [key: string]: any
}

interface PropDef {
  [key: string]: Vue.Prop<unknown>
}

interface ExtensibleObject {
  [key: string]: any
}

interface InterpolateFunction<Props = any> {
  (props: { theme: DefaultTheme } & Vue.ExtractPropTypes<Props>):
    | string
    | { toString: () => string }
}

interface TemplateFunction<Props, K extends KnownHTMLElement = any> {
  (
    str: TemplateStringsArray,
    ...interpolations: (string | InterpolateFunction<Props>)[]
  ): Vue.DefineComponent<
    Vue.ExtractPropTypes<Props> & IntrinsicElementAttributes[K]
  >
}

interface AttrFunction<Props> {
  (
    attrs: { theme: DefaultTheme } & Vue.ExtractPropTypes<Props>
  ): ExtensibleObject
}

interface Attrs<Props, K extends KnownHTMLElement = any> {
  (fn: AttrFunction<Props> | ExtensibleObject): {
    attrs: Attrs<Props, K>
  } & TemplateFunction<Props, K>
}

interface ImplicitPropsAttrs<K extends KnownHTMLElement = any> {
  <Props>(fn: AttrFunction<Props> | ExtensibleObject): {
    attrs: Attrs<Props, K>
  } & TemplateFunction<Props, K>
}

type StyledHTMLElement = {
  [K in KnownHTMLElement]: { attrs: ImplicitPropsAttrs<K> } & ((
    str: TemplateStringsArray,
    ...interpolations: (string | InterpolateFunction)[]
  ) => Vue.DefineComponent<IntrinsicElementAttributes[K]>)
}

type StyledHTMLElementFunction = {
  <Props = PropDef, K extends KnownHTMLElement = any>(
    component: K,
    props?: Props
  ): { attrs: Attrs<Props, K> } & TemplateFunction<Props, K>
}

type StyledVueComponent = {
  <Props, T extends Component>(component: T): (
    str: TemplateStringsArray,
    ...interpolations: (string | InterpolateFunction<Props>)[]
  ) => Vue.DefineComponent<Props> & T
}

interface IntrinsicElementAttributes {
  a: Vue.AnchorHTMLAttributes
  abbr: Vue.HTMLAttributes
  address: Vue.HTMLAttributes
  area: Vue.AreaHTMLAttributes
  article: Vue.HTMLAttributes
  aside: Vue.HTMLAttributes
  audio: Vue.AudioHTMLAttributes
  b: Vue.HTMLAttributes
  base: Vue.BaseHTMLAttributes
  bdi: Vue.HTMLAttributes
  bdo: Vue.HTMLAttributes
  blockquote: Vue.BlockquoteHTMLAttributes
  body: Vue.HTMLAttributes
  br: Vue.HTMLAttributes
  button: Vue.ButtonHTMLAttributes
  canvas: Vue.CanvasHTMLAttributes
  caption: Vue.HTMLAttributes
  cite: Vue.HTMLAttributes
  code: Vue.HTMLAttributes
  col: Vue.ColHTMLAttributes
  colgroup: Vue.ColgroupHTMLAttributes
  data: Vue.DataHTMLAttributes
  datalist: Vue.HTMLAttributes
  dd: Vue.HTMLAttributes
  del: Vue.DelHTMLAttributes
  details: Vue.DetailsHTMLAttributes
  dfn: Vue.HTMLAttributes
  dialog: Vue.DialogHTMLAttributes
  div: Vue.HTMLAttributes
  dl: Vue.HTMLAttributes
  dt: Vue.HTMLAttributes
  em: Vue.HTMLAttributes
  embed: Vue.EmbedHTMLAttributes
  fieldset: Vue.FieldsetHTMLAttributes
  figcaption: Vue.HTMLAttributes
  figure: Vue.HTMLAttributes
  footer: Vue.HTMLAttributes
  form: Vue.FormHTMLAttributes
  h1: Vue.HTMLAttributes
  h2: Vue.HTMLAttributes
  h3: Vue.HTMLAttributes
  h4: Vue.HTMLAttributes
  h5: Vue.HTMLAttributes
  h6: Vue.HTMLAttributes
  head: Vue.HTMLAttributes
  header: Vue.HTMLAttributes
  hgroup: Vue.HTMLAttributes
  hr: Vue.HTMLAttributes
  html: Vue.HtmlHTMLAttributes
  i: Vue.HTMLAttributes
  iframe: Vue.IframeHTMLAttributes
  img: Vue.ImgHTMLAttributes
  input: Vue.InputHTMLAttributes
  ins: Vue.InsHTMLAttributes
  kbd: Vue.HTMLAttributes
  keygen: Vue.KeygenHTMLAttributes
  label: Vue.LabelHTMLAttributes
  legend: Vue.HTMLAttributes
  li: Vue.LiHTMLAttributes
  link: Vue.LinkHTMLAttributes
  main: Vue.HTMLAttributes
  map: Vue.MapHTMLAttributes
  mark: Vue.HTMLAttributes
  menu: Vue.MenuHTMLAttributes
  meta: Vue.MetaHTMLAttributes
  meter: Vue.MeterHTMLAttributes
  nav: Vue.HTMLAttributes
  noindex: Vue.HTMLAttributes
  noscript: Vue.HTMLAttributes
  object: Vue.ObjectHTMLAttributes
  ol: Vue.OlHTMLAttributes
  optgroup: Vue.OptgroupHTMLAttributes
  option: Vue.OptionHTMLAttributes
  output: Vue.OutputHTMLAttributes
  p: Vue.HTMLAttributes
  param: Vue.ParamHTMLAttributes
  picture: Vue.HTMLAttributes
  pre: Vue.HTMLAttributes
  progress: Vue.ProgressHTMLAttributes
  q: Vue.QuoteHTMLAttributes
  rp: Vue.HTMLAttributes
  rt: Vue.HTMLAttributes
  ruby: Vue.HTMLAttributes
  s: Vue.HTMLAttributes
  samp: Vue.HTMLAttributes
  script: Vue.ScriptHTMLAttributes
  section: Vue.HTMLAttributes
  select: Vue.SelectHTMLAttributes
  small: Vue.HTMLAttributes
  source: Vue.SourceHTMLAttributes
  span: Vue.HTMLAttributes
  strong: Vue.HTMLAttributes
  style: Vue.StyleHTMLAttributes
  sub: Vue.HTMLAttributes
  summary: Vue.HTMLAttributes
  sup: Vue.HTMLAttributes
  table: Vue.TableHTMLAttributes
  template: Vue.HTMLAttributes
  tbody: Vue.HTMLAttributes
  td: Vue.TdHTMLAttributes
  textarea: Vue.TextareaHTMLAttributes
  tfoot: Vue.HTMLAttributes
  th: Vue.ThHTMLAttributes
  thead: Vue.HTMLAttributes
  time: Vue.TimeHTMLAttributes
  title: Vue.HTMLAttributes
  tr: Vue.HTMLAttributes
  track: Vue.TrackHTMLAttributes
  u: Vue.HTMLAttributes
  ul: Vue.HTMLAttributes
  var: Vue.HTMLAttributes
  video: Vue.VideoHTMLAttributes
  wbr: Vue.HTMLAttributes
  webview: Vue.WebViewHTMLAttributes
  svg: Vue.SVGAttributes
  animate: Vue.SVGAttributes
  animateMotion: Vue.SVGAttributes
  animateTransform: Vue.SVGAttributes
  circle: Vue.SVGAttributes
  clipPath: Vue.SVGAttributes
  defs: Vue.SVGAttributes
  desc: Vue.SVGAttributes
  ellipse: Vue.SVGAttributes
  feBlend: Vue.SVGAttributes
  feColorMatrix: Vue.SVGAttributes
  feComponentTransfer: Vue.SVGAttributes
  feComposite: Vue.SVGAttributes
  feConvolveMatrix: Vue.SVGAttributes
  feDiffuseLighting: Vue.SVGAttributes
  feDisplacementMap: Vue.SVGAttributes
  feDistantLight: Vue.SVGAttributes
  feDropShadow: Vue.SVGAttributes
  feFlood: Vue.SVGAttributes
  feFuncA: Vue.SVGAttributes
  feFuncB: Vue.SVGAttributes
  feFuncG: Vue.SVGAttributes
  feFuncR: Vue.SVGAttributes
  feGaussianBlur: Vue.SVGAttributes
  feImage: Vue.SVGAttributes
  feMerge: Vue.SVGAttributes
  feMergeNode: Vue.SVGAttributes
  feMorphology: Vue.SVGAttributes
  feOffset: Vue.SVGAttributes
  fePointLight: Vue.SVGAttributes
  feSpecularLighting: Vue.SVGAttributes
  feSpotLight: Vue.SVGAttributes
  feTile: Vue.SVGAttributes
  feTurbulence: Vue.SVGAttributes
  filter: Vue.SVGAttributes
  foreignObject: Vue.SVGAttributes
  g: Vue.SVGAttributes
  image: Vue.SVGAttributes
  line: Vue.SVGAttributes
  linearGradient: Vue.SVGAttributes
  marker: Vue.SVGAttributes
  mask: Vue.SVGAttributes
  metadata: Vue.SVGAttributes
  mpath: Vue.SVGAttributes
  path: Vue.SVGAttributes
  pattern: Vue.SVGAttributes
  polygon: Vue.SVGAttributes
  polyline: Vue.SVGAttributes
  radialGradient: Vue.SVGAttributes
  rect: Vue.SVGAttributes
  stop: Vue.SVGAttributes
  switch: Vue.SVGAttributes
  symbol: Vue.SVGAttributes
  text: Vue.SVGAttributes
  textPath: Vue.SVGAttributes
  tspan: Vue.SVGAttributes
  use: Vue.SVGAttributes
  view: Vue.SVGAttributes
}

export type Styled = StyledHTMLElementFunction &
  StyledHTMLElement &
  StyledVueComponent

export const ThemeProvider: Vue.DefineComponent<DefaultTheme>
export const css: (css: TemplateStringsArray) => string
export const keyframes: (css: TemplateStringsArray) => string
export const injectGlobal: (
  css: TemplateStringsArray,
  ...interpolations: string[]
) => void
export const styled: Styled

export default styled

/**
 * Override DefaultTheme to get accurate typings for your project.
 *
 * ```
 * import Theme from './theme';
 *
 * type ThemeType = typeof Theme;
 *
 * declare module "vue-styled-components" {
 *  export interface DefaultTheme extends ThemeType {}
 * }
 * ```
 */
export { DefaultTheme }
