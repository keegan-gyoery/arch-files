"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mustache_1 = require("mustache");
const template_data_1 = require("./template_data");
class DocstringFactory {
    constructor(template, quoteStyle = '"""', startOnNewLine = false, includeDescription = true, includeName = false, guessTypes = true) {
        this.quoteStyle = quoteStyle;
        this.startOnNewLine = startOnNewLine;
        this.guessTypes = guessTypes;
        this.includeName = includeName;
        this.includeDescription = includeDescription;
        this.template = template;
    }
    generateDocstring(docstringParts, noOpeningQuotes = false) {
        const templateData = new template_data_1.TemplateData(docstringParts, this.guessTypes, this.includeName, this.includeDescription);
        let docstring = mustache_1.render(this.template, templateData);
        docstring = this.addSnippetPlaceholders(docstring);
        docstring = this.condenseNewLines(docstring);
        docstring = this.condenseTrailingNewLines(docstring);
        docstring = this.commentText(docstring, noOpeningQuotes);
        return docstring;
    }
    addSnippetPlaceholders(snippetString) {
        let placeholderNumber = 0;
        snippetString = snippetString.replace(/@@@/g, () => {
            return (++placeholderNumber).toString();
        });
        return snippetString;
    }
    condenseNewLines(snippet) {
        return snippet.replace(/\n{3,}/gm, "\n\n");
    }
    condenseTrailingNewLines(snippet) {
        return snippet.replace(/\n+$/g, "\n");
    }
    commentText(snippetString, noOpeningQuotes) {
        if (this.startOnNewLine) {
            snippetString = "\n" + snippetString;
        }
        if (noOpeningQuotes) {
            return snippetString + this.quoteStyle;
        }
        else {
            return this.quoteStyle + snippetString + this.quoteStyle;
        }
    }
}
exports.DocstringFactory = DocstringFactory;
//# sourceMappingURL=docstring_factory.js.map