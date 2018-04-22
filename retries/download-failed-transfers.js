/* Some older file names with unusual characters are difficult to download over FTP
   This script manually downloads files over HTTPS based on an input list

  To get running, first run:
    npm install promise-path
    mkdir temp
  then:
    node download-failed-transfers.js

  AUTHOR: John Beech aka Markavian
  GITHUB: https://github.com/df-map-archive
  LICENSE: ISC
*/

const {fetch, write} = require('promise-path')

const failedTransfers = require('./failed-transfers.json')

const mapsPath = 'https://mkv25.net/dfma/maps-archived/'

const queue = [].concat(failedTransfers)

processQueue()

function processQueue() {
  if (queue.length > 0) {
    downloadNextFile()
  }
}

function downloadNextFile() {
  const file = queue.shift()
  console.log('Downloading', file)
  const url = [mapsPath, file].join('')
  fetch({url, encoding: null})
    .then((result) => write(`temp/${file}`, result))
    .then(processQueue)
    .catch(processQueue)
    .then(() => console.log('Downloaded', file, ' [NEXT]'))
}
