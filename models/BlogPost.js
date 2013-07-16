var mongoose = require('mongoose');
var plugins = require("./plugins");

var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var BlogPostSchema = new Schema({

  shortid: {
    type: String,
    index: true,
    unique: true
  },
  ownerIdStr: {
    type: String
  },
  ownerUsername: {
    type: String
  },
  isDraft: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  gistIdStr: {
    type: String,
    index: true
  },
  visibility: {
    type: String,
    default: "private"
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  allowedViewers: {
    type: Array,
    default: []
  },
  draftText: {
    type: String
  },
  title: {
    type: String
  },
  tstamp: {
    type: Date,
    default: function() {
      return new Date();
    }
  },
  timestamp: {
    type: Number,
    default: function() {
      return Math.floor((+new Date())/1000);
    }
  },
  blurbText: {
    type: String
  }
});

BlogPostSchema.plugin(plugins.create_shortid);

var BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports.BlogPost = BlogPost;


