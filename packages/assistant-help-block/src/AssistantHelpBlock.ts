import { Logger, CLIHelpBlock, CLIHelpBlockListItem } from '@micra/core';
import { getMaxLength, breakParagraph } from './helpers';

export class AssistantHelpBlock implements CLIHelpBlock {
  constructor(protected logger: Logger) {}

  public printHeader(name: string, version: string | number) {
    this.logger.log(`${name} - ${version}\n`);
  }

  public printTitle(title: string) {
    this.logger.info(title);
  }

  public printSection(title: string, line: string) {
    this.printTitle(title);
    this.logger.log(line);
  }

  public printList(
    title: string,
    list: CLIHelpBlockListItem[],
    pad: number = getMaxLength(list, 'title'),
  ) {
    this.printTitle(title);
    list.forEach((item) => {
      this.logger.log(
        `${item.title.padEnd(pad, ' ')}  ${breakParagraph(item.description ?? '', pad)}`,
      );
    });
  }
}
