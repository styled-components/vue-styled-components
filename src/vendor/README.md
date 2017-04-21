Vendored glamor/sheet.js as of [582dde4](https://github.com/threepointone/glamor/blob/582dde44713bcbe9212a961706c06a34a4ebccb0/src/sheet.js)

Then hacked things around:

* Deleted `previous-map.js` and all references to it because it `require('fs')`ed
* Made `StyleSheet.insert()` return something with an `update()` method
* Replaced nested `require` statements with `import` declarations for the sake of a leaner bundle. This entails adding empty imports to three files to guarantee correct ordering – see https://github.com/styled-components/styled-components/pull/100
