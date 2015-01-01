/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Instagram = require('./instagram.model');

exports.register = function(socket) {
  Instagram.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Instagram.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('instagram:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('instagram:remove', doc);
}