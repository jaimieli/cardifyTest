'use strict';

var _ = require('lodash');
var Angel = require('./angel.model');

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