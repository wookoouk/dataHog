var thinky = require('../lib/thinky.js');
var type = thinky.type;
var r = thinky.r;

var util = require('../lib/util');

var Read = thinky.createModel('Read', {
  id: type.string(),
  runID: type.string().required(),
  name: type.string().required(),
  MD5: type.string().required(),
  fastQCLocation: type.string().required(),
  moreInfo: type.string().required(),

  safeName: type.string()
});

Read.pre('save', function (next) {
  var read = this;
  var unsafeName = read.name;
  Read.run().then(function (result) {
    util.generateSafeName(unsafeName, result, function (name) {
      read.safeName = name;
      next();
    });
  });
});

module.exports = Read;

var Run = require('./run.js');
Read.belongsTo(Run, 'run', 'runID', 'id');