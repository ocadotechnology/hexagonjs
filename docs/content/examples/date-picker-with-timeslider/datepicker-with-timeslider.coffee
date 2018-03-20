datePicker = new hx.DatePicker('#datepicker', 'calendar')
timeSlider = new hx.TimeSlider('#timeslider')

hx.select('#back-a-day').on 'click', -> datePicker.day(datePicker.day() - 1)
hx.select('#forward-a-day').on 'click', -> datePicker.day(datePicker.day() + 1)

getDate = ->
  date = new Date(datePicker.date().getTime())
  time = timeSlider.value()
  date.setHours(time.getHours())
  date.setMinutes(time.getMinutes())
  date

notification = null

notify = ->
  if notification then notification.close()
  notification = hx.notify('New date selected: ' + getDate(), 'fa fa-clock-o')


datePicker.on 'change', -> notify()
timeSlider.on 'slideend', -> notify()
