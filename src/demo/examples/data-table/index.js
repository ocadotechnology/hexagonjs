import {
  div, detached, dataTable, objectFeed, filterTypes, range, cycle,
} from 'hexagon-js';

const br = () => detached('br');
const note = () => detached('note');

export default () => {
  const professions = [
    'Developer',
    'Designer',
    'Engineer',
    'Builder',
    'Electrician',
  ];
  const feed = objectFeed({
    headers: [
      { name: 'Name', id: 'name' },
      { name: 'Age', id: 'age' },
      { name: 'Profession', id: 'profession' },
    ],
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
      },
    ],
  });

  const randomFeed = objectFeed({
    headers: [
      { name: 'Name', id: 'name' },
      { name: 'Age', id: 'age' },
      { name: 'Profession', id: 'profession' },
    ],
    rows: range(1000).map((_, idx) => ({
      id: idx,
      cells: {
        name: `Name ${idx}`,
        age: Math.floor((idx + 10) * Math.random()),
        profession: cycle(professions, Math.floor((idx + 10) * Math.random()) % professions.length),
      },
    })),
  });

  return [
    dataTable({ feed }),
    br(),
    note().text('Data table with table styles feature flag'),
    dataTable({ feed }).classed('hx-flag-table', true),
    br(),
    dataTable({
      feed,
      rowCollapsibleLookup: () => true,
      collapsibleRenderer: () => div().text('Bob'),
    }),
    br(),
    dataTable({
      feed,
      selectEnabled: true,
    }),
    br(),
    dataTable({
      feed,
      filterEnabled: false, // Disable the normal filter
      advancedSearchEnabled: true, // Enable the advanced search
      advancedSearchCriteria: filterTypes(), // Enable all the filter types
      advancedSearch: [
        [
          { column: 'age', term: '26', criteria: 'greater' },
        ],
        [
          { column: 'name', term: 'Bob', criteria: 'exact' },
        ],
      ],
    }),
    br(),
    dataTable({
      feed: randomFeed,
    }),
  ];
};
