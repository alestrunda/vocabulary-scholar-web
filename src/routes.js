import About from './screens/About';
import Home from './screens/Home';
import Lesson from './screens/Lesson';
import LessonRunning from './screens/LessonRunning';
import Lessons from './screens/Lessons';
import List from './screens/List';
import ListPredefined from './screens/ListPredefined';
import Lists from './screens/Lists';
import Overview from './screens/Overview';
import PrivacyPolicy from './screens/PrivacyPolicy';
import Settings from './screens/Settings';
import TermsAndConditions from './screens/TermsAndConditions';
import Word from './screens/Word';

export const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/about',
    exact: true,
    component: About,
  },
  {
    path: '/lesson',
    exact: true,
    component: Lessons,
  },
  {
    path: '/lesson/:id',
    exact: true,
    component: Lesson,
  },
  {
    path: '/lesson/run/:id',
    exact: true,
    component: LessonRunning,
  },
  {
    path: '/list',
    exact: true,
    component: Lists,
  },
  {
    path: '/list/predefined/:id',
    exact: true,
    component: ListPredefined,
  },
  {
    path: '/list/:id',
    exact: true,
    component: List,
  },
  {
    path: '/overview',
    exact: true,
    component: Overview,
  },
  {
    path: '/privacy-policy',
    exact: true,
    component: PrivacyPolicy,
  },
  {
    path: '/settings',
    exact: true,
    component: Settings,
  },
  {
    path: '/terms-and-conditions',
    exact: true,
    component: TermsAndConditions,
  },
  {
    path: '/word/:entry',
    exact: true,
    component: Word,
  },
];
