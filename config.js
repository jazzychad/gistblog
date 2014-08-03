module.exports.sitename = process.env.SITE_NAME || "gistblog";
module.exports.title = "home";

module.exports.is_multitenant = parseInt(process.env.GISTBLOG_IS_MULTITENANT, 0);

var allowed_users = process.env.GISTBLOG_ALLOWED_USERS;
if (allowed_users && allowed_users.length) {
  module.exports.allowed_users = allowed_users.split(',');
} else {
  module.exports.allowed_users = null;
}

module.exports.admin_userid = process.env.ADMIN_USERID;

module.exports.siteurl = process.env.SITEURL;

module.exports.mongo_uri = process.env.MONGOLAB_URI;
module.exports.redis_uri = process.env.REDISTOGO_URL;

module.exports.gh_consumer_key = process.env.GH_CONSUMER_KEY;
module.exports.gh_consumer_secret = process.env.GH_CONSUMER_SECRET;
module.exports.gh_application_access_token = process.env.GH_APPLICATION_ACCESS_TOKEN;
module.exports.gh_callback = process.env.GH_CALLBACK;

module.exports.express_session_secret = process.env.EXPRESS_SESSION_SECRET;

module.exports.shortid_seed = process.env.SHORTID_SEED;

module.exports.ga_id = process.env.GA_ID;
module.exports.ga_domain = process.env.GA_DOMAIN;