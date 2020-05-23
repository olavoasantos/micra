export const toTemplateRender = (func: (arg: string) => string) => () => (
  text: string,
  render: (arg: string) => string,
) => func(render(text));
