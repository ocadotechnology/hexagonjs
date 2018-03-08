var titlebar = new hx.TitleBar('.example-heading')

// arguments 2 and 3 are not normally needed when initialising the sidebar - they are
// required for this example since the sidebar is not in it's usual place within the dom
var sidebar = new hx.Sidebar('.hx-sidebar', '.example-titlebar', '.example-content', false)

hx.select('#default-btn').on('click', function(){ titlebar.setContextClass(undefined)})
hx.select('#positive-btn').on('click', function(){ titlebar.setContextClass('hx-positive')})
hx.select('#warning-btn').on('click', function(){ titlebar.setContextClass('hx-warning')})
hx.select('#negative-btn').on('click', function(){ titlebar.setContextClass('hx-negative')})
hx.select('#info-btn').on('click', function(){ titlebar.setContextClass('hx-info')})
