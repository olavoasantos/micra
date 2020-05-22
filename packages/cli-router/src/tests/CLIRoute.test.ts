import { CLIRoute } from '../CLIRoute';

describe('CLIRoute tests', () => {
  it('should run both middlewares and handler', async () => {
    const handler = jest.fn();
    const middleware = jest.fn();
    const route = new CLIRoute('command', handler).middleware(middleware);

    await route.render({});

    expect(middleware).toHaveBeenCalled();
    expect(handler).toHaveBeenCalled();
  });

  it('should not run the handler if a middleware throws an error', async () => {
    const handler = jest.fn();
    const middleware = jest.fn().mockImplementation(() => {
      throw new Error('failed middleware');
    });
    const route = new CLIRoute('command', handler).middleware(middleware);

    try {
      await route.render({});
    } catch (e) {
    } finally {
      expect(middleware).toHaveBeenCalled();
      expect(handler).not.toHaveBeenCalled();
    }
  });
});
