var mongoose = require("mongoose");

var shortid = require("shortid");

var config = require("../config");

shortid.seed(config.shortid_seed);

var create_shortid = function(schema, options) {
  schema.pre('save', function(next) {
    if (this.shortid == undefined) {
      this.shortid = shortid.generate();
    }
    next();
  });
};


module.exports.create_shortid = create_shortid;
