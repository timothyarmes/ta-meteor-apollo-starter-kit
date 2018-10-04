import { matchPath } from 'react-router-dom';
import Constants from '/app/api/constants';

export const getRoute = (pathname) => {
  const route = Constants.ROUTES.find(({ path }) => (
    matchPath(pathname, { path, exact: true })
  ));

  return route;
};

export const getRouteLabel = (pathname) => {
  const route = getRoute(pathname);
  return route ? route.label : undefined;
};
