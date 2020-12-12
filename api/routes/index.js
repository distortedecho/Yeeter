const express = require('express');
const app = express();
const Router = express.Router();
const user = require('../controller/login-signup-controller');
const tweets = require('../controller/tweets-controller');

Router
.route('/create')
.post(user.user);

Router
.route('/login')
.post(user.login);

Router
.route('/tweet')
.post(user.authorize,tweets.Addtweet);

Router
.route('/like')
.post(user.authorize,tweets.Like);

Router
.route('/comment')
.post(user.authorize,tweets.Comment);

Router
.route('/showall')
.get(user.authorize,tweets.show);

Router
.route('/update')
.get(user.authorize,tweets.update);

module.exports = Router;