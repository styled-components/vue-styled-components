module.exports = {
  presets: [
    "@babel/preset-env"
  ],
  comments: false,
  plugins: [
    "add-module-exports",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-class-properties"
  ]
}
