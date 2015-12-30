/** @jsx React.DOM */

var React = require('react');
var Reflux = require('reflux');
var UI = require('./components/UI.jsx');

// reflux configuration
Reflux.nextTick(require('setimmediate'));

React.render(
  <UI />,
  document.getElementById('app-container')
);
