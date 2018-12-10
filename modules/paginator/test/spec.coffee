describe 'hx-paginator', ->


runTest = (name, currentPage, pageCount) ->
  it name, () ->
    hx._.paginator.getPageItems(currentPage, pageCount, 5).join(' ').should.equal(name)

describe 'paginator logic', () ->
  runTest('1~ 2 3 4 5 ... 100 next', 1, 100)
  runTest('prev 1 2 3~ 4 5 ... 100 next', 3, 100)
  runTest('prev 1 ... 13 14 15~ 16 17 ... 100 next', 15, 100)
  runTest('prev 1 ... 96~ 97 98 99 100 next', 96, 100)
  runTest('prev 1 ... 96 97 98 99 100~', 100, 100)
  # Edge Cases
  runTest('1~', 1, 1)
  runTest('1~ 2 next', 1, 2)
  runTest('prev 1 2~', 2, 2)
  runTest('prev 1 2~ 3 next', 2, 3)
  runTest('prev 1 2 3~', 3, 3)
  runTest('prev 1 2~ 3 4 next', 2, 4)
  runTest('prev 1 2 3 4~', 4, 4)
  runTest('prev 1 2~ 3 4 5 next', 2, 5)
  runTest('prev 1 2 3 4 5~', 5, 5)
  runTest('1~ 2 3 4 5 6 next', 1, 6)
  runTest('prev 1 2~ 3 4 5 6 next', 2, 6)
  runTest('prev 1 2 3 4 5 6~', 6, 6)
  runTest('prev 1 2~ 3 4 5 ... 7 next', 2, 7)
  runTest('prev 1 ... 3 4 5 6 7~', 7, 7)
  runTest('prev 1 ... 3 4 5 6~ 7 next', 6, 7)
  runTest('prev 1 ... 4 5 6 7~ 8 next', 7, 8)
  runTest('prev 1 ... 4 5 6~ 7 8 ... 11 next', 6, 11)
  runTest('prev 1 ... 5 6 7~ 8 9 ... 13 next', 7, 13)
  runTest('1~ 2 3 4 5 ... 100 next', undefined, 100)
