var React = require('react');

var Task = React.createClass({
  clearTask: function () {
    this.props.clearTask(this.props.key);
  },

  render: function () {
    return <li>
      {this.props.children}
      <button onClick={this.clearTask}>X</button>
    </li>;
  }
});

module.exports = Task;
