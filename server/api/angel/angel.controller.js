'use strict';

var _ = require('lodash');
var Angel = require('./angel.model');
var request = require('request')
var async = require('async');

// angelList.init( , );

// Get AngelList data for one company
exports.getAngel = function(req, res) {
  console.log('get Angel backend');
  var company = req.params.id;
  var angelId;
  var dataJSON1;
  var dataObj = {};
  var dataJSON2;
  var dataJSON3;
  var dataJSON4;

  var getId = function(done) {
    request('https://api.angel.co/1/search?query=' + company + '&type=Startup', function(err, response, body){
      dataJSON1 = JSON.parse(body);
      angelId = dataJSON1[0].id;
      done(null, "done getting id")
    })
  }
  var getCompanyEmployessAndJobs = function(done) {
    var getCompanyInfo = function(callback){
      request('https://api.angel.co/1/startups/' + angelId, function(err, response, body){
        dataJSON2 = JSON.parse(body);
        callback();
      }), function(err) {
        if(err) console.log(err);
        callback();
      }
    };
    var getEmployees = function(callback) {
      request('https://api.angel.co/1/startup_roles?v=1&startup_id=' + angelId, function(err, response, body) {
        dataJSON3 = JSON.parse(body).startup_roles;
        callback();
      }), function(err) {
        if(err) console.log(err);
        callback();
      }
    }
    var getJobs = function(callback){
      request('https://api.angel.co/1/startups/' + angelId + '/jobs', function(err, response, body){
        dataJSON4 = JSON.parse(body);
        callback();
      }), function(err) {
        if(err) console.log(err);
        callback();
      }
    }
    async.parallel([getCompanyInfo, getEmployees, getJobs], function(err, results){
      if(err) console.log(err);
      done(null, "done getting company info, employees, and jobs")
    })
  }

  var doneTasks = function(err, results) {
    if(err) console.log(err);
    console.log(results);
    dataObj.companyInfo = dataJSON2;
    dataObj.employees = dataJSON3;
    dataObj.jobs = dataJSON4;
    res.send(dataObj);
  }
  async.series([getId, getCompanyEmployessAndJobs], doneTasks);
}

// get data for a specific user
exports.getUser = function(req, res){
  console.log('getUser backend');
  var user = req.params.id;
  var dataJSON5;
  var dataJSON6;
  var dataObj = {};

  var aboutUser = function(callback) {
    request('https://api.angel.co/1/users/' + user, function(err, response, body){
      dataJSON5 = JSON.parse(body);
      callback();
    }), function(err) {
      if (err) console.log(err);
      callback()
    }
  }

  var startupRoles = function(callback){
    request(' https://api.angel.co/1/startup_roles?v=1&user_id=' + user, function(err, response, body){
      dataJSON6 = JSON.parse(body).startup_roles;
      callback();
    }), function(err) {
      if (err) console.log(err);
      callback();
    }
  }

  async.parallel([aboutUser, startupRoles], function(err, results){
    if (err) console.log(err);
    dataObj.aboutUser = dataJSON5;
    dataObj.startupRoles = dataJSON6;
    res.send(dataObj);
  })

};

// Get list of angels
exports.index = function(req, res) {
  Angel.find(function (err, angels) {
    if(err) { return handleError(res, err); }
    return res.json(200, angels);
  });
};

// Get a single angel
exports.show = function(req, res) {
  Angel.findById(req.params.id, function (err, angel) {
    if(err) { return handleError(res, err); }
    if(!angel) { return res.send(404); }
    return res.json(angel);
  });
};

// Creates a new angel in the DB.
exports.create = function(req, res) {
  Angel.create(req.body, function(err, angel) {
    if(err) { return handleError(res, err); }
    return res.json(201, angel);
  });
};

// Updates an existing angel in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Angel.findById(req.params.id, function (err, angel) {
    if (err) { return handleError(res, err); }
    if(!angel) { return res.send(404); }
    var updated = _.merge(angel, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, angel);
    });
  });
};

// Deletes a angel from the DB.
exports.destroy = function(req, res) {
  Angel.findById(req.params.id, function (err, angel) {
    if(err) { return handleError(res, err); }
    if(!angel) { return res.send(404); }
    angel.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}