## General

Avoid any features in ES6 that are not supported by buble:
https://buble.surge.sh/guide/#unsupported-features

## Const vs Let

Always prefer using `const`. Only use `let` when you absolutely have to.

## Functions


### Prefer named functions

This keeps it clear that things are functions (rather than something else),
creates better error messages when things go wrong, and is shorter to write.

**Bad**

    const bob = () => {

    }

**Good**

    function bob () {

    }


### Prefer arrow functions for anonymous functions

**Bad**

    array.map(function (person) {
      return person.name
    })

**Good**

    array.map(person => person.name)


### Prefer no argument parenthesis for single argument arrow functions

**Bad**

    array.map((person) => person.name)

**Good**

    array.map(person => person.name)

The same applies for multi-line functions:

**Bad**

    array.map((person) => {
      return person.name
    })

**Good**

    array.map(person => {
      return person.name
    })


### Prefer destructuring outside of the arguments list

This helps keep the signatures clearer for methods that are exposed as external
api.

**Bad**

    function ({value = undefined, values = [], name = "bob"} = {}) {

    }

**Good**

    function (options = {}) {
      const {
        value = undefined,
        values = [],
        name = "bob"
      } = options
    }

For anonymous methods that are internal its fine to use destructing in the
arguments when there are single items, provided it is clear what the thing
you are destructuring is:

**Bad**
    poorlyNamedList.map(({name}) => name)

**Good**
    poorlyNamedList.map(person => person.name)
    people.map(person => person.name)
    people.map(({name}) => name)


## Exports should go at the end of the file

This makes it easy to quickly find what is exported from a file - having
the exports at the bottom makes the codebase more consistent and thus
easier to navigate.

**Bad**
    export function tooltip () {

    }

    // Other code after the export
    ...

**Good**
    function tooltip () {

    }

    // Other code here
    ...

    export { tooltip }
