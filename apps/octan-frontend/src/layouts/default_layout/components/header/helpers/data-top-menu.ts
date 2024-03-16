import { MenuItem } from '../nav/helpers';

export const dataTopMenu: MenuItem[] = [
  {
    id: '1',
    text: 'Reputation Board',
    title: 'Reputation board',
    url: '/reputation-board',
    pattern: '^/$|/reputation-board',

    isOpenAsNewTab: false,
    isInternalUrl: true,
  },
  {
    id: '2',
    text: '1ID Dashboard',
    title: '1ID',
    url: '/1-id',
    isOpenAsNewTab: false,
    isInternalUrl: true,
  },
  {
    id: '3',
    text: 'Resources',
    title: 'Resources',
    url: '/resources',
    isOpenAsNewTab: false,
    isInternalUrl: true,
    loginRequired: false,
    dropDownMenu: true,
  },
  {
    id: '4',
    text: 'Analytics Services',
    title: 'Analytics Service',
    url: '/service',
    isOpenAsNewTab: false,
    isInternalUrl: false,
    loginRequired: false,
    externalUrl: 'https://octan.network/blog/analytics-services/',
  },
];
