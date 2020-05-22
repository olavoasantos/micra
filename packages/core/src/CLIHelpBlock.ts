export interface CLIHelpBlockListItem {
  title: string;
  description?: string;
}

export interface CLIHelpBlock {
  printHeader(name: string, version: string | number): void;
  printTitle(title: string): void;
  printSection(title: string, line: string): void;
  printList(title: string, list: CLIHelpBlockListItem[], pad?: number): void;
}
