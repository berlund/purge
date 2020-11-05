const expect = require('chai').expect;
const nock = require('nock');

const { erase } = require('../erase');
const responses = require('./responses');

const ip = "192.168.2.22"

const group1 = 'High_ACCC8E8929E6_0_M'
const group2 = 'High_ACCC8E8929E6_0_C'
const group3 = 'Low_ACCC8E8929E6_0_M'
const group4 = 'Low_ACCC8E8929E6_0_C'


describe('Test no recording groups exist', () => {
  beforeEach(() => {
    nock(`http://${ip}`)
      .get('/axis-cgi/record/recording_group/list.cgi?schemaversion=1')
      .replyWithFile(200, responses.noGroups)
  })

  it('No recording group should be deleted', () => {
    return erase(ip)
      .then(response => {
        //expect an object back
        expect(typeof response).to.equal('object');

        //Should return an empty list of removed recording groups
        expect(response.length).to.equal(0)
      });
  });
});

describe('Test with existing recording groups', () => {
  beforeEach(() => {
    nock(`http://${ip}`)
      .get('/axis-cgi/record/recording_group/list.cgi?schemaversion=1')
      .replyWithFile(200,responses.recordingGroups)
  })

  it('No recording group should be deleted if in use', () => {

    nock(`http://${ip}`)
      .get(`/axis-cgi/record/recording_group/delete.cgi?schemaversion=1&recordinggroupid=${group1}`)
      .replyWithFile(200, responses.deleteFailed_InUse)
      .get(`/axis-cgi/record/recording_group/delete.cgi?schemaversion=1&recordinggroupid=${group2}`)
      .replyWithFile(200, responses.deleteFailed_InUse)
      .get(`/axis-cgi/record/recording_group/delete.cgi?schemaversion=1&recordinggroupid=${group3}`)
      .replyWithFile(200, responses.deleteFailed_InUse)
      .get(`/axis-cgi/record/recording_group/delete.cgi?schemaversion=1&recordinggroupid=${group4}`)
      .replyWithFile(200, responses.deleteFailed_InUse)

    return erase(ip)
      .then(response => {
        //expect an object back
        expect(typeof response).to.equal('object');

        //Should return an empty list of removed recording groups
        expect(response.length).to.equal(0)
      });
  });

  it('All recording groups should be deleted when not in use', () => {

    nock(`http://${ip}`)
      .get(`/axis-cgi/record/recording_group/delete.cgi?schemaversion=1&recordinggroupid=${group1}`)
      .replyWithFile(200, responses.deleteSucceeded)
      .get(`/axis-cgi/record/recording_group/delete.cgi?schemaversion=1&recordinggroupid=${group2}`)
      .replyWithFile(200, responses.deleteSucceeded)
      .get(`/axis-cgi/record/recording_group/delete.cgi?schemaversion=1&recordinggroupid=${group3}`)
      .replyWithFile(200, responses.deleteSucceeded)
      .get(`/axis-cgi/record/recording_group/delete.cgi?schemaversion=1&recordinggroupid=${group4}`)
      .replyWithFile(200, responses.deleteSucceeded)

    return erase(ip)
      .then(response => {
        //expect an object back
        expect(typeof response).to.equal('object');

        //Should return a list with all 4 recording groups that have been deleted
        expect(response.length).to.equal(4)
        expect(response.includes(group1))
        expect(response.includes(group2))
        expect(response.includes(group3))
        expect(response.includes(group4))
      });
  });

  it('Only reording groups not in use should be deleted', () => {

    // Group2 will be in use and shouldn't be deleted
    nock(`http://${ip}`)
      .get(`/axis-cgi/record/recording_group/delete.cgi?schemaversion=1&recordinggroupid=${group1}`)
      .replyWithFile(200, responses.deleteSucceeded)
      .get(`/axis-cgi/record/recording_group/delete.cgi?schemaversion=1&recordinggroupid=${group2}`)
      .replyWithFile(200, responses.deleteFailed_InUse)
      .get(`/axis-cgi/record/recording_group/delete.cgi?schemaversion=1&recordinggroupid=${group3}`)
      .replyWithFile(200, responses.deleteSucceeded)
      .get(`/axis-cgi/record/recording_group/delete.cgi?schemaversion=1&recordinggroupid=${group4}`)
      .replyWithFile(200, responses.deleteSucceeded)

    return erase(ip)
      .then(response => {
        //expect an object back
        expect(typeof response).to.equal('object');

        //Should return a list with all 4 recording groups that have been deleted
        expect(response.length).to.equal(3)
        expect(response.includes(group1))
        expect(response.includes(group3))
        expect(response.includes(group4))
      });
  });
});