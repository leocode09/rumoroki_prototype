export type Autocomplete<U extends T, T = string> = U | (T & Record<never, never>);

import { pathToRegexp } from 'path-to-regexp';

type WithPathPatternWildcard<T = string> = `${T & string}(.*)`;

type RouteMatcherRoutes = Autocomplete<WithPathPatternWildcard>;

export type RouteMatcherParam = Array<RegExp | RouteMatcherRoutes> | RegExp | RouteMatcherRoutes;


export const createRouteMatcher = (routes: RouteMatcherParam) => {
  const routePatterns = [routes || ''].flat().filter(Boolean);
  const matchers = precomputePathRegex(routePatterns);
  return (req: Request) => matchers.some(matcher => matcher.test(new URL(req.url).pathname));
};

const precomputePathRegex = (patterns: Array<string | RegExp>) => {
  return patterns.map(pattern => (pattern instanceof RegExp ? pattern : paths.toRegexp(pattern)));
};

export const paths = {
  toRegexp: (path: string) => {
    try {
      return pathToRegexp(path);
    } catch (e: any) {
      throw new Error(
        `Invalid path: ${path}.\nConsult the documentation of path-to-regexp here: https://github.com/pillarjs/path-to-regexp\n${e.message}`,
      );
    }
  },
};