/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Angel = require('./angel.model');

exports.register = function(socket) {
  Angel.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Angel.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('angel:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('angel:remove', doc);
}