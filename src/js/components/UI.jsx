var React = require('react');
var Task = require('./Task.jsx');

var UI = React.createClass({
  getInitialState: function () {
    return {
      numTasks: 3,
      tasks: ['Task one', 'task 2', 't3']
    };
  },

  handleResize: function () {
    clearTimeout(this.resizer);
    this.resizer = setTimeout((function () {
      this.setState({
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth
      });
    }).bind(this), 200);
  },

  componentDidMount: function() {
    this.setState(JSON.parse(localStorage.getItem('state')));
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },

  componentDidUpdate: function (prevProps, prevState) {
    localStorage.setItem('state', JSON.stringify(this.state));
  },

  clearTask: function (i) {
    var tasks = this.state.tasks;
    tasks[i] = undefined;
    this.setState({ tasks: tasks });
  },

  render: function () {
    return (
      <div>
        <p>What are the three most important things you can do today?</p>
        <ol>
          {this.state.tasks.map((function (task, i) {
            return <Task key={i} clearTask={this.clearTask}>{task}</Task>;
          }).bind(this))}
        </ol>
      </div>
    );
  }
});

module.exports = UI;
