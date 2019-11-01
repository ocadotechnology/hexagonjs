import { span, i } from 'utils/selection';
import { Dropdown } from 'components/dropdown';


function tooltip({ icon, label, text } = {}) {
  if (!text) {
    throw new Error('tooltip: No text provided for the tooltip');
  }

  if (icon && label) {
    throw new Error('tooltip: You can only use an icon or a label when creating a tooltip');
  }

  const tooltipParent = span(label ? 'hx-tooltip-label' : 'hx-tooltip-icon');
  const iconElement = icon ? i(icon) : undefined;


  tooltipParent.text(label);
  tooltipParent.add(iconElement);


  new Dropdown(tooltipParent, text,
    {
      align: 'up',
      ddClass: 'hx-tooltip',
      mode: 'hover',
    });

  return tooltipParent;
}

export { tooltip };
