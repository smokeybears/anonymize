let fs = require('fs')
let anonymizer = require('./anonymizer')
let userData = require('./smithrx-claims-input')

let outputFd = fs.openSync(`${__dirname}/anonymized-claims-output.json`, 'a')
anonymizer.writeBulk(outputFd, userData)
// or 
// outputFd = fs.openSync(`${__dirname}/anonymized-claims-output.json`, 'a')
// let anonymizer.writeMemoryConscious(outputFd, userData)

