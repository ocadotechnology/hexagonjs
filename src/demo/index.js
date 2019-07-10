import * as hx from 'hexagon-js';

import autocompleteExamples from './examples/autocomplete';
import autocompletePickerExamples from './examples/autocomplete-picker';
import badgeExamples from './examples/badge';
import buttonExamples from './examples/button';
import buttonGroupExamples from './examples/button-group';
import cardExamples from './examples/card';
import collapsibleExamples from './examples/collapsible';
import crumbtrailExamples from './examples/crumbtrail';
import dataTableExamples from './examples/data-table';
import datePickerExamples from './examples/date-picker';
import dateTimePickerExamples from './examples/date-time-picker';
import dragContainerExamples from './examples/drag-container';
import dropdownExamples from './examples/dropdown';
import errorPageExamples from './examples/error-page';
import formExamples from './examples/form';
import inputGroupExamples from './examples/input-group';
import layoutExamples from './examples/layout';
import loadingSpinnerExamples from './examples/loading-spinner';
import menuExamples from './examples/menu';
import modalExamples from './examples/modal';
import noticeExamples from './examples/notice';
import notifyExamples from './examples/notify';
import numberPickerExamples from './examples/number-picker';
import paginatorExamples from './examples/paginator';
import paletteExamples from './examples/palette';
import pickerExamples from './examples/picker';
import pivotTableExamples from './examples/pivot-table';
import plotExamples from './examples/plot';
import progressBarExamples from './examples/progress-bar';
import sidebarExamples from './examples/sidebar';
import sideCollapsibleExamples from './examples/side-collapsible';
import sliderExamples from './examples/slider';
import tableExamples from './examples/table';
import tabsExamples from './examples/tabs';
import tagInputExamples from './examples/tag-input';
import timePickerExamples from './examples/time-picker';
import timeSliderExamples from './examples/time-slider';
import toggleExamples from './examples/toggle';
import treeExamples from './examples/tree';
import typographyExamples from './examples/typography';
import inputExamples from './examples/input';
import checkboxExamples from './examples/checkbox';
import radioExamples from './examples/radio';
import moreButtonExamples from './examples/more-button';
import dropdownButtonExamples from './examples/dropdown-button';

const {
  select, selectAll, div, detached, debounce,
} = hx;

window.hx = hx;

const contentsItems = [];

function backToTop() {
  window.scrollTo(0, 0);
}

function example(title) {
  const slug = title.split(' ').join('-').toLowerCase();
  contentsItems.push({
    title,
    slug,
  });

  return div('example-section')
    .add(detached('h2').attr('id', slug).class('example-header').text(title)
      .add(detached('a').class('back-to-top')
        .on('click', backToTop)
        .text('Back to top')));
}

function tryDemo(demoFn) {
  try {
    return demoFn();
  } catch (e) {
    console.error(e);
    return detached('pre').class('big-ol-error').text(e.toString());
  }
}

function getContents() {
  return detached('ul').add(contentsItems.map(({ title, slug }) => detached('li')
    .add(detached('a')
      .attr('href', `#${slug}`)
      .text(title))));
}

function findContentsItem(text) {
  const lcText = text.toLowerCase().replace('back to top', '');
  const sel = selectAll('.sidebar ul a').filter(item => item.text().toLowerCase() === lcText);
  const node = sel.node(0);
  if (node) {
    return select(node.parentNode);
  }
  return div();
}

function updateURL(value) {
  window.history.replaceState({}, undefined, `?filter=${encodeURIComponent(value)}${window.location.hash}`);
}

function applyFilter(value) {
  selectAll('.example-section').forEach((sel) => {
    const vis = value.toLowerCase().split(', ').some(v => sel.text().toLowerCase().includes(v));
    sel.style('display', vis ? undefined : 'none');
    findContentsItem(sel.select('.example-header').text()).style('display', vis ? undefined : 'none');
  });

  updateURL(value);
}

const filter = detached('input').class('hx-input')
  .attr('placeholder', 'Filter...')
  .on('keyup', debounce(200, (e) => {
    applyFilter(e.target.value);
    backToTop();
  }));

const examples = [
  example('Text Styles').add(tryDemo(typographyExamples)),
  example('Input Fields').add(tryDemo(inputExamples)),
  example('Checklists').add(tryDemo(checkboxExamples)),
  example('Radio Buttons').add(tryDemo(radioExamples)),
  example('Palette').add(tryDemo(paletteExamples)),
  example('Autocomplete Picker').add(tryDemo(autocompletePickerExamples)),
  example('Autocomplete').add(tryDemo(autocompleteExamples)),
  example('Badge').add(tryDemo(badgeExamples)),
  example('Button Group').add(tryDemo(buttonGroupExamples)),
  example('Buttons').add(tryDemo(buttonExamples)),
  example('Card').add(tryDemo(cardExamples)),
  example('Collapsible').add(tryDemo(collapsibleExamples)),
  example('Crumbtrail').add(tryDemo(crumbtrailExamples)),
  example('Data Table').add(tryDemo(dataTableExamples)),
  example('Date Picker').add(tryDemo(datePickerExamples)),
  example('Date Time Picker').add(tryDemo(dateTimePickerExamples)),
  example('Drag Container').add(tryDemo(dragContainerExamples)),
  example('Dropdown').add(tryDemo(dropdownExamples)),
  example('Error Page').add(tryDemo(errorPageExamples)),
  example('Form').add(tryDemo(formExamples)),
  example('Input Group').add(tryDemo(inputGroupExamples)),
  example('Layout').add(tryDemo(layoutExamples)),
  example('Loading Spinners').add(tryDemo(loadingSpinnerExamples)),
  example('Menu').add(tryDemo(menuExamples)),
  example('More Button').add(tryDemo(moreButtonExamples)),
  example('Dropdown Button').add(tryDemo(dropdownButtonExamples)),
  example('Modals').add(tryDemo(modalExamples)),
  example('Notice').add(tryDemo(noticeExamples)),
  example('Notify').add(tryDemo(notifyExamples)),
  example('Number Pickers').add(tryDemo(numberPickerExamples)),
  example('Paginator').add(tryDemo(paginatorExamples)),
  example('Picker').add(tryDemo(pickerExamples)),
  example('Pivot Table').add(tryDemo(pivotTableExamples)),
  example('Plot').add(tryDemo(plotExamples)),
  example('Progress Bar').add(tryDemo(progressBarExamples)),
  example('Side Collapsible').add(tryDemo(sideCollapsibleExamples)),
  example('Sidebar').add(tryDemo(sidebarExamples)),
  example('Slider').add(tryDemo(sliderExamples)),
  example('Table').add(tryDemo(tableExamples)),
  example('Tabs').add(tryDemo(tabsExamples)),
  example('Tag Input').add(tryDemo(tagInputExamples)),
  example('Time Picker').add(tryDemo(timePickerExamples)),
  example('Time Slider').add(tryDemo(timeSliderExamples)),
  example('Toggle').add(tryDemo(toggleExamples)),
  example('Tree').add(tryDemo(treeExamples)),
];

select('body')
  .add(div('sidebar')
    .add(filter)
    .add(getContents()))
  .add(detached('p').class('intro').text('This page demonstrates examples of the various Hexagon components available on a single page. Use the filter on the left to search for components'))
  .add(div('examples').set(examples));

setTimeout(() => {
  if (window.location.search) {
    const filterValueFromWindow = decodeURIComponent(window.location.search.slice(window.location.search.indexOf('=') + 1));
    filter.value(filterValueFromWindow);
    applyFilter(filterValueFromWindow);
  }
}, 1);
