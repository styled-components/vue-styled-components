const path = require('path')
const exec = require('child_process').exec
const Express = require('express')
const watch = require('node-watch')

const srcPath = __dirname.split('/example')[0] + '/src';

const hotBuild = () => exec('npm run build:dist', (err, stdout, stderr) => {
  if (err) throw err
  if (stdout) {
    console.log(`npm run build:dist --- ${stdout}`)
  }
  if (stderr) {
    console.log(`npm run build:dist --- ${stderr}`)
  }
})

watch(srcPath, (filename) => {
  console.log(`${filename} file has changed`)
  hotBuild()
})

const app = new Express()
const port = 3000

app.use(Express.static('dist'))

app.get('/with-perf.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'with-perf.html'))
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, req.originalUrl || 'index.html'))
})

app.listen(port, error => {
  /* eslint-disable no-console */
  if (error) {
    console.error(error)
  } else {
    console.info(
      '🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.',
      port,
      port
    )
  }
  /* eslint-enable no-console */
})
