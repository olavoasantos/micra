import { path } from '../path';
import { toMatch, toPathBuilder, toTest } from '../helpers';

it('should pass', () => {
  const parsePath = path();

  const route = parsePath(':lng(fr)?/restaurants/:city?');
  const test = toTest(route);
  const match = toMatch(route);
  const pathTo = toPathBuilder(route);

  console.log({
    test: test('fr/restaurants//'),
    match: match('restaurants/winnipeg'),
    pathTo: pathTo({ lng: 'fr', city: 'toronto' }),
  });
});
