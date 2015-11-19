

view = hx.select('#container').view('.thing').update((d) -> @text(d))

view.apply([1, 2, 3, 4, 5])

hx.select('#button-1').on 'click', -> view.apply([1, 2, 3])
hx.select('#button-2').on 'click', -> view.apply([1, 2, 3, 4, 5, 6, 7, 8])
hx.select('#button-3').on 'click', -> view.apply([5, 6, 7, 8])
