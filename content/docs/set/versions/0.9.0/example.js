// create an empty set
var set = new hx.Set;

set.add('a');
set.add('b');
set.add('c');

// will log 3
console.log(set.size);

// remove an item from the set by key
set.delete('a');

// will log ['b', 'c']
console.log(set.values());

// will log [['b', 'b'], ['c', 'c']]
console.log(set.entries());

// will log ['b', 'c']
console.log(set.keys());

// removes everything from the set
set.clear();

// create a set prefilled with some values
set = new hx.Set(['a', 'b', 'c', 'd', 'e']);

// will log true
console.log(set.has('d'));

// will log false
console.log(set.has('g'));

// this will log each key and value in the set
set.forEach(function(v) {
  console.log(v)
});