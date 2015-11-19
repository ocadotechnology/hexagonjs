min = new Date()
min.setMilliseconds(0)
min.setMinutes(0)
min.setHours(5)

max = new Date(min)
max.setHours(19)

timeSlider1 = new hx.TimeSlider('#timeSlider1', {min: min, max: max})

timeSlider2 = new hx.TimeSlider('#timeSlider2', {min: min, max: max, step: 0.5 * 60 * 60 * 1000})

timeSlider3 = new hx.TimeSlider('#timeSlider3', {type: 'range'})

timeSlider4 = new hx.TimeSlider('#timeSlider4', {type: 'range', min: min, max: max, step: 1 * 60 * 60 * 1000})