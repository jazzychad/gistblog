
/**
 * Module dependencies.
 */

var express = require('express')
, routes = require('./routes')
, auth = require('connect-auth')
, MongoStore = require('connect-mongo')(express)
, config = require('./config')
, mongoose = require('mongoose');

mongoose.connect(config.mongo_uri);

var app = express(); //module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {layout: false, pretty: false});
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: config.express_session_secret,
    store: new MongoStore({
      url: config.mongo_uri,
      db: "gistblog_sessions",
      auto_reconnect: true,
      clear_interval: 600
    }, function() {console.log("connected to mongo!");})
  }));

  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
//  app.locals.pretty = true;
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

var protect = function(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
};

var admin = function(req, res, next) {
  console.log('check 1: ' + req.session.user.is_admin);
  console.log('check 2: ' + req.session.user.userid);
  if (req.session.user && req.session.user.is_admin == true) {
    next();
  } else {
    res.redirect('/');
  }
};

var access_restricted = function(req, res, next) {
  if (!config.is_multitenant && req.session.user && req.session.user.is_admin == true) {
    next();
  } else if (config.is_multitenant && config.allowed_users && config.allowed_users.length) {
    var username = req.session.user.username.toLowerCase();
    if (config.allowed_users.indexOf(username) !== -1) {
      next();
    } else {
      res.redirect('/');
    }
  } else {
    res.redirect('/');
  }

};

// Routes

app.get('/', routes.index);

app.get('/about', routes.about);

app.get('/compose', protect, access_restricted, routes.new_post);
app.post('/compose', protect, access_restricted, routes.create_post);


app.get('/edit/:id', protect, access_restricted, routes.edit_post);
app.post('/edit/:id', protect, access_restricted, routes.update_post_gist);


app.get('/login', routes.login);
app.get('/logout', routes.logout);

app.get('/oauth/callback', routes.oauth_return);

app.post('/ajax/human_view/:id', routes.ajax_human_view);

//app.get('/p/:id', routes.bounce_shortid);
//app.get('/:id', routes.view_post);

app.get('/gist/:id', routes.view_post);
app.get('/post/:id', routes.view_post);

app.get('/user/:username', routes.user_index);

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", process.env.PORT, app.settings.env);
});
