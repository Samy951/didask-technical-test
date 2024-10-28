import { MarkdownParser } from './types';


export class MarkdownStreamParser implements MarkdownParser {
    private currentBuffer: string = '';
    private isInCodeBlock: boolean = false;
    private currentCodeBlock: HTMLPreElement | null = null;

    constructor(private outputElement: HTMLElement) {}

    public renderMarkdown(chunk: string): void {
        this.currentBuffer += chunk;
        console.log('nouveau chunk:', chunk);

        if (this.currentBuffer.includes('\n')) {
            const lines = this.currentBuffer.split('\n');
            this.currentBuffer = lines.pop() || '';

            lines.forEach(line => {
                if (line.trim().startsWith('```')) {
                    if (!this.isInCodeBlock) {
                        this.isInCodeBlock = true;
                        this.currentCodeBlock = document.createElement('pre');
                        this.outputElement.appendChild(this.currentCodeBlock);
                    } else {
                        this.isInCodeBlock = false;
                        this.currentCodeBlock = null;
                    }
                    return;
                }

                if (this.isInCodeBlock && this.currentCodeBlock) {
                    this.currentCodeBlock.textContent += line + '\n';
                    return;
                }

                if (line.startsWith('#')) {
                    let level = 0;
                    while (line[level] === '#' && level < 3) {
                        level++;
                    }
                    if (level > 0 && level <= 3) {
                        const titleContent = line.slice(level).trim();
                        const titleElement = document.createElement(`h${level}`);
                        titleElement.textContent = titleContent;
                        this.outputElement.appendChild(titleElement);
                    }
                }
                else if (line.trim()) {
                    const spaceAtEnd = line.match(/\s*$/)?.[0].length || 0;
                    const textElement = document.createElement('div');

                    if (line.includes('`') && !line.includes('```')) {
                        const parts = line.split('`');
                        textElement.textContent = '';

                        if (parts[0]) {
                            textElement.appendChild(document.createTextNode(parts[0]));
                        }

                        if (parts[1]) {
                            const codeElement = document.createElement('pre');
                            codeElement.style.display = 'inline';
                            codeElement.textContent = parts[1];
                            textElement.appendChild(codeElement);
                        }

                        if (parts[2]) {
                            textElement.appendChild(document.createTextNode(parts[2]));
                        }

                        this.outputElement.appendChild(textElement);
                    }
                    else if (!line.includes('```')) {
                        if (spaceAtEnd >= 2) {
                            textElement.textContent = line.trimEnd();
                            this.outputElement.appendChild(textElement);
                        } else {
                            const lastElement = this.outputElement.lastElementChild;
                            if (lastElement instanceof HTMLDivElement) {
                                lastElement.textContent += ' ' + line.trim();
                            } else {
                                textElement.textContent = line.trim();
                                this.outputElement.appendChild(textElement);
                            }
                        }
                    }
                }
            });
        }
    }
}