import { MarkdownStreamParser } from './parser';

const outputElement = document.getElementById('markdown-output');
if (!outputElement) throw new Error('Output element not found');

const parser = new MarkdownStreamParser(outputElement);

(window as any).renderMarkdown = (chunk: string) => parser.renderMarkdown(chunk);