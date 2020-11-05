const get = (filename) => __dirname + `/${filename}`

module.exports = {
  "noGroups": get("no_recording_groups.xml"),
  "deleteSucceeded": get("recording_group_deleted.xml"),
  "recordingGroups": get("recording_groups.xml"),
  "deleteFailed_InUse": get("recording_group_in_use.xml")
}