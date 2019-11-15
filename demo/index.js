(function (hx) {
  'use strict';

  function autocompleteExamples () { return [
    hx.autocomplete(['Item 1', 'Item 2', 'Item 3']) ]; }

  function autocompletePickerExamples () {
    function delayedItems(searchTerm, callback) {
      setTimeout(function () { return callback(['a', 'b', 'c']); }, 3000);
    }

    return hx.div().set([
      hx.autocompletePicker(['Item 1', 'Item 2', 'Item 3']),
      hx.autocompletePicker(delayedItems) ]);
  }

  function badgeExamples () { return [
    hx.badge().text('Default Label'),
    hx.badge({ type: 'success' }).text('Success Label'),
    hx.badge({ type: 'warning' }).text('Warning Label'),
    hx.badge({ type: 'danger' }).text('Danger Label'),
    hx.div(),
    hx.badge({ inverse: true }).text('Default Inverse Label'),
    hx.badge({ inverse: true, type: 'success' }).text('Success Label'),
    hx.badge({ inverse: true, type: 'warning' }).text('Warning Label'),
    hx.badge({ inverse: true, type: 'danger' }).text('Danger Label') ]; }

  function buttonExamples () { return [
    hx.div('hx-flag-button')
      .add(hx.button('hx-btn hx-primary').text('Primary'))
      .add(hx.button('hx-btn hx-secondary').text('Secondary'))
      .add(hx.button('hx-btn').text('Standard'))
      .add(hx.button('hx-btn hx-success').text('Success'))
      .add(hx.button('hx-btn hx-danger').text('Danger'))
      .add(hx.button('hx-btn hx-btn-link').text('Link'))
      .add(hx.button('hx-btn').attr('disabled', true).text('Disabled')),
    hx.div(),
    hx.button('hx-btn').text('Default'),
    hx.button('hx-btn hx-positive').text('Positive'),
    hx.button('hx-btn hx-warning').text('Warning'),
    hx.button('hx-btn hx-negative').text('Negative'),
    hx.button('hx-btn hx-info').text('Info'),
    hx.button('hx-btn hx-action').text('Action'),
    hx.button('hx-btn hx-complement').text('Complement'),
    hx.button('hx-btn hx-contrast').text('Contrast'),
    hx.button('hx-btn hx-btn-invisible').text('Invisible'),
    hx.button('hx-btn hx-disabled').text('Disabled'),
    hx.div(),
    hx.button('hx-btn hx-btn-outline').text('Default'),
    hx.button('hx-btn hx-btn-outline hx-positive').text('Positive'),
    hx.button('hx-btn hx-btn-outline hx-warning').text('Warning'),
    hx.button('hx-btn hx-btn-outline hx-negative').text('Negative'),
    hx.button('hx-btn hx-btn-outline hx-info').text('Info'),
    hx.button('hx-btn hx-btn-outline hx-action').text('Action'),
    hx.button('hx-btn hx-btn-outline hx-complement').text('Complement'),
    hx.button('hx-btn hx-btn-outline hx-contrast').text('Contrast') ]; }

  function buttonGroupExamples () { return [
    hx.buttonGroup({
      items: ['Button 1', 'Button 2', 'Button 3', 'Button 4'],
    }) ]; }

  function titleText(title, text) {
    return hx.card.section()
      .add(hx.div().add(hx.card.title({ text: title })))
      .add(hx.div().add(hx.card.text({ text: text })));
  }

  function sparklineExample(options) {
    return hx.card.group()
      .add(hx.card.fixed.section().add(hx.card.text({ text: options.text })))
      .add(hx.card.section()
        .add(hx.sparkline({
          strokeColor: options.sparklineColor,
          data: options.sparklineData,
        })));
  }

  function random(i) {
    return {
      x: i,
      y: Math.random(),
    };
  }

  function statusCard(name, context) {
    return hx.card()
      .add(hx.card.header.section({ context: context })
        .add(hx.card.title({ text: name })))
      .add(hx.card.header.group()
        .add(titleText('Status', 'Normal'))
        .add(titleText('Uptime', '5 days'))
        .add(titleText('Memory Usage', '482 MB'))
        .add(titleText('Thread Count', '19'))
        .add(titleText('Page Hits', '2236 / s')))
      .add(hx.card.aligned()
        .add(sparklineExample({ text: 'Memory Use', sparklineColor: hx.theme().plotColors[0], sparklineData: hx.range(60).map(random) }))
        .add(sparklineExample({ text: 'Thread Count', sparklineColor: hx.theme().plotColors[1], sparklineData: hx.range(60).map(random) }))
        .add(sparklineExample({ text: 'Page Hits', sparklineColor: hx.theme().plotColors[2], sparklineData: hx.range(60).map(random) }))
        .add(sparklineExample({ text: 'Messages Processed', sparklineColor: hx.theme().plotColors[3], sparklineData: hx.range(60).map(random) })));
  }

  function cardExamples () { return hx.div('card-demo')
    .add(statusCard('Instance 1', undefined))
    .add(statusCard('Instance 2', 'positive'))
    .add(statusCard('Instance 3', 'negative')); }

  function collapsibleExamples () {
    var selection = hx.div('hx-collapsible')
      .add(hx.div('hx-collapsible-heading').text('Header'))
      .add(hx.div('hx-collapsible-content demo-collapsible-content').text('Content'));

    new hx.Collapsible(selection);

    return selection;
  }

  function crumbtrailExamples () { return hx.div('crumbtrail-demo')
    .add(hx.crumbtrail({ items: ['Docs', 'Getting started', 'Installation'] })); }

  var br = function () { return hx.detached('br'); };
  var note = function () { return hx.detached('note'); };

  function dataTableExamples () {
    var professions = [
      'Developer',
      'Designer',
      'Engineer',
      'Builder',
      'Electrician' ];
    var feed = hx.objectFeed({
      headers: [
        { name: 'Name', id: 'name' },
        { name: 'Age', id: 'age' },
        { name: 'Profession', id: 'profession' } ],
      rows: [
        {
          id: 0, // hidden details can go here (not in the cells object)
          cells: { name: 'Bob', age: 25, profession: 'Developer' },
        },
        {
          id: 1,
          cells: { name: 'Jan', age: 41, profession: 'Artist' },
        },
        {
          id: 2,
          cells: { name: 'Dan', age: 41, profession: 'Builder' },
        } ],
    });

    var randomFeed = hx.objectFeed({
      headers: [
        { name: 'Name', id: 'name' },
        { name: 'Age', id: 'age' },
        { name: 'Profession', id: 'profession' } ],
      rows: hx.range(1000).map(function (_, idx) { return ({
        id: idx,
        cells: {
          name: ("Name " + idx),
          age: Math.floor((idx + 10) * Math.random()),
          profession: hx.cycle(professions, Math.floor((idx + 10) * Math.random()) % professions.length),
        },
      }); }),
    });

    return [
      hx.dataTable({ feed: feed }),
      br(),
      note().text('Data table with table styles feature flag'),
      hx.dataTable({ feed: feed }).classed('hx-flag-table', true),
      br(),
      hx.dataTable({
        feed: feed,
        rowCollapsibleLookup: function () { return true; },
        collapsibleRenderer: function () { return hx.div().text('Bob'); },
      }),
      br(),
      hx.dataTable({
        feed: feed,
        selectEnabled: true,
      }),
      br(),
      hx.dataTable({
        feed: feed,
        filterEnabled: false, // Disable the normal filter
        advancedSearchEnabled: true, // Enable the advanced search
        advancedSearchCriteria: hx.filterTypes(), // Enable all the filter types
        advancedSearch: [
          [
            { column: 'age', term: '26', criteria: 'greater' } ],
          [
            { column: 'name', term: 'Bob', criteria: 'exact' } ] ],
      }),
      br(),
      hx.dataTable({
        feed: randomFeed,
      }) ];
  }

  function datePickerExamples () { return [
    hx.datePicker(),
    hx.div(),
    hx.datePicker({
      date: new Date(Date.UTC(2019, 4, 22, 0, 20)),
    }),
    hx.div(),
    hx.datePicker({
      selectRange: true,
    }),
    hx.div(),
    hx.datePicker({
      selectRange: true,
      range: {
        start: new Date(Date.UTC(2019, 4, 22, 0, 20)),
        end: new Date(Date.UTC(2019, 4, 24, 0, 20)),
      },
    }),
    hx.div(),
    hx.datePicker({
      v2Features: {
        useInput: true,
      },
    }) ]; }

  function dateTimePickerExamples () { return [
    hx.dateTimePicker(),
    hx.div(),
    hx.dateTimePicker({
      date: new Date(2019, 4, 22, 0, 20),
    }) ]; }

  function dragContainerExamples () {
    var container = hx.group()
      .add(hx.section()
        .attr('data-id', 'green')
        .classed('hx-drag-element hx-pad hx-background-positive', true)
        .text('Draggable'))
      .add(hx.section()
        .attr('data-id', 'yellow')
        .classed('hx-drag-element hx-pad hx-background-warning', true)
        .text('Draggable'))
      .add(hx.section()
        .attr('data-id', 'red')
        .classed('hx-drag-element hx-pad hx-background-negative', true)
        .text('Undraggable'))
      .add(hx.section()
        .attr('data-id', 'blue')
        .classed('hx-drag-element hx-pad hx-background-action', true)
        .add(hx.span()
          .add(hx.i('hx-drag-control fa fa-arrows'))
          .add(hx.span().text('Draggable Control'))));

    var dc = new hx.DragContainer(container);

    var resetButton = hx.button('hx-btn')
      .text('Reset Order')
      .on('click', function () {
        dc.order(undefined);
      });

    var getOrderButton = hx.button('hx-btn hx-positive')
      .text('Get Order')
      .on('click', function () {
        hx.notifyInfo(("The order is: " + (dc.order().join(', '))));
      });

    return hx.div()
      .add([
        container,
        resetButton,
        getOrderButton ]);
  }

  function dropdownExamples () {
    var button1 = hx.button('hx-btn').text('Click dropdown');
    var content1 = hx.div('demo-dropdown-content').text('Dropdown content');
    new hx.Dropdown(button1, content1);

    var button2 = hx.button('hx-btn').text('Hover dropdown');
    var content2 = hx.div('demo-dropdown-content').text('Dropdown content');
    new hx.Dropdown(button2, content2, { mode: 'hover' });

    return [
      button1,
      button2 ];
  }

  function errorPageExamples () { return hx.div('demo-error-page-container')
    .add(hx.div('hx-error-message')
      .add(hx.div('hx-error-message-heading').text('404'))
      .add(hx.div()
        .add(hx.detached('p')
          .text('The content you requested was not found')))
      .add(hx.div()
        .add(hx.button('hx-btn hx-positive').text('Go Back'))
        .add(hx.button('hx-btn hx-positive').text('Go to home screen')))); }

  function formExamples () {
    var theForm = hx.div();
    new hx.Form(theForm, { featureFlags: { useUpdatedStructure: true, displayVertical: false } })
      .addText('Text', { required: true, placeholder: 'Name' })
      .addText('Text with Autocomplete', { required: true, placeholder: 'Name', autocompleteData: [1, 2, 3] })
      .addTextArea('Text Area', { placeholder: 'Name' })
      .addEmail('Email', { required: true, placeholder: 'your.name@ocado.com' })
      .addUrl('Url', { placeholder: 'http://www.example.co.uk/' }) // Allows blank or valid URL (with http:// prefix)
      .addNumber('Number', { required: true })
      .addCheckbox('Checkbox')
      .addCheckbox('Checkbox (required)', { required: true })
      .addPassword('Password')
      .addPassword('Password (required)', { required: true })
      .addRadio('Radio', ['One', 'Two', 'Three'])
      .addRadio('Radio (required)', ['One', 'Two', 'Three'], { required: true })
      .addPicker('Picker', ['red', 'green', 'blue'])
      .addPicker('Picker (required)', ['red', 'green', 'blue'], { required: true })
      .addTagInput('Tag Input')
      .addTagInput('Tag Input (required)', { required: true })
      .addTagInput('Tag Input (validator)', {
        required: true,
        tagInputOptions: {
          validator: function (name) {
            if (!Number.isNaN(Number(name))) {
              return 'Please enter text';
            }
            return false;
          },
        },
      })
      .addFileInput('File Input')
      .addFileInput('File Input (required)', { required: true })
      .addDatePicker('Date Picker')
      .addDatePicker('Date Picker (required)', { required: true })
      .addTimePicker('Time Picker')
      .addTimePicker('Time Picker (required)', { required: true })
      .addDateTimePicker('Date Time Picker')
      .addDateTimePicker('Date Time Picker (required)', { required: true })
      .addAutocompletePicker('Autocomplete Picker', ['a', 'b', 'c'])
      .addAutocompletePicker('Autocomplete Picker (required)', ['a', 'b', 'c'], { required: true })
      .addSingleSelect('Single Select', ['a', 'b', 'c'])
      .addSingleSelect('Single Select (required)', ['a', 'b', 'c'], { required: true })
      .addSingleSelect('Single Select with search', hx.range(100).map(function (x) { return ("Item " + x); }), { singleSelectOptions: { showSearch: true } })
      .addButton('Button', function () { return console.log('Clicked Button'); })
      .addSubmit('Submit', 'fa fa-check', undefined, { context: 'primary' })
      .on('submit', function (data) { console.log(data); });

    return [
      hx.detached('form').class('hx-form')
        .add(hx.div()
          .add(hx.detached('label').text('Text'))
          .add(hx.detached('input').attr('type', 'text')))
        .add(hx.div()
          .add(hx.detached('label').text('Email'))
          .add(hx.detached('input').attr('type', 'email')))
        .add(hx.div()
          .add(hx.detached('label').text('Number'))
          .add(hx.detached('input').attr('type', 'number')))
        .add(hx.div()
          .add(hx.detached('label').text('Url'))
          .add(hx.detached('input').attr('type', 'url')))
        .add(hx.div()
          .add(hx.detached('label').text('Radio'))
          .add(hx.div().attr('id', 'group-1')
            .add(hx.div()
              .add(hx.detached('input').attr('id', 'radio1').attr('type', 'radio').attr('value', 'One')
                .attr('name', 'group-1'))
              .add(hx.detached('label').attr('for', 'radio1').text('One')))
            .add(hx.div()
              .add(hx.detached('input').attr('id', 'radio2').attr('type', 'radio').attr('value', 'Two')
                .attr('name', 'group-1'))
              .add(hx.detached('label').attr('for', 'radio2').text('Two')))
            .add(hx.div()
              .add(hx.detached('input').attr('id', 'radio3').attr('type', 'radio').attr('value', 'Three')
                .attr('name', 'group-1'))
              .add(hx.detached('label').attr('for', 'radio3').text('Three')))))
        .add(hx.div()
          .add(hx.detached('label').attr('for', 'checkbox1').text('Checkbox'))
          .add(hx.detached('input').attr('id', 'checkbox1').attr('type', 'checkbox')))
        // .add(div()
        //   .add(detached('label').text('Tag Input'))
        //   .add(div()
        //     .add(tagInput())))
        .add(hx.button('hx-btn hx-positive').attr('type', 'submit')
          .add(hx.detached('i').class('fa fa-paper-plane'))
          .add(hx.span().text(' Submit'))),
      hx.detached('br'),
      theForm ];
  }

  function inputGroupExamples () { return hx.div('hx-input-group')
    .add(hx.i('fa fa-search'))
    .add(hx.detached('input').attr('value', 'input'))
    .add(hx.button('hx-btn hx-positive').add(hx.i('fa fa-arrow-right'))); }

  function layoutExamples () {
    var exampleLayout = hx.group()
      .add(hx.section())
      .add(hx.group({ vertical: true })
        .add(hx.section())
        .add(hx.section())
        .add(hx.group()
          .add(hx.section())
          .add(hx.section())))
      .add(hx.section())
      .add(hx.section());

    return hx.div('layout-demo')
      .add(exampleLayout);
  }

  function loadingSpinnerExamples () { return [
    hx.spinner(),
    hx.spinnerWide() ]; }

  function menuExamples () {
    var defaultMenuItems = ['item 1', 'item 2', 'item 3'];
    var defaultMenu = hx.button('hx-btn').text('Default');

    new hx.Menu(defaultMenu, {
      items: defaultMenuItems,
    });


    var disabledMenu = hx.button('hx-btn').text('Disabled');

    var disabledItems = [
      {
        text: 'Disabled Item 1',
        disabled: true,
      },
      {
        text: 'Disabled Item 2',
        disabled: true,
      },
      {
        text: 'Disabled Item 3',
        disabled: true,
      } ];

    new hx.Menu(disabledMenu, {
      items: disabledItems,
    });

    var unselectable = hx.button('hx-btn').text('Unselectable');

    var unselectableItems = [
      {
        text: 'Unselectable Item 1',
        unselectable: true,
      },
      {
        text: 'Unselectable Item 2',
        unselectable: true,
      },
      {
        text: 'Unselectable Item 3',
        unselectable: true,
      } ];

    new hx.Menu(unselectable, {
      items: unselectableItems,
    });

    var mixed = hx.button('hx-btn').text('Mixed');

    var mixedItems = [
      {
        text: 'Disabled Item 1',
        disabled: true,
      },
      {
        text: 'Item 1',
      },
      {
        text: 'Disabled Item 2',
        disabled: true,
      },
      {
        text: 'Unselectable Item 1',
        unselectable: true,
      },
      {
        text: 'Item 2',
      },
      {
        text: 'Unselectable Item 2',
        unselectable: true,
      } ];

    new hx.Menu(mixed, {
      items: mixedItems,
    });


    var contexts = ['default', 'action', 'positive', 'warning', 'negative', 'complement', 'contrast'];
    var contextButtons = contexts.map(function (ctx) {
      var contextClass = "hx-" + ctx;
      var sel = hx.button(("hx-btn " + contextClass)).text(contextClass);
      new hx.Menu(sel, {
        items: defaultMenuItems,
      });
      return sel;
    });

    return hx.div().set([
      defaultMenu,
      disabledMenu,
      unselectable,
      mixed,
      hx.div() ].concat( contextButtons ));
  }

  function modalExamples () {
    var modal = new hx.Modal('Demo modal', function (node) {
      hx.select(node).text('Hello');
    });

    var renderBody = function () { return hx.div().text('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium.'); };
    var renderFooter = function (m) { return ([
      hx.button('hx-btn')
        .text('Standard')
        .on('click', function () { return m.hide(); }),
      hx.button('hx-btn hx-secondary hx-margin-left')
        .text('Secondary')
        .on('click', function () { return m.hide(); }) ]); };

    var renderRightBody = function () {
      var theForm = hx.detached('form');

      new hx.Form(theForm, { featureFlags: { useUpdatedStructure: true, displayVertical: true } })
        .addText('Text')
        .addDatePicker('Date Picker');

      return hx.div()
        .add(hx.detached('p').text('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium.'))
        .add(hx.div('hx-form hx-flag-form hx-form-vertical')
          .add(theForm));
    };

    var renderRightFooter = function (thisModal) { return ([
      hx.button('hx-btn')
        .text('Cancel')
        .on('click', function () { return thisModal.hide(); }),
      hx.button('hx-btn hx-primary hx-margin-left')
        .text('Primary')
        .on('click', function () { return thisModal.hide(); }) ]); };

    var renderFullFooter = function (thisModal) { return ([
      hx.button('hx-btn')
        .text('Cancel')
        .on('click', function () { return thisModal.close(); }),
      hx.button('hx-btn hx-primary hx-margin-left')
        .text('Primary')
        .on('click', function () { return thisModal.hide(); }) ]); };

    return hx.div()
      .set([
        hx.button('hx-btn').text('Show Deprecated Modal').on('click', function () { return modal.show(); }),
        hx.div('hx-pad'),
        hx.button('hx-btn hx-flag-button').text('Show Center Modal').on('click', function () { return hx.modalCenter({
          title: 'Lorem ipsum dolor sit',
          renderBody: renderBody,
          renderFooter: renderFooter,
        }); }),
        hx.div('hx-pad'),
        hx.button('hx-btn hx-flag-button hx-margin-right').text('Show Right Modal').on('click', function () { return hx.modalRight({
          title: 'Lorem ipsum dolor sit',
          renderBody: renderRightBody,
          renderFooter: renderRightFooter,
        }); }),
        hx.button('hx-btn hx-flag-button').text('Show Wide Right Modal').on('click', function () { return hx.modalRight({
          title: 'Lorem ipsum dolor sit',
          renderBody: renderRightBody,
          renderFooter: renderRightFooter,
          wide: true,
        }); }),
        hx.div('hx-pad'),
        hx.button('hx-btn hx-flag-button').text('Show Full Screen Modal').on('click', function () { return hx.modalFullScreen({
          title: 'Lorem ipsum dolor sit',
          renderBody: renderBody,
          renderFooter: renderFullFooter,
          onClose: function (thisModal) { return hx.modalCenter({
            title: 'Discard unsaved changes?',
            renderBody: function () { return hx.div().text('Any new data you entered will be discarded.'); },
            renderFooter: function (cancelModal) { return ([
              hx.button('hx-btn')
                .text('Cancel')
                .on('click', function () { return cancelModal.hide(); }),
              hx.button('hx-btn hx-primary hx-margin-left')
                .text('Discard')
                .on('click', function () {
                  cancelModal.hide();
                  thisModal.hide();
                }) ]); },
          }); },
        }); }) ]);
  }

  function exampleNotice(cls) {
    return hx.notice().classed(cls, true)
      .add(hx.noticeHead().text('Notice header'))
      .add(hx.noticeBody().text('Notice body text'));
  }

  function noticeExamples () { return [
    exampleNotice(''),
    exampleNotice('hx-action'),
    exampleNotice('hx-positive'),
    exampleNotice('hx-warning'),
    exampleNotice('hx-negative'),
    exampleNotice('hx-info'),
    exampleNotice('hx-complement'),
    exampleNotice('hx-contrast') ]; }

  function notifyExamples () { return [
    hx.button('hx-btn').text('Notify').on('click', function () { return hx.notify('Hello'); }),
    hx.button('hx-btn').text('Positive').on('click', function () { return hx.notifyPositive('Positive notification'); }),
    hx.button('hx-btn').text('Warning').on('click', function () { return hx.notifyWarning('Warning notification'); }),
    hx.button('hx-btn').text('Negative').on('click', function () { return hx.notifyNegative('Negative notification'); }),
    hx.button('hx-btn').text('Info').on('click', function () { return hx.notifyInfo('Info notification'); }),
    hx.button('hx-btn').text('Loading').on('click', function () { return hx.notifyLoading('Loading notification'); }) ]; }

  function alertExamples () { return [
    hx.div('hx-header-small').text('Alerts'),
    hx.detached('br'),
    hx.button('hx-btn hx-flag-button').text('Success').on('click', function () { return hx.alert({
      title: 'This is a success alert.',
      body: 'Use it to let users know that something was successful.',
      type: 'success',
    }); }),
    hx.button('hx-btn hx-flag-button').text('Warning').on('click', function () { return hx.alert({
      title: 'This is a warning alert.',
      body: 'Use it to tell users about something that could be a problem, but won\'t block them from doing things yet.',
      type: 'warning',
    }); }),
    hx.button('hx-btn hx-flag-button').text('Danger').on('click', function () { return hx.alert({
      title: 'This is an error alert.',
      body: 'Use it to tell users about errors. Include steps that the user can take to resolve the error, even if it\'s just "Try again".',
      type: 'danger',
    }); }),
    hx.button('hx-btn hx-flag-button').text('Default').on('click', function () { return hx.alert({
      title: 'This is an information alert.',
      body: 'Use it for alerts that don\'t fit into the other three categories.',
    }); }),
    hx.detached('br'),
    hx.detached('br'),
    hx.detached('hr'),
    hx.div('hx-header-small').text('Messages'),
    hx.detached('br'),
    hx.button('hx-btn hx-flag-button').text('Success').on('click', function () { return hx.message({
      title: 'This is a success message.',
      body: 'Use it to let users know that something was successful.',
      type: 'success',
    }); }),
    hx.button('hx-btn hx-flag-button').text('Default').on('click', function () { return hx.message({
      title: 'This is an information message.',
      body: 'Use it for messages that don\'t fit into the other three categories.',
    }); }) ]; }

  function numberPickerExamples () { return [
    hx.numberPicker() ]; }

  function paginatorExamples () { return hx.div('paginator-demo')
  // .add(paginator())
    .add(hx.paginator({
      v2Features: {
        showCentered: true,
        useAccessibleRendering: true,
      },
    })); }

  function paletteExamples () { return [
    hx.detached('h3').text('Text Classes'),
    hx.div('hx-group hx-horizontal').add([
      hx.div('hx-section demo-palette-example-text hx-text-default').text('hx-text-default'),
      hx.div('hx-section demo-palette-example-text hx-text-action').text('hx-text-action'),
      hx.div('hx-section demo-palette-example-text hx-text-positive').text('hx-text-positive'),
      hx.div('hx-section demo-palette-example-text hx-text-warning').text('hx-text-warning'),
      hx.div('hx-section demo-palette-example-text hx-text-negative').text('hx-text-negative'),
      hx.div('hx-section demo-palette-example-text hx-text-info').text('hx-text-info'),
      hx.div('hx-section demo-palette-example-text hx-text-complement').text('hx-text-complement'),
      hx.div('hx-section demo-palette-example-text hx-text-contrast').text('hx-text-contrast'),
      hx.div('hx-section demo-palette-example-text hx-text-disabled').text('hx-text-disabled') ]),
    hx.detached('h3').text('Background Classes'),
    hx.div('hx-group hx-horizontal').add([
      hx.div('hx-section demo-palette-example-background hx-background-default').text('hx-background-default'),
      hx.div('hx-section demo-palette-example-background hx-background-action').text('hx-background-action'),
      hx.div('hx-section demo-palette-example-background hx-background-positive').text('hx-background-positive'),
      hx.div('hx-section demo-palette-example-background hx-background-warning').text('hx-background-warning'),
      hx.div('hx-section demo-palette-example-background hx-background-negative').text('hx-background-negative'),
      hx.div('hx-section demo-palette-example-background hx-background-info').text('hx-background-info'),
      hx.div('hx-section demo-palette-example-background hx-background-complement').text('hx-background-complement'),
      hx.div('hx-section demo-palette-example-background hx-background-contrast').text('hx-background-contrast'),
      hx.div('hx-section demo-palette-example-background hx-background-disabled').text('hx-background-disabled') ]),
    hx.detached('h3').text('Border Classes'),
    hx.div('hx-group hx-horizontal').add([
      hx.div('hx-section demo-palette-example-border hx-border-default').text('hx-border-default'),
      hx.div('hx-section demo-palette-example-border hx-border-action').text('hx-border-action'),
      hx.div('hx-section demo-palette-example-border hx-border-positive').text('hx-border-positive'),
      hx.div('hx-section demo-palette-example-border hx-border-warning').text('hx-border-warning'),
      hx.div('hx-section demo-palette-example-border hx-border-negative').text('hx-border-negative'),
      hx.div('hx-section demo-palette-example-border hx-border-info').text('hx-border-info'),
      hx.div('hx-section demo-palette-example-border hx-border-complement').text('hx-border-complement'),
      hx.div('hx-section demo-palette-example-border hx-border-contrast').text('hx-border-contrast'),
      hx.div('hx-section demo-palette-example-border hx-border-disabled').text('hx-border-disabled') ]) ]; }

  function pickerExamples () {
    var items = [
      'Item #1',
      'Item #2',
      'Item #3',
      { text: 'Item #4', value: 'Item #4', disabled: true } ];

    return [
      hx.picker({ items: items }),
      hx.picker({ items: items, class: 'hx-positive' }),
      hx.picker({ items: items, class: 'hx-warning' }),
      hx.picker({ items: items, class: 'hx-negative' }),
      hx.picker({ items: items, class: 'hx-info' }),
      hx.picker({ items: items, class: 'hx-action' }),
      hx.picker({ items: items, class: 'hx-complement' }),
      hx.picker({ items: items, class: 'hx-contrast' }) ];
  }

  var data1 = {
    topHead: [
      'Head 1',
      'Head 2',
      'Head 3' ],
    leftHead: [
      'Head 1',
      'Head 2',
      'Head 3' ],
    body: [
      [
        'Cell 1',
        'Cell 2',
        'Cell 3' ],
      [
        'Cell 1',
        'Cell 2',
        'Cell 3' ],
      [
        'Cell 1',
        'Cell 2',
        'Cell 3' ] ],
  };

  function pivotTableExamples () { return [
    hx.pivotTable({ data: data1 }) ]; }

  function randomSign() {
    return Math.round(Math.random());
  }

  function createData(a, b, c) {
    var offset = 0.1 + Math.random();
    return hx.range(50).map(function (i) { return ({
      x: i,
      y: Math.abs(
        offset + a
          * Math.sin(i / 10) + b
          * Math.sin(i / 20) + c
          * Math.sin(i / 40) + Math.sin(i / 50) + Math.sin(i / 100)
      ),
    }); });
  }

  function plotExamples () {
    var selection = hx.div();
    var graph = new hx.Graph(selection);
    var axis = graph.addAxis({
      x: {
        title: 'Time',
      },
      y: {
        title: 'Value',
        scalePaddingMax: 0.1,
      },
    });

    hx.theme().plotColors.forEach(function (col, i) {
      axis.addSeries('line', {
        title: ("Series " + (i + 1)),
        data: createData(randomSign(), randomSign(), randomSign()),
        labelInterpolated: true,
        markersEnabled: true,
        strokeEnabled: true,
        strokeColor: col,
        fillEnabled: true,
        fillColor: hx.color(col).alpha(0.2).toString(),
        group: 'some-group',
      });
    });

    graph.render();

    return selection;
  }

  function progressBarExamples () { return [
    hx.progressBar({ value: 0.25 }),
    hx.progressBar({ value: 0.33 }).classed('hx-action', true),
    hx.progressBar({ value: 0.42 }).classed('hx-positive', true),
    hx.progressBar({ value: 0.5 }).classed('hx-warning', true),
    hx.progressBar({ value: 0.58 }).classed('hx-negative', true),
    hx.progressBar({ value: 0.67 }).classed('hx-complement', true),
    hx.progressBar({ value: 0.75 }).classed('hx-contrast', true),
    hx.div('hx-pad'),
    hx.div('hx-pad'),
    hx.div('hx-flag-typography').set([
      hx.div('hx-header-medium').text('Updated Progress Bars (feature flag)'),
      hx.progressBar({
        featureFlags: { useUpdatedClass: true },
        title: 'Title here',
        breakdown: 'Breakdown Text can go here',
        plan: 78,
        done: 38,
      }),
      hx.detached('note').text('Not started state'),
      hx.progressBar({
        featureFlags: { useUpdatedClass: true },
        title: 'Title here',
        breakdown: 'Breakdown Text can go here',
        plan: 80,
      }),
      hx.detached('note').text('Not applicable state (disabled)'),
      hx.progressBar({
        featureFlags: { useUpdatedClass: true },
        title: 'Title here',
        breakdown: 'Breakdown Text can go here',
        disabled: true,
      }),
      hx.detached('note').text('In Progress state'),
      hx.progressBar({
        featureFlags: { useUpdatedClass: true },
        title: 'Buffering Containers',
        breakdown: 'Ambient: 27 / 50\nChill: 10 / 25\nFreezer: 0 / 5',
        plan: 78,
        inProgress: 2,
        done: 38,
      }),
      hx.div('hx-header-medium').text('Secondary progress bars (compact)'),
      hx.progressBar({
        featureFlags: { useUpdatedClass: true },
        title: 'Freezer (eaches)',
        breakdown: 'Breakdown Text can go here',
        done: 5,
        plan: 10,
        compact: true,
      }),
      hx.detached('note').text('Disabled'),
      hx.progressBar({
        featureFlags: { useUpdatedClass: true },
        title: 'Freezer (eaches)',
        breakdown: 'Breakdown Text can go here',
        done: 5,
        plan: 10,
        compact: true,
        disabled: true,
      }),
      hx.detached('note').text('In table'),
      hx.detached('table').class('hx-table hx-flag-table')
        .add(hx.detached('thead')
          .add(hx.detached('tr')
            .add(hx.detached('th').text('Title'))
            .add(hx.detached('th').text('Title'))))
        .add(hx.detached('tbody')
          .add(hx.detached('tr')
            .add(hx.detached('td').text('Something'))
            .add(hx.detached('td').add(hx.progressBar({
              featureFlags: { useUpdatedClass: true },
              done: 9,
              plan: 10,
              compact: true,
            }))))
          .add(hx.detached('tr')
            .add(hx.detached('td').text('Something'))
            .add(hx.detached('td').add(hx.progressBar({
              featureFlags: { useUpdatedClass: true },
              done: 9,
              plan: 10,
              compact: true,
              disabled: true,
            }))))),
      hx.div('hx-header-medium').text('Edge Cases'),
      hx.detached('note').text('No plan'),
      hx.progressBar({
        featureFlags: { useUpdatedClass: true },
        title: 'Freezer (units)',
        breakdown: 'Breakdown Text can go here',
        done: 900,
      }),
      hx.detached('note').text('MVP: show position without planning capabilities yet'),
      hx.progressBar({
        featureFlags: { useUpdatedClass: true },
        title: 'Freezer (units)',
        breakdown: 'Breakdown Text can go here',
        done: 900,
        hidePlan: true,
      }),
      hx.div('hx-card')
        .add(hx.div('hx-card-section hx-card-header')
          .add(hx.div('hx-header-medium').text('Usage in a card')))
        .add(hx.div('hx-card-section hx-no-border')
          .add(hx.progressBar({
            featureFlags: { useUpdatedClass: true },
            title: 'Ambient (units)',
            done: 80,
            plan: 5000,
          })))
        .add(hx.div('hx-card-section hx-no-border')
          .add(hx.progressBar({
            featureFlags: { useUpdatedClass: true },
            title: 'Chill (units)',
            done: 2200,
            inProgress: 100,
            plan: 2100,
          })))
        .add(hx.div('hx-card-section hx-no-border')
          .add(hx.progressBar({
            featureFlags: { useUpdatedClass: true },
            title: 'Freezer (units)',
            done: 900,
            plan: 1200,
          }))) ]) ]; }

  function sidebarExamples () {
    var html = "\n    <div class=\"hx-heading example-heading\">\n      <div class=\"hx-titlebar\">\n        <div class=\"hx-titlebar-container\">\n          <div class=\"hx-titlebar-header example-titlebar\">\n            <a class=\"hx-titlebar-icon\" href=\"#\"><img class=\"hx-logo\"></img></a>\n            <div class=\"hx-titlebar-title\">Title</div>\n            <div class=\"hx-titlebar-subtitle\">Subtitle</div>\n            <div class=\"hx-titlebar-menu-icon-mobile\"><i class=\"fa fa-reorder\"></i></div>\n          </div>\n          <div class=\"hx-titlebar-menu-icons\">\n            <div class=\"hx-titlebar-menu-icons-container\">\n              <a class=\"hx-titlebar-menu-icon\"><i class=\"fa fa-tags\"></i><span class=\"hx-titlebar-menu-text\">Tags</span></a>\n              <a class=\"hx-titlebar-menu-icon\"><i class=\"fa fa-life-ring\"></i><span class=\"hx-titlebar-menu-text\">Help</span></a>\n              <a class=\"hx-titlebar-menu-icon\"><i class=\"fa fa-cog\"></i><span class=\"hx-titlebar-menu-text\">Settings</span></a>\n              <a class=\"hx-titlebar-menu-icon\"><i class=\"fa fa-power-off\"></i><span class=\"hx-titlebar-menu-text\">Sign out</span></a>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"hx-sidebar\">\n      <div class=\"hx-sidebar-title\">Docs</div>\n      <div id=\"collapsible1\" class=\"hx-collapsible\">\n        <div class=\"hx-collapsible-heading\"><i class=\"fa fa-book\"></i> Intro</div>\n        <div class=\"hx-collapsible-content\">\n          <div class=\"hx-sidebar-section\">Getting Started</div>\n          <div class=\"hx-sidebar-section\">FAQs</div>\n        </div>\n      </div>\n      <div id=\"collapsible2\" class=\"hx-collapsible\">\n        <div class=\"hx-collapsible-heading\"><i class=\"fa fa-book\"></i> Components</div>\n        <div class=\"hx-collapsible-content\">\n          <div class=\"hx-sidebar-section\">Titlebar</div>\n          <div class=\"hx-sidebar-section\">Buttons</div>\n          <div class=\"hx-sidebar-section\">Collapsible</div>\n          <div class=\"hx-sidebar-section\">Sidebar</div>\n          <div class=\"hx-sidebar-section\">Notifications</div>\n        </div>\n      </div>\n      <div id=\"collapsible3\" class=\"hx-collapsible\">\n        <div class=\"hx-collapsible-heading\"><i class=\"fa fa-chart\"></i> Drawing & Graphs</div>\n        <div class=\"hx-collapsible-content\">\n          <a href=\"#\" class=\"hx-positive\"><i class=\"fa fa-fw fa-users\"></i>&nbsp; Users</a>\n          <div class=\"hx-sidebar-section\">Drawing</div>\n          <div class=\"hx-sidebar-section\">Plot</div>\n        </div>\n      </div>\n      <div id=\"collapsible4\" class=\"hx-collapsible\">\n        <div class=\"hx-collapsible-heading\"><i class=\"fa fa-spanner\"></i> Utils</div>\n        <div class=\"hx-collapsible-content\">\n          <div class=\"hx-sidebar-section\">Color</div>\n          <div class=\"hx-sidebar-section\">Util</div>\n          <div class=\"hx-sidebar-section\">Request</div>\n          <div class=\"hx-sidebar-section\">Map</div>\n          <div class=\"hx-sidebar-section\">Set</div>\n          <div class=\"hx-sidebar-section\">List</div>\n        </div>\n      </div>\n      <div class=\"hx-sidebar-title\">Examples</div>\n      <div class=\"hx-sidebar-section\">Components</div>\n      <div class=\"hx-sidebar-section hx-selected\">Dashboard</div>\n      <div class=\"hx-sidebar-section\">Graphs</div>\n      <div class=\"hx-sidebar-title\">Links</div>\n      <a href=\"#\" class=\"hx-positive\"><i class=\"fa fa-fw fa-users\"></i>&nbsp; Users</a>\n      <a href=\"#\" class=\"hx-warning\"><i class=\"fa fa-fw fa-key\"></i>&nbsp; Keys</a>\n      <a href=\"#\" class=\"hx-negative\"><i class=\"fa fa-fw fa-book\"></i>&nbsp; Docs</a>\n      <a href=\"#\" class=\"hx-info\"><i class=\"fa fa-fw fa-heartbeat\"></i>&nbsp; Health</a>\n      <div class=\"hx-sidebar-title\">Dashboard states</div>\n      <button id=\"default-btn\" class=\"hx-btn\">Default State</button>\n      <button id=\"positive-btn\" class=\"hx-btn hx-positive\">Positive State</button>\n      <button id=\"warning-btn\" class=\"hx-btn hx-warning\">Warning State</button>\n      <button id=\"negative-btn\" class=\"hx-btn hx-negative\">Negative State</button>\n      <button id=\"info-btn\" class=\"hx-btn hx-info\">Info State</button>\n    </div>\n    <div class=\"hx-content example-content\"></div>\n    ";

    // XXX: Append to the body so the code actually works correctly
    // As we are returning the selection, a lot of the logic won't work
    // We can safely append to the body and return the attached div as it will
    // be relocated in the DOM by the parent `add`
    var sidebar = hx.div('hx-sidebar-page sidebar-example');
    sidebar.node().innerHTML = html;

    new hx.TitleBar(sidebar.select('.example-heading'));
    new hx.Sidebar(sidebar.select('.hx-sidebar'), {
      headerSelector: sidebar.select('.example-titlebar').node(),
      contentSelector: sidebar.select('.example-content').node(),
      autoAddSidebarClass: false,
    });

    return [
      sidebar ];
  }

  function sideCollapsibleExamples () {
    var selection = hx.div('hx-side-collapsible')
      .add(hx.div('hx-side-collapsible-heading-closed').text('Header'))
      .add(hx.div('hx-side-collapsible-heading-open').text('Header'))
      .add(hx.div('hx-side-collapsible-content demo-collapsible-content').text('Content'));

    new hx.SideCollapsible(selection);

    return selection;
  }

  function sliderExamples () { return hx.div('slider-demo')
    .add(hx.slider()); }

  var note$1 = function () { return hx.detached('note'); };
  var br$1 = function () { return hx.detached('br'); };

  function tableExamples () {
    function row(n, clickable) {
      var r = hx.detached('tr');
      if (clickable) {
        r.on('click', function () { return hx.notify(("Row " + n + " clicked!")); });
      }

      return r
        .add(hx.detached('td').text(("Row " + n + " Cell 1")))
        .add(hx.detached('td').text(("Row " + n + " Cell 2")))
        .add(hx.detached('td').add(n === 3 ? hx.div().add(hx.span().text('Line 1')).add(br$1()).add(hx.span().text('Line 2')) : hx.span().text(("Row " + n + " Cell 3"))))
        .add(hx.detached('td').add(n === 4 ? hx.span().text('No action row') : hx.button('hx-btn hx-btn-small').text('Action')));
    }

    function table(clickable) {
      return hx.detached('table').class('hx-table')
        .add(hx.detached('thead')
          .add(hx.detached('tr')
            .add(hx.detached('th').text('Header 1'))
            .add(hx.detached('th').text('Header 2'))
            .add(hx.detached('th').text('Header 3'))
            .add(hx.detached('th').text('Actions'))))
        .add(hx.detached('tbody')
          .add(row(1, clickable))
          .add(row(2, clickable))
          .add(row(3, clickable))
          .add(row(4, clickable))
          .add(row(5, clickable)));
    }

    return hx.div().set([
      table(),
      note$1().text('Table with feature flag to apply font size and other style changes'),
      table().classed('hx-flag-table hx-flag-button', true),
      note$1().text('Table with feature clickable rows'),
      table(true).classed('hx-flag-table hx-flag-button hx-table-clickable-rows', true) ]);
  }

  function tabsExamples () {
    var manualTabDiv = hx.div('hx-flag-tabs')
      .add(hx.div('hx-tab').text('Tab 1').attr('data-content', 'tab-1'))
      .add(hx.div('hx-tab').text('Tab 2').attr('data-content', 'tab-2'))
      .add(hx.div('hx-tab').text('Tab 3').attr('data-content', 'tab-3'))
      .add(hx.div('hx-tabs-content')
        .add(hx.div('hx-tab-content').text('Tab 1 Content').attr('id', 'tab-1'))
        .add(hx.div('hx-tab-content').text('Tab 2 Content').attr('id', 'tab-2'))
        .add(hx.div('hx-tab-content').text('Tab 3 Content').attr('id', 'tab-3')));

    new hx.Tabs(manualTabDiv);

    var contexts = [undefined, 'action', 'positive', 'negative', 'warning', 'info', 'complement', 'contrast'];

    return [
      manualTabDiv,
      hx.detached('br'),
      hx.tabs({
        items: hx.range(8).map(function (_, i) { return ({
          title: ("Tab " + (i + 1)),
          content: ("Tab Content " + (i + 1) + " - " + (hx.cycle(contexts, i)) + " border"),
          context: hx.cycle(contexts, i),
        }); }),
        contentRenderer: function (elem, content) {
          hx.select(elem).style('padding', '1em').text(content);
        },
      }) ];
  }

  function tagInputExamples () { return [
    hx.tagInput({ items: ['tag-1', 'tag-2', 'tag-3'] }),
    hx.detached('br'),
    hx.tagInput({
      classifier: function classifier(value) {
        switch (value) {
          case 'hello':
            return 'hx-positive';
          case 'goodbye':
            return 'hx-negative';
          default:
            return undefined;
        }
      },
      items: ['hello', 'goodbye', 'tag', 'tag2'],
    }) ]; }

  function timePickerExamples () { return [
    hx.timePicker(),
    hx.div(),
    hx.timePicker({
      date: new Date(2019, 4, 22, 0, 20),
    }) ]; }

  function timeSliderExamples () { return hx.div('time-slider-demo')
    .add(hx.timeSlider()); }

  function toggleExamples () { return hx.toggle(); }

  function treeExamples () { return [
    hx.tree({
      renderer: function renderer(elem, data) { hx.select(elem).text(data.name); },
      items: [
        {
          name: 'Parent 1',
          children: [
            {
              name: 'Item 1',
            },
            {
              name: 'Parent 2',
              children: [
                {
                  name: 'Item 2',
                } ],
            } ],
        } ],
    }) ]; }

  function typographyExamples () { return hx.div('hx-flag-typography hx-flag-button hx-flag-tabs').set([
    hx.detached('h1').text('Header 1'),
    hx.detached('h2').text('Header 2'),
    hx.detached('h3').text('Header 3'),
    hx.div(),
    hx.detached('note').text('Helper classes - Sometimes semantically you don\'t want a h1 tag but still want the styles of a h1'),
    hx.div('hx-header-large').text('.hx-header-large'),
    hx.div('hx-header-medium').text('.hx-header-medium'),
    hx.div('hx-header-small').text('.hx-header-small'),
    hx.detached('hr'),
    hx.detached('p').class('hx-text-large').text('This an introduction text. It has a fixed size, and a custom line height, so you can experiment with it. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
    hx.detached('p').text('This is body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. Mauris elit orci, ultricies id fermentum vel, porta et eros. Vestibulum condimentum lectus in convallis feugiat.'),
    hx.detached('p').class('hx-text-small').text('This is small body text used for notes and comments. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium. Mauris elit orci, ultricies id fermentum vel, porta et eros. Vestibulum condimentum lectus in convallis feugiat.'),
    hx.detached('hr'),
    hx.button('hx-btn hx-primary').text('Primary'),
    hx.button('hx-btn hx-secondary').text('Secondary'),
    hx.button('hx-btn').attr('disabled', true).text('Disabled'),
    hx.button('hx-btn hx-primary hx-btn-small').text('Small'),
    hx.button('hx-btn hx-primary hx-btn-micro').text('Micro'),
    hx.detached('hr'),
    hx.badge().text('Default'),
    hx.badge({ type: 'success' }).text('Successful'),
    hx.detached('hr'),
    hx.div('hx-form-label').text('Input label text').add(hx.span('hx-form-label-optional').text('(Optional)')),
    hx.div('hx-form-message').text('Messaging text error'),
    hx.detached('hr'),
    hx.div('hx-tab').text('Tab title'),
    hx.div('hx-tab hx-tab-active').text('Selected tab title') ]); }

  var fluidFactory = function (type) { return function (cls) {
    if ( cls === void 0 ) cls = '';

    return hx.detached(type).class(cls);
   }  };
  var invalidFactory = function (type) { return function (cls) {
    if ( cls === void 0 ) cls = '';

    var sel = hx.detached(type).class(cls);
    sel.node().setCustomValidity('Invalid State');
    return sel;
  }; };

  var label = fluidFactory('label');
  var textarea = fluidFactory('textarea');
  var hr = fluidFactory('hr');
  var vr = fluidFactory('vr');
  var note$2 = fluidFactory('note');

  var invalidInput = invalidFactory('input');
  var invalidTextarea = invalidFactory('textarea');

  function inputExamples () { return hx.div()
    .add(hx.group({ compact: true, horizontal: true })
      .add(hx.section()
        .add(hx.div('hx-header-medium').text('Valid State'))
        .add(hr())
        .add(hx.div('hx-form hx-flag-form')
          .add(hx.div('hx-form-group')
            .add(label('hx-form-label').text('Label'))
            .add(hx.input('hx-input').attr('placeholder', 'Placeholder Text'))))
        .add(hr())
        .add(hx.div('hx-form hx-flag-form')
          .add(hx.div('hx-form-group')
            .add(label('hx-form-label').text('Label'))
            .add(textarea('hx-input-textarea').attr('placeholder', 'Placeholder Text')))
          .add(hx.div('hx-form-group')
            .add(label('hx-form-label').text('Label').add(hx.span('hx-form-label-optional').text('(Optional)')))
            .add(textarea('hx-input-textarea'))))
        .add(hr())
        .add(note$2().text('Disabled and Readonly are visually the same with the exception of the cursor on hover. Disabled fields are not sent when the form is submit'))
        .add(hx.group({ compact: true, horizontal: true })
          .add(hx.section()
            .add(hx.div('hx-header-medium').text('Disabled State'))
            .add(hr())
            .add(hx.div('hx-form hx-flag-form')
              .add(hx.div('hx-form-group')
                .add(hx.input('hx-input').attr('disabled', 'disabled').value('Disabled content here')))))
          .add(vr())
          .add(hx.section()
            .add(hx.div('hx-header-medium').text('Read Only State'))
            .add(hr())
            .add(hx.div('hx-form hx-flag-form')
              .add(hx.div('hx-form-group')
                .add(hx.input('hx-input').attr('readonly', 'readonly').value('Read only content here')))))))
      .add(vr())
      .add(hx.section()
        .add(hx.div('hx-header-medium').text('Invalid State'))
        .add(hr())
        .add(hx.div('hx-form hx-flag-form')
          .add(hx.div('hx-form-group')
            .add(label('hx-form-label').text('Label'))
            .add(invalidInput('hx-input').attr('placeholder', 'Placeholder Text'))
            .add(hx.div('hx-form-message hx-form-message-wrap').text('Warning message will be here and if very long but space does not allow it, wrap into more lines')))
          .add(hx.div('hx-form-group')
            .add(label('hx-form-label').text('Label'))
            .add(invalidInput('hx-input').attr('required', true).value('Input text here'))
            .add(hx.div('hx-form-message').text('Warning message will be here and if very long allow to it to be wider the component'))))
        .add(hr())
        .add(hx.div('hx-form hx-flag-form')
          .add(hx.div('hx-form-group')
            .add(label('hx-form-label').text('Label'))
            .add(invalidTextarea('hx-input-textarea').value('Input text here'))
            .add(hx.div('hx-form-message').text('Warning message will be here and if very long allow to it to be wider the component'))))))
    .add(hr())
    .add(hx.div()
      .add(hx.div('do'))
      .add(hx.div('hx-form hx-flag-form')
        .add(hx.div('hx-form-group')
          .add(label('hx-form-label').text('Label'))
          .add(hx.input('hx-input').attr('placeholder', 'Placeholder Text')))
        .add(hx.div('hx-form-group')
          .add(label('hx-form-label').text('Label'))
          .add(invalidInput('hx-input').attr('placeholder', 'Placeholder Text'))
          .add(hx.div('hx-form-message hx-form-message-wrap').text('Warning message will be here and if very long but space does not allow it, wrap into more lines')))
        .add(hx.div('hx-form-group')
          .add(label('hx-form-label').text('Label'))
          .add(invalidInput('hx-input').attr('required', true).value('Input text here'))
          .add(hx.div('hx-form-message').text('Warning message will be here and if very long allow to it to be wider the component'))))); }

  var fluidFactory$1 = function (type) { return function (cls) {
    if ( cls === void 0 ) cls = '';

    return hx.detached(type).class(cls);
   }  };

  var label$1 = fluidFactory$1('label');
  var hr$1 = fluidFactory$1('hr');
  var vr$1 = fluidFactory$1('vr');

  var checkbox = function (name, checked) { return hx.input().attr('type', 'checkbox')
    .attr('id', name)
    .attr('name', name)
    .class('hx-input-checkbox')
    .prop('checked', !!checked); };

  var invalidCheckbox = function (name) { return checkbox(name).attr('required', true); };

  function checkboxExamples () { return hx.div()
    .add(hx.group({ compact: true, horizontal: true })
      .add(hx.section()
        .add(hx.div('hx-header-medium').text('Valid State'))
        .add(hr$1())
        .add(hx.div('hx-form hx-flag-form')
          .add(hx.div('hx-form-group')
            .add(label$1('hx-form-label').text('Label'))
            .add(hx.div('hx-form-item')
              .add(checkbox('cba'))
              .add(label$1('hx-form-label').attr('for', 'cba').text('Check Box')))
            .add(hx.div('hx-form-item')
              .add(checkbox('cbb'))
              .add(label$1('hx-form-label').attr('for', 'cbb').text('Check Box')))
            .add(hx.div('hx-form-item')
              .add(checkbox('cbc', true))
              .add(label$1('hx-form-label').attr('for', 'cbc').text('Check Box')))
            .add(hx.div('hx-form-item')
              .add(checkbox('cbd', true))
              .add(label$1('hx-form-label').attr('for', 'cbd').text('Check Box'))))))
      .add(vr$1())
      .add(hx.section()
        .add(hx.div('hx-header-medium').text('Invalid State'))
        .add(hr$1())
        .add(hx.div('hx-form hx-flag-form')
          .add(hx.div('hx-form-group')
            .add(label$1('hx-form-label').text('Label'))
            .add(hx.div('hx-form-item')
              .add(invalidCheckbox('cbe'))
              .add(label$1('hx-form-label').attr('for', 'cbe').text('Check Box')))
            .add(hx.div('hx-form-item')
              .add(invalidCheckbox('cbf'))
              .add(label$1('hx-form-label').attr('for', 'cbf').text('Check Box')))
            .add(hx.div('hx-form-message').text('Warning message will be here')))))); }

  var fluidFactory$2 = function (type) { return function (cls) {
    if ( cls === void 0 ) cls = '';

    return hx.detached(type).class(cls);
   }  };

  var label$2 = fluidFactory$2('label');
  var hr$2 = fluidFactory$2('hr');
  var vr$2 = fluidFactory$2('vr');
  var note$3 = fluidFactory$2('note');

  var radio = function (name, value, checked, disabled) { return hx.input().attr('type', 'radio')
    .class('hx-input-radio')
    .attr('name', name)
    .attr('value', value)
    .attr('id', value)
    .prop('checked', !!checked)
    .attr('disabled', disabled ? 'disabled' : undefined); };

  var invalidRadio = function (name, value) { return radio(name, value)
    .attr('required', true); };

  function radioExamples () { return hx.div()
    .add(hx.group({ compact: true, horizontal: true })
      .add(hx.section()
        .add(hx.div('hx-header-medium').text('Valid State'))
        .add(hr$2())
        .add(hx.div('hx-form hx-flag-form')
          .add(hx.div('hx-form-group')
            .add(label$2('hx-form-label').text('Label'))
            .add(hx.div('hx-form-item')
              .add(radio('a', 'a1'))
              .add(label$2('hx-form-label').attr('for', 'a1').text('Radio Button')))
            .add(hx.div('hx-form-item')
              .add(radio('a', 'a2', true))
              .add(label$2('hx-form-label').attr('for', 'a2').text('Radio Button'))))))
      .add(vr$2())
      .add(hx.section()
        .add(hx.div('hx-header-medium').text('Invalid State'))
        .add(hr$2())
        .add(hx.div('hx-form hx-flag-form')
          .add(hx.div('hx-form-group')
            .add(label$2('hx-form-label').text('Label'))
            .add(hx.div('hx-form-item')
              .add(invalidRadio('n', 'n1'))
              .add(label$2('hx-form-label').attr('for', 'n1').text('Radio Button')))
            .add(hx.div('hx-form-item')
              .add(invalidRadio('n', 'n2'))
              .add(label$2('hx-form-label').attr('for', 'n2').text('Radio Button')))
            .add(hx.div('hx-form-message').text('Warning message will be here'))))))
    .add(hr$2())
    .add(hx.div('hx-header-medium').text('Variations'))
    .add(note$3().text('Radio buttons, one option disabled'))
    .add(hx.div('hx-form hx-flag-form')
      .add(hx.div('hx-form-group')
        .add(label$2('hx-form-label').text('Label'))
        .add(hx.div('hx-form-item')
          .add(radio('c', 'c1'))
          .add(label$2('hx-form-label').attr('for', 'c1').text('Radio Button')))
        .add(hx.div('hx-form-item')
          .add(radio('c', 'c2'))
          .add(label$2('hx-form-label').attr('for', 'c2').text('Radio Button')))
        .add(hx.div('hx-form-item')
          .add(radio('c', 'c3'))
          .add(label$2('hx-form-label').attr('for', 'c3').text('Radio Button')))
        .add(hx.div('hx-form-item')
          .add(radio('c', 'c4', false, true))
          .add(label$2('hx-form-label').attr('for', 'c4').text('Radio Button (Not available)')))))
    .add(hr$2())
    .add(hx.group({ compact: true, horizontal: true })
      .add(hx.section()
        .add(hx.div('do'))
        .add(hx.div('hx-form hx-flag-form')
          .add(hx.div('hx-form-group')
            .add(label$2('hx-form-label').text('Label'))
            .add(hx.div('hx-form-item')
              .add(radio('d', 'd1'))
              .add(label$2('hx-form-label').attr('for', 'd1').text('Yes')))
            .add(hx.div('hx-form-item')
              .add(radio('d', 'd2', true))
              .add(label$2('hx-form-label').attr('for', 'd2').text('No'))))))
      .add(hx.section()
        .add(hx.div('dont'))
        .add(hx.div('hx-form hx-flag-form')
          .add(hx.div('hx-form-group')
            .add(label$2('hx-form-label').text('Label'))
            .add(hx.div('hx-form-item')
              .add(radio('e', 'e1'))
              .add(label$2('hx-form-label').attr('for', 'e1').text('Yes')))
            .add(hx.div('hx-form-item')
              .add(radio('e', 'e2', true))
              .add(label$2('hx-form-label').attr('for', 'e2').text('No')))
            .add(hx.div('hx-form-item')
              .add(radio('e', 'e3'))
              .add(label$2('hx-form-label').attr('for', 'e3').text('Yes, but I need more info')))
            .add(hx.div('hx-form-item')
              .add(radio('e', 'e4'))
              .add(label$2('hx-form-label').attr('for', 'e4').text('Yes, but it can be no too')))
            .add(hx.div('hx-form-item')
              .add(radio('e', 'e5'))
              .add(label$2('hx-form-label').attr('for', 'e5').text('Yes, if certain things happen')))
            .add(hx.div('hx-form-item')
              .add(radio('e', 'e6'))
              .add(label$2('hx-form-label').attr('for', 'e6').text('Mostly not')))
            .add(hx.div('hx-form-item')
              .add(radio('e', 'e7'))
              .add(label$2('hx-form-label').attr('for', 'e7').text('No, but I may change my mind')))
            .add(hx.div('hx-form-item')
              .add(radio('e', 'e8'))
              .add(label$2('hx-form-label').attr('for', 'e8').text('Maybe'))))))); }

  function note$4(text) {
    return hx.detached('note')
      .text(text);
  }

  function moreButtonExamples () {
    var items = [
      {
        text: 'A very long function #1',
        onClick: function () { return hx.notify('Clicked More Button Action 1'); },
      },
      {
        text: 'Function #2',
        onClick: function () { return hx.notify('Clicked More Button Action 2'); },
      },
      {
        text: 'Disabled',
        disabled: true,
        onClick: function () { return hx.notify('Clicked More Button Action 3'); },
      },
      {
        text: 'Link #1',
        onClick: '#link-1',
      },
      {
        text: 'Link #2',
        onClick: '#link-2',
      },
      {
        text: 'Disabled',
        disabled: true,
        onClick: '#link-3',
      } ];

    var r1 = hx.detached('tr')
      .add(hx.detached('td').text('Cell 1'))
      .add(hx.detached('td').text('Cell 2'))
      .add(hx.detached('td').text('Normal size (for tablets) --> '))
      .add(hx.detached('td').add(hx.moreButton({ items: items })));

    var r2 = hx.detached('tr')
      .add(hx.detached('td').text('Cell 1'))
      .add(hx.detached('td').text('Cell 2'))
      .add(hx.detached('td').text('Small Button -->'))
      .add(hx.detached('td').add(hx.moreButton({ items: items, size: 'small' })));

    return hx.div().set([
      hx.detached('h2').text('Inside Tables'),
      hx.detached('table').class('hx-table hx-flag-table')
        .add(hx.detached('thead')
          .add(hx.detached('tr')
            .add(hx.detached('th').text('Header 1'))
            .add(hx.detached('th').text('Header 2'))
            .add(hx.detached('th').text('Header 3'))
            .add(hx.detached('th').text('Actions'))))
        .add(hx.detached('tbody')
          .add(r1)
          .add(r2)),
      hx.detached('h2').text('Outside Tables'),
      note$4('The MoreButton attempts to align the bottom right corner of the button with the top right corner of the dropdown. When there is insufficient space, the dropdown is moved to accommodate.'),
      hx.group({ compact: true })
        .add(hx.section({ fixed: true })
          .add(hx.moreButton({ items: items })))
        .add(hx.section())
        .add(hx.section({ fixed: true })
          .add(hx.moreButton({ items: items }))),
      note$4('The more button can be used in an input group when there is a primary action and a list of secondary actions'),
      hx.div('hx-input-group').set([
        hx.button('hx-btn hx-flag-button').text('Primary action'),
        hx.moreButton({ items: items }) ]) ]);
  }

  function dropdownButtonExamples () {
    var items = [
      {
        text: 'Function #1',
        onClick: function () { return hx.notify('Clicked Dropdown Button Action 1'); },
      },
      {
        text: 'Function #2',
        onClick: function () { return hx.notify('Clicked Dropdown Button Action 2'); },
      },
      {
        text: 'Disabled',
        disabled: true,
        onClick: function () { return hx.notify('Clicked Dropdown Button Action 3'); },
      } ];

    var itemsFull = [
      {
        text: 'A very long function #1',
        onClick: function () { return hx.notify('Clicked Dropdown Button Action 1'); },
      },
      {
        text: 'Function #2',
        onClick: function () { return hx.notify('Clicked Dropdown Button Action 2'); },
      },
      {
        text: 'Disabled',
        disabled: true,
        onClick: function () { return hx.notify('Clicked Dropdown Button Action 3'); },
      },
      {
        text: 'Link #1',
        onClick: '#link-1',
      },
      {
        text: 'Link #2',
        onClick: '#link-2',
      },
      {
        text: 'Disabled',
        disabled: true,
        onClick: '#link-3',
      } ];

    var ddContexts = [undefined, 'primary', 'secondary'];
    var ddContextButtons = ddContexts.map(function (type) { return hx.dropdownButton({
      type: type,
      items: type ? itemsFull : items,
      text: type || 'standard',
    }); });

    return hx.div().set([].concat( ddContextButtons ));
  }

  var fluidFactory$3 = function (type) { return function (cls) {
    if ( cls === void 0 ) cls = '';

    return hx.detached(type).class(cls);
   }  };
  var label$3 = fluidFactory$3('label');
  var hr$3 = fluidFactory$3('hr');
  var note$5 = fluidFactory$3('note');

  function singleSelectExamples () {
    var items = [
      { text: 'Name of group', children: ['Item #1', 'Item #2'] },
      { text: 'Name of second group', children: ['Item #3', 'Item #4'] },
      'Item #5 (not in group)',
      'Item #6' ];

    var disabledItem = [
      'Item #1',
      'Item #2',
      'Item #3',
      'Item #4',
      { value: 'Item #5 (not available)', disabled: true },
      'Item #6' ];

    var filterItems = hx.range(100).map(function (x) { return ("Item " + (x + 1)); });
    var delayedItems = function (term, cb) {
      setTimeout(function () { return cb(filterItems); }, Math.random() * 2000);
    };

    return [
      note$5().text('When used outside form elements, behaves as standard inline element'),
      hx.singleSelect(filterItems),
      hx.singleSelect(delayedItems),
      hr$3(),
      hx.group({ compact: true })
        .add(hx.section().set([
          note$5().text('Before Input'),
          hx.div('hx-form hx-flag-form')
            .add(hx.div('hx-form-group')
              .add(label$3('hx-form-label').text('Label'))
              .add(hx.singleSelect(items))),
          note$5().text('After Input'),
          hx.div('hx-form hx-flag-form')
            .add(hx.div('hx-form-group')
              .add(label$3('hx-form-label').text('Label'))
              .add(hx.singleSelect(items, {
                value: 'item 1',
              }))) ]))
        .add(hx.section()
          .add(note$5().text('Error state'))
          .add(hx.div('hx-form hx-flag-form')
            .add(hx.div('hx-form-group')
              .add(label$3('hx-form-label').text('Label'))
              .add(hx.singleSelect(items, {
                required: true,
              }))
              .add(hx.div('hx-form-message').text('Warning message will be here and if very long allow to it to be wider the component'))))),
      hr$3(),
      hx.group({ compact: true })
        .add(hx.section({ fixed: true })
          .add(note$5().text('Drop down with grouped options'))
          .add(note$5().text('First option for each group should be ‘all’ if applicable'))
          .add(hx.div('hx-form hx-flag-form')
            .add(hx.div('hx-form-group')
              .add(label$3('hx-form-label').text('Label'))
              .add(hx.singleSelect(items)))))
        .add(hx.section({ fixed: true })
          .add(note$5().text('Drop down with disabled options'))
          .add(hx.div('hx-form hx-flag-form')
            .add(hx.div('hx-form-group')
              .add(label$3('hx-form-label').text('Label'))
              .add(hx.singleSelect(disabledItem))))),
      hr$3(),
      hx.group({ compact: true })
        .add(hx.section({ fixed: true })
          .add(note$5().text('Drop down with grouped options'))
          .add(note$5().text('First option for each group should be ‘all’ if applicable'))
          .add(hx.div('hx-form hx-flag-form')
            .add(hx.div('hx-form-group')
              .add(label$3('hx-form-label').text('Label'))
              .add(hx.singleSelect(items, {
                showSearch: true,
              }))))),
      hr$3(),
      note$5().text('Examples of Search'),
      hx.group({ compact: true })
        .add(hx.section({ fixed: true })
          .add(note$5().text('Filter with fixed items'))
          .add(hx.div('hx-form hx-flag-form')
            .add(hx.div('hx-form-group')
              .add(label$3('hx-form-label').text('Label'))
              .add(hx.singleSelect(filterItems, {
                showSearch: true,
              })))))
        .add(hx.section({ fixed: true })
          .add(note$5().text('Filter with delayed items'))
          .add(note$5().text('Emulate loading items from backend'))
          .add(hx.div('hx-form hx-flag-form')
            .add(hx.div('hx-form-group')
              .add(label$3('hx-form-label').text('Label'))
              .add(hx.singleSelect(delayedItems, {
                showSearch: true,
              }))))) ];
  }

  function visualizationBarExamples () { return hx.div('hx-flag-typography').set([
    hx.visualizationBar({
      segments: [
        {
          id: 'late',
          label: 'Late',
          count: 11,
          type: 'danger',
        },
        {
          id: 'predictedDelays',
          label: 'Predicted Delays',
          count: 17,
          type: 'warning',
        },
        {
          id: 'onTime',
          label: 'On Time',
          count: 52,
        } ],
    }),
    hx.detached('note').text('With title / breakdown'),
    hx.visualizationBar({
      title: 'Title',
      breakdown: 'Breakdown text can go here',
      segments: [
        {
          id: 'late',
          label: 'Late',
          count: 11,
          type: 'danger',
        },
        {
          id: 'predictedDelays',
          label: 'Predicted Delays',
          count: 17,
          type: 'warning',
        },
        {
          id: 'onTime',
          label: 'On Time',
          count: 52,
        } ],
    }),
    hx.detached('note').text('Alternate colour schemes'),
    hx.visualizationBar({
      title: 'Three segments',
      segments: [
        {
          id: 'healthy-used',
          label: 'Healthy and used',
          count: 22,
          type: 'dark',
        },
        {
          id: 'healthy-unused',
          label: 'Healthy and not in use',
          count: 3,
          type: 'medium',
        },
        {
          id: 'not-in-use',
          label: 'Unavailable',
          count: 99,
          type: 'light',
        } ],
    }),
    hx.visualizationBar({
      title: 'Two segments',
      segments: [
        {
          id: 'healthy-used',
          label: 'Healthy and used',
          count: 5,
          type: 'medium',
        },
        {
          id: 'healthy-unused',
          label: 'Healthy and not in use',
          count: 0,
          type: 'light',
        } ],
    }) ]); }

  function tooltipExamples () { return [
    hx.tooltip({ text: 'A little bit more information', label: 'Text tooltip label' }),
    hx.tooltip({ text: 'A little bit more information', icon: 'fab fa-angellist' }),
    hx.detached('p')
      .add(hx.span().text('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisi purus, sagittis sit amet ipsum sed, dictum placerat massa. '))
      .add(hx.span().text('Morbi id vulputate quam. Nulla ultricies mauris ligula, vitae luctus leo ullamcorper at. '))
      .add(hx.tooltip({
        text: 'Aliquam erat volutpat. Aenean ac lacus volutpat, tempus magna ac, dapibus orci. Pellentesque quis leo fermentum, sodales mi vitae, sodales purus. Ut ultricies mattis nibh ut facilisis. Fusce quis scelerisque ex. Morbi blandit efficitur nisl non lacinia. Suspendisse potenti. In consequat dictum faucibus. Donec ornare elit id ultricies ornare.',
        label: 'Proin eu lacinia odio. ',
      }))
      .add(hx.span().text('Vestibulum porta nisl a justo elementum ullamcorper. Duis sagittis velit auctor fermentum ullamcorper.')) ]; }

  var select = hx.select;
  var selectAll = hx.selectAll;
  var div = hx.div;
  var detached = hx.detached;
  var debounce = hx.debounce;

  window.hx = hx;

  var contentsItems = [];

  function backToTop() {
    window.scrollTo(0, 0);
  }

  function example(title) {
    var slug = title.split(' ').join('-').toLowerCase();
    contentsItems.push({
      title: title,
      slug: slug,
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
    return detached('ul').add(contentsItems.map(function (ref) {
      var title = ref.title;
      var slug = ref.slug;

      return detached('li')
      .add(detached('a')
        .attr('href', ("#" + slug))
        .text(title));
    }));
  }

  function findContentsItem(text) {
    var lcText = text.toLowerCase().replace('back to top', '');
    var sel = selectAll('.sidebar ul a').filter(function (item) { return item.text().toLowerCase() === lcText; });
    var node = sel.node(0);
    if (node) {
      return select(node.parentNode);
    }
    return div();
  }

  function updateURL(value) {
    window.history.replaceState({}, undefined, ("?filter=" + (encodeURIComponent(value)) + (window.location.hash)));
  }

  function applyFilter(value) {
    selectAll('.example-section').forEach(function (sel) {
      var vis = value.toLowerCase().split(', ').some(function (v) { return sel.text().toLowerCase().includes(v); });
      sel.style('display', vis ? undefined : 'none');
      findContentsItem(sel.select('.example-header').text()).style('display', vis ? undefined : 'none');
    });

    updateURL(value);
  }

  var filter = detached('input').class('hx-input')
    .attr('placeholder', 'Filter...')
    .on('keyup', debounce(200, function (e) {
      applyFilter(e.target.value);
      backToTop();
    }));

  var examples = [
    example('Text Styles').add(tryDemo(typographyExamples)),
    example('Input Fields').add(tryDemo(inputExamples)),
    example('Checklists').add(tryDemo(checkboxExamples)),
    example('Radio Buttons').add(tryDemo(radioExamples)),
    example('Palette').add(tryDemo(paletteExamples)),
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
    example('Alerts and Messages').add(tryDemo(alertExamples)),
    example('Notify').add(tryDemo(notifyExamples)),
    example('Number Pickers').add(tryDemo(numberPickerExamples)),
    example('Paginator').add(tryDemo(paginatorExamples)),
    example('Picker').add(tryDemo(pickerExamples)),
    example('Single Select').add(tryDemo(singleSelectExamples)),
    example('Autocomplete Picker').add(tryDemo(autocompletePickerExamples)),
    example('Pivot Table').add(tryDemo(pivotTableExamples)),
    example('Plot').add(tryDemo(plotExamples)),
    example('Progress Bar').add(tryDemo(progressBarExamples)),
    example('Visualization Bar').add(tryDemo(visualizationBarExamples)),
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
    example('Tooltip').add(tryDemo(tooltipExamples)) ];

  select('body')
    .add(div('sidebar')
      .add(filter)
      .add(getContents()))
    .add(detached('p').class('intro').text('This page demonstrates examples of the various Hexagon components available on a single page. Use the filter on the left to search for components'))
    .add(div('examples').set(examples));

  setTimeout(function () {
    if (window.location.search) {
      var filterValueFromWindow = decodeURIComponent(window.location.search.slice(window.location.search.indexOf('=') + 1));
      filter.value(filterValueFromWindow);
      applyFilter(filterValueFromWindow);
    }
  }, 1);

}(hx));
