import React from 'react';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ActionBook from 'material-ui/svg-icons/action/book';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';

export const menuItems = [
  {
    path: '/',
    name: 'Home',
    icon: <ActionHome style={{ display: 'block' }} color="#fff" />,
  },
  {
    path: '/list',
    name: 'Lists',
    icon: <ActionBook style={{ display: 'block' }} color="#fff" />,
  },
  {
    path: '/lesson',
    name: 'Lessons',
    icon: <ActionAssignment style={{ display: 'block' }} color="#fff" />,
  },
  {
    path: '/overview',
    name: 'Overview',
    icon: <EditorInsertChart style={{ display: 'block' }} color="#fff" />,
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: <ActionSettings style={{ display: 'block' }} color="#fff" />,
  },
  {
    path: '/about',
    name: 'About',
    icon: <ActionInfo style={{ display: 'block' }} color="#fff" />,
  },
];
