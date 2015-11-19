# Shared formatters
format4 = hx.format.fixed(4)
format2 = hx.format.fixed(2)


# Slider 1 - Slider with render function

renderSlider = (slider, elem, value) ->
  hx.select(elem).text format4(value)

slider1 = new hx.Slider('#slider1', {render: renderSlider})


# Slider 2 - Slider with function for setting input values

slider2 = new hx.Slider('#slider2')
input = hx.select('#sliderVal')

input.value format2(slider2.value())

slider2.on 'change', (data) ->
  input.value format2(data)


# Slider 3 - Range slider with function for setting input values

slider3 = new hx.Slider('#slider3', {type: 'range'})
startInput = hx.select('#sliderMin')
endInput = hx.select('#sliderMax')

updateInputs = (data) ->
  startInput.value format2(data.startValue)
  endInput.value format2(data.endValue)

updateInputs(slider3.value())

slider3.on 'change', (data) ->
  updateInputs(data)


# Slider 4 - Slider with discrete data
slider4 = new hx.Slider('#slider4', {discreteValues: ['Dave', 'Steve', 'Bob', 'Kate']})


# Slider 5 - Range slider with discrete data and start/end values set
slider5 = new hx.Slider('#slider5', {type: 'range', discreteValues: ['Dave', 'Steve', 'Bob', 'Kate'], startValue: 'Steve', endValue: 'Kate'})


# Slider 6 - Slider with a min and max set
slider6 = new hx.Slider('#slider6', {min: 5, max: 15})


# Slider 7 - Slider with a min, max and value set
slider7 = new hx.Slider('#slider7', {min: 7, max: 35, step: 7})


# Slider 8 - Range slider with a min and max set
slider8 = new hx.Slider('#slider8', {type: 'range', min: 5, max: 50})


# Slider 9 - Range slider with a min, max and step set
slider9 = new hx.Slider('#slider9', {type: 'range', min: 2, max: 77, step: 10})