import { Context } from 'app/context/types';
import lodash from 'lodash';
import { flatten } from 'helpers/flatten';

export const listTemplates = async ({ parser, logger, exit }: Context) => {
  if (parser.getOption('list')?.value === true) {
    const templateDictionary = config<Record<string, any>>('template');

    Object.keys(flatten(templateDictionary)).forEach(template => {
      logger.info(`- ${template}`);
    });

    exit();
  }
}
