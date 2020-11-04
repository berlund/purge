var urllib = require('urllib');
const { parse } = require('./parse')


// TODO: should be taken as in param
const address = '10.0.30.50'
const user = 'root'
const password = 'pass'


const debug = (msg, obj) => {
  //TODO: make debug configurable
  return
  console.log(`${msg} ${obj ? ': ' + JSON.stringify(obj, null, 2) : ''}`)
}

async function erase(address, username, password) {

  // TODO: some input validation
  let url = `http://${address}/axis-cgi/record/recording_group/list.cgi?schemaversion=1`
  let deleteUrl = `http://${address}/axis-cgi/record/recording_group/delete.cgi?schemaversion=1`
  let authentication = { digestAuth: `${username}:${password}` }

  try {
    const listResponse = await urllib.request(url, authentication)

    debug("Listing recording groups", listResponse.statusCode);
    let xmlData = listResponse.data.toString()
    let recordingGroupsReply = parse(xmlData)

    let groups = recordingGroupsReply.RecordingGroupResponse?.ListSuccess?.RecordingGroup
    if (!groups) {
      debug("No groups to delete")
      return []
    }

    const tasks = groups.map(async g => {
      let rgid = g.RecordingGroupId
      debug(`Will delete ${rgid}`)
      let options = {
        dataAsQueryString: true,
        data: {
          recordinggroupid: rgid
        },
        digestAuth: `${username}:${password}` //TODO: fix me
      }

      const deleteResponse = await urllib.request(deleteUrl, options)
        .catch(e => {
          console.error(`Error: ${e}`)
          return
        });

      debug(`Deleted`, deleteResponse.status);
      let body = parse(deleteResponse.data.toString());
      let deleteError = body?.RecordingGroupResponse?.GeneralError

      if (deleteError) {
        console.log(`Could not delete recording group ${rgid} due to error ${deleteError.ErrorCode}: ${deleteError.ErrorDescription}`);
      } else {
        console.log(`Deleted recording group ${rgid}`)
        return rgid
      }

    })

    let results = await Promise.all(tasks)
    return results.filter(e => e != undefined)

  } catch (e) {
    console.error(`Error: ${e}`)
    return
  };
}

exports.erase = erase


