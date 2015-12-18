
drawing = new hx.Drawing('#drawing-text')
drawing.enablePan()
drawing.enableZoom()
drawing.enablePerformanceGauge()
drawing.enableSelection()

drawing.camera.maxZoom = 50
drawing.camera.minZoom = 0.1

text1 = drawing.create('text')
text1.set('text', 'Left Aligned')
text1.set('color', hx.theme.plot.colors[0])
text1.set('size', 12*drawing.dpr)
text1.set('align.x', 'start')
text1.set('position.y', 15*drawing.dpr)
text1.set('selectable', true)

text2 = drawing.create('text')
text2.set('text', 'Center Aligned')
text2.set('color', hx.theme.plot.colors[1])
text2.set('size', 12*drawing.dpr)
text2.set('align.x', 'center')
text2.set('position.y', 30*drawing.dpr)
text2.set('selectable', true)

text3 = drawing.create('text')
text3.set('text', 'Right Aligned')
text3.set('color', hx.theme.plot.colors[2])
text3.set('size', 12*drawing.dpr)
text3.set('align.x', 'end')
text3.set('position.y', 45*drawing.dpr)
text3.set('selectable', true)

drawing.follow(drawing)
