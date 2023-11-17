// markdown-it plugin for generating line numbers.
// It depends an preWrapper plugin.

import type MarkdownIt from "markdown-it";

export const lineNumberPlugin = (md: MarkdownIt) => {
  const fence = md.renderer.rules.fence!;
  md.renderer.rules.fence = (...args) => {
    const rawCode = fence(...args);
    const code = rawCode.slice(rawCode.indexOf('<code>'), rawCode.indexOf('</code>'));

    const lines = code.split('\n');
    const lineNumbersCode = [...Array(lines.length - 1)]
      .map((_line, index) => `<span class="line-number">${index + 1}</span><br>`)
      .join('');

    const lineNumbersWrapperCode = `<div class="line-numbers-wrapper">${lineNumbersCode}</div>`;

    return rawCode
      .replace(/<\/div>$/, `${lineNumbersWrapperCode}</div>`)
      .replace(/"(language-\w+)"/, '"$1 line-numbers-mode"');
  };
};
