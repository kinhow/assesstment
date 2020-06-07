import { createBrowserHistory, createHashHistory } from 'history';

// export const history = createBrowserHistory({
//   basename: (window.location.search[0] === '?' &&
//   window.location.href.indexOf(window.location.search) !== -1 
//   ? window.location.search.slice(0, window.location.search.indexOf('/')) : ''),
// });

export const history = createBrowserHistory();

export const hashHistory = createHashHistory({});