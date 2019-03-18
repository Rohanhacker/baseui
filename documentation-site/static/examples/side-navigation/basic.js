import React from 'react';
import {Navigation} from 'baseui/side-navigation';

const nav = [
  {
    title: 'Colors',
    subnav: [
      {
        title: 'Primary',
        itemId: '/',
      },
      {
        title: 'Shades',
        itemId: '#level1.1.2',
        subnav: [
          {
            title: 'Dark',
            itemId: '#level1.1.2.1',
          },
          {
            title: 'Light',
            itemId: '#level1.1.2.2',
          },
        ],
      },
    ],
  },
  {
    title: 'Sizing',
    itemId: '#level1.2',
  },
  {
    title: 'Typography',
    itemId: '#level1.3',
  },
];

export default () => (
  <Navigation
    items={nav}
    activeItemId={'/'}
    onChange={item => console.log(item)}
  />
);
