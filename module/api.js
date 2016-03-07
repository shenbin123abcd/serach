/**
 * Created by wtwei on 2015/11/17.
 */
var Promise = require("bluebird");
var request = Promise.promisifyAll(require("request"));
var config = require('../config');
var querystring = require('querystring');
var api = {};


module.exports = api;