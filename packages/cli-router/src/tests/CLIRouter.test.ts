import { CLIRouter } from '../CLIRouter';

describe('CLIRouter tests', () => {
  it('should return false if a route is not defined', async () => {
    const router = new CLIRouter();

    expect(router.has('random-route')).toBeFalsy();
  });

  it('should return true if a route is not defined', async () => {
    const router = new CLIRouter();

    router.command('random-route', jest.fn());

    expect(router.has('random-route')).toBeTruthy();
  });

  it('should return all routes', async () => {
    const router = new CLIRouter();
    router.command('random-route', jest.fn());

    const routes = router.routes();

    expect(routes).toHaveLength(1);
    expect(routes[0].path).toBe('random-route');
  });

  it('should retrieve a route with a given path', async () => {
    const router = new CLIRouter();
    router.command('random-route', jest.fn());

    const route = router.find('random-route');

    expect(route).toBeDefined();
    expect(route?.path).toBe('random-route');
  });
});
