import { MarkdownParser } from './types';

class LineState {
    type: 'unknown' | 'heading' | 'paragraph' | 'codeBlock' = 'unknown';
    headingLevel: number = 0;
    content: string = '';
    element: HTMLElement | null = null;
    isInCodeBlock: boolean = false;
    codeBlockLanguage: string = '';
    isInInlineCode: boolean = false;
}

export class MarkdownStreamParser implements MarkdownParser {
    private accumulatedText: string = '';
    private outputElement: HTMLElement;
    private codeBlockContent: string = '';
    private currentParagraph: HTMLElement | null = null;

    constructor(outputElement: HTMLElement) {
        this.outputElement = outputElement;
    }

    renderMarkdown(chunk: string): void {
        this.accumulatedText += chunk;
        this.outputElement.innerHTML = '';

        const lines = this.accumulatedText.split('\n');
        const state = new LineState();

        for (let line of lines) {
            line = line.trimRight();

            if (line.trim() === '') {
                this.currentParagraph = null;
                state.type = 'unknown';
                continue;
            }

            if (line.startsWith('#')) {
                const match = line.match(/^(#{1,3})\s+(.+)$/);
                if (match) {
                    const level = match[1].length;
                    const content = match[2];
                    const heading = this.createNewElement('heading', level);
                    heading.textContent = content;
                    this.currentParagraph = null;
                    continue;
                }
            }

            if (line.startsWith('```')) {
                if (!state.isInCodeBlock) {
                    state.isInCodeBlock = true;
                    state.codeBlockLanguage = line.slice(3).trim();
                    state.element = this.createNewElement('codeBlock');
                    if (state.codeBlockLanguage) {
                        state.element.setAttribute('data-language', state.codeBlockLanguage);
                    }
                    this.codeBlockContent = '';
                } else {
                    if (state.element) {
                        state.element.textContent = this.codeBlockContent;
                    }
                    state.isInCodeBlock = false;
                    state.element = null;
                }
                continue;
            }

            if (state.isInCodeBlock) {
                this.codeBlockContent += line + '\n';
                if (state.element) {
                    state.element.textContent = this.codeBlockContent;
                }
                continue;
            }

            const sentences = line.split(/(?<=\.)\s+/);
            for (let sentence of sentences) {
                if (!sentence.trim()) continue;

                if (!this.currentParagraph) {
                    this.currentParagraph = this.createNewElement('paragraph');
                }

                if (sentence.includes('`')) {
                    const processedLine = sentence.replace(/`([^`]+)`/g, (_, code) =>
                        `<pre class="inline">${code}</pre>`
                    );
                    this.currentParagraph.innerHTML = this.currentParagraph.innerHTML +
                        (this.currentParagraph.innerHTML ? ' ' : '') + processedLine;
                } else {
                    this.currentParagraph.textContent += (this.currentParagraph.textContent ? ' ' : '') + sentence;
                }

                if (sentence.endsWith('.')) {
                    this.currentParagraph = null;
                }
            }

            if (line.endsWith('  ')) {
                this.currentParagraph = null;
            }
        }

        if (state.isInCodeBlock && state.element) {
            state.element.textContent = this.codeBlockContent;
        }
    }

    private createNewElement(type: 'heading' | 'paragraph' | 'codeBlock', level: number | null = null): HTMLElement {
        let element: HTMLElement;
        switch (type) {
            case 'heading':
                element = document.createElement(`h${level}`) as HTMLElement;
                break;
            case 'paragraph':
                element = document.createElement('div');
                break;
            case 'codeBlock':
                element = document.createElement('pre');
                break;
            default:
                element = document.createElement('div');
        }
        this.outputElement.appendChild(element);
        return element;
    }
}
