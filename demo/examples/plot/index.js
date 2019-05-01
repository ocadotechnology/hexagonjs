import {
  div, Graph, range, color, theme,
} from 'hexagon-js';

function randomSign() {
  return Math.round(Math.random());
}

function createData(a, b, c) {
  const offset = 0.1 + Math.random();
  return range(50).map(i => ({
    x: i,
    y: Math.abs(
      offset + a
        * Math.sin(i / 10) + b
        * Math.sin(i / 20) + c
        * Math.sin(i / 40) + Math.sin(i / 50) + Math.sin(i / 100),
    ),
  }));
}

export default () => {
  const selection = div();
  const graph = new Graph(selection);
  const axis = graph.addAxis({
    x: {
      title: 'Time',
    },
    y: {
      title: 'Value',
      scalePaddingMax: 0.1,
    },
  });

  theme().plotColors.forEach((col, i) => {
    axis.addSeries('line', {
      title: `Series ${i + 1}`,
      data: createData(randomSign(), randomSign(), randomSign()),
      labelInterpolated: true,
      markersEnabled: true,
      strokeEnabled: true,
      strokeColor: col,
      fillEnabled: true,
      fillColor: color(col).alpha(0.2).toString(),
      group: 'some-group',
    });
  });

  graph.render();

  return selection;
};
