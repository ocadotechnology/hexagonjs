import {
  select,
  button,
  div,
  Modal,
  modalCenter,
  modalRight,
  modalFullScreen,
  detached,
  Form,
} from 'hexagon-js';

export default () => {
  const modal = new Modal('Demo modal', (node) => {
    select(node).text('Hello');
  });

  const renderBody = () => div().text('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium.');
  const renderFooter = m => ([
    button('hx-btn')
      .text('Standard')
      .on('click', () => m.hide()),
    button('hx-btn hx-secondary hx-margin-left')
      .text('Secondary')
      .on('click', () => m.hide()),
  ]);

  const renderRightBody = () => {
    const theForm = detached('form');

    new Form(theForm, { featureFlags: { useUpdatedStructure: true, displayVertical: true } })
      .addText('Text')
      .addDatePicker('Date Picker');

    return div()
      .add(detached('p').text('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus vulputate diam eu pretium.'))
      .add(div('hx-form hx-flag-form hx-form-vertical')
        .add(theForm));
  };

  const renderRightFooter = thisModal => ([
    button('hx-btn')
      .text('Cancel')
      .on('click', () => thisModal.hide()),
    button('hx-btn hx-primary hx-margin-left')
      .text('Primary')
      .on('click', () => thisModal.hide()),
  ]);

  const renderFullFooter = thisModal => ([
    button('hx-btn')
      .text('Cancel')
      .on('click', () => thisModal.onClose()),
    button('hx-btn hx-primary hx-margin-left')
      .text('Primary')
      .on('click', () => thisModal.hide()),
  ]);

  return div()
    .set([
      button('hx-btn').text('Show Deprecated Modal').on('click', () => modal.show()),
      div('hx-pad'),
      button('hx-btn hx-flag-button').text('Show Center Modal').on('click', () => modalCenter({
        title: 'Lorem ipsum dolor sit',
        renderBody,
        renderFooter,
      })),
      div('hx-pad'),
      button('hx-btn hx-flag-button hx-margin-right').text('Show Right Modal').on('click', () => modalRight({
        title: 'Lorem ipsum dolor sit',
        renderBody: renderRightBody,
        renderFooter: renderRightFooter,
      })),
      button('hx-btn hx-flag-button').text('Show Wide Right Modal').on('click', () => modalRight({
        title: 'Lorem ipsum dolor sit',
        renderBody: renderRightBody,
        renderFooter: renderRightFooter,
        wide: true,
      })),
      div('hx-pad'),
      button('hx-btn hx-flag-button').text('Show Full Screen Modal').on('click', () => modalFullScreen({
        title: 'Lorem ipsum dolor sit',
        renderBody,
        renderFooter: renderFullFooter,
        onClose: thisModal => modalCenter({
          title: 'Discard unsaved changes?',
          renderBody: () => div().text('Any new data you entered will be discarded.'),
          renderFooter: cancelModal => ([
            button('hx-btn')
              .text('Cancel')
              .on('click', () => cancelModal.hide()),
            button('hx-btn hx-primary hx-margin-left')
              .text('Discard')
              .on('click', () => {
                cancelModal.hide();
                thisModal.hide();
              }),
          ]),
        }),
      })),
    ]);
};
