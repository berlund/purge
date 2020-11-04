#!/usr/bin/env node
const { erase } = require('./erase')
var argv = require('yargs/yargs')(process.argv.slice(2))
  .usage('Usage: $0 ipAddress [options]')
  .example('$0 192.168.1.11 -u user -p secret', 'Removes all recording groups with given credentials')
  .demandCommand(1)

  .alias('u', 'user')
  .nargs('u', 1)
  .describe('u', 'The username to be used to authenticate, defaults to "root"')

  .alias('p', 'pass')
  .nargs('p', 1)
  .describe('p', 'The password to be used to authenticate, defaults to "pass"')

  .help('h')
  .alias('h', 'help')
  .epilog('Purge - The Practical and Useful Recording Group Eraser')
  .argv;





(async () => {
  let address = argv._[0]
  let username = argv.user ?? "root"
  let password = argv.pass ?? "pass"

  try {
    const erasedGroups = await erase(address, username, password)
    console.log(erasedGroups)
  } catch (e) {
    console.error(`Unexpected error: ${e}`)
  }
})()










