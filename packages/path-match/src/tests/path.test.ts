import { path } from '../path';

it('should pass', () => {
  const parsePath = path();

  parsePath(':lng(fr)?/restaurants/:city?');
});
