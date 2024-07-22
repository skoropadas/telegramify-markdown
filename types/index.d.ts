export type UnsupportedTagsStrategy = 'escape' | 'remove' | 'keep'

declare module 'telegramify-markdown' {

  /**
   * Converts markdown to Telegram's format.
   * @param markdown The markdown to convert.
   * @param unsupportedTagsStrategy The strategy to use for unsupported tags.
   */
  function convert(markdown: string, unsupportedTagsStrategy: UnsupportedTagsStrategy): string

  export = convert
}
