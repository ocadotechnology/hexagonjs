// create an empty list
var list = new hx.List;

list.add(2);
list.add(4);
list.add(6);

// will log 3
console.log(list.size);

// remove an item from the list by position
list.delete(1);

// will log [2, 6]
console.log(list.values());

// remove the an item from the list by value
list.remove(6);

// will log [2]
console.log(list.values());

// removes everything from the list
list.clear();

// create a list prefilled with some values
list = new hx.List([1, 1, 2, 3, 3, 3, 4, 4, 5, 6]);

// remove all the 3's from the list
list.removeAll(3);

// will log [1, 1, 2, 4, 4, 5, 6]
console.log(list.values());

// will log false
console.log(list.has(3));

// will log true
console.log(list.has(4));

// get a value by position. this will log 4
console.log(list.get(3));