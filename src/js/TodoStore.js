var Reflux = require('reflux');
var TodoActions = require('./TodoActions');

// some variables and helpers for our fake database stuff
var todoCounter = 0;
var localStorageKey = 'targets';

function getItemByKey(list, itemKey) {
  return _.find(list, function (item) {
    return item.key === itemKey;
  });
}

var todoListStore = Reflux.createStore({

  listenables: [todoActions],

  onAddItem: function (label) {
    this.updateList([{
      key: todoCounter++,
      created: new Date(),
      isComplete: false,
      label: label
    }].concat(this.list));
  },

  /*
  onEditItem: function (itemKey, newLabel) {
    var foundItem = getItemByKey(this.list, itemKey);
    if (!foundItem) {
      return;
    }
    foundItem.label = newLabel;
    this.updateList(this.list);
  },
  onRemoveItem: function (itemKey) {
    this.updateList(_.filter(this.list,function (item){
      return item.key!==itemKey;
    }));
  },
  onToggleItem: function (itemKey) {
    var foundItem = getItemByKey(this.list,itemKey);
    if (foundItem) {
      foundItem.isComplete = !foundItem.isComplete;
      this.updateList(this.list);
    }
  },
  onToggleAllItems: function (checked) {
    this.updateList(_.map(this.list, function (item) {
      item.isComplete = checked;
      return item;
    }));
  },
  onClearCompleted: function () {
    this.updateList(this.list.filter(function (item) {
      return !item.isComplete;
    }));
  },
  */

  updateList: function (list) {
    localStorage.setItem(localStorageKey, JSON.stringify(list));
    // if we used a real database, we would likely do the below in a callback
    this.list = list;
    this.trigger(list); // sends the updated list to all listening components (TodoApp)
  },

  // this will be called by all listening components as they register their listeners
  getInitialState: function () {
    var loadedList = localStorage.getItem(localStorageKey);
    if (!loadedList) {
      // TODO ~~RJS: Do we really need this?
      // If no list is in localstorage, start out with a default one
      this.list = [{
        key: todoCounter++,
        created: new Date(),
        isComplete: false,
        label: 'Rule the web'
      }];
    } else {
      this.list = _.map(JSON.parse(loadedList), function (item) {
        // just resetting the key property for each todo item
        item.key = todoCounter++;
        return item;
      });
    }
    return this.list;
  }
});

module.exports = todoListStore;
