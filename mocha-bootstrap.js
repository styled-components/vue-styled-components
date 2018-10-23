// jsdom setup must be done before importing Vue
import jsdom from 'jsdom-global'
jsdom()
process.env.NODE_ENV = 'test'
