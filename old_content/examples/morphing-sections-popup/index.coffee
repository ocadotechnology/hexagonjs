hx.select('body') # Move the morph sections to the end of the body to reduce overlapping issues
  .append(hx.select('#morphSectionLeft'))
  .insertAfter(hx.select('#morphSectionCenter'))
  .insertAfter(hx.select('#morphSectionRight'))

# Create the new morph sections
morphLeft = new hx.MorphSection('#morphSectionLeft')
morphCenter = new hx.MorphSection('#morphSectionCenter')
morphRight = new hx.MorphSection('#morphSectionRight')


# Click detectors to close the sections when the user clicks outside the content.
clickLeft = new hx.ClickDetector()
clickCenter = new hx.ClickDetector()
clickRight = new hx.ClickDetector()

clickLeft.addException(hx.select('#morphSectionLeft .hx-morph-content').node())
clickLeft.addException(hx.select('#morphSectionLeft .hx-morph-toggle').node())

clickCenter.addException(hx.select('#morphSectionCenter .hx-morph-content').node())
clickCenter.addException(hx.select('#morphSectionCenter .hx-morph-toggle').node())

clickRight.addException(hx.select('#morphSectionRight .hx-morph-content').node())
clickRight.addException(hx.select('#morphSectionRight .hx-morph-toggle').node())

clickLeft.on 'click', -> morphLeft.hide()
clickCenter.on 'click', -> morphCenter.hide()
clickRight.on 'click', -> morphRight.hide()