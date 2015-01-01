'use strict';

var _ = require('lodash');
var Instagram = require('./instagram.model');

// Get list of instagrams
exports.index = function(req, res) {
  Instagram.find(function (err, instagrams) {
    if(err) { return handleError(res, err); }
    return res.json(200, instagrams);
  });
};

// Get a single instagram
exports.show = function(req, res) {
  Instagram.findById(req.params.id, function (err, instagram) {
    if(err) { return handleError(res, err); }
    if(!instagram) { return res.send(404); }
    return res.json(instagram);
  });
};

// Creates a new instagram in the DB.
exports.create = function(req, res) {
  Instagram.create(req.body, function(err, instagram) {
    if(err) { return handleError(res, err); }
    return res.json(201, instagram);
  });
};

// Updates an existing instagram in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Instagram.findById(req.params.id, function (err, instagram) {
    if (err) { return handleError(res, err); }
    if(!instagram) { return res.send(404); }
    var updated = _.merge(instagram, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, instagram);
    });
  });
};

// Deletes a instagram from the DB.
exports.destroy = function(req, res) {
  Instagram.findById(req.params.id, function (err, instagram) {
    if(err) { return handleError(res, err); }
    if(!instagram) { return res.send(404); }
    instagram.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}