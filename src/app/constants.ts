export default class Constant {
  static contents_css = '@charset "UTF-8";\n' +
    '/**\n' +
    '* @fileoverview style for content\n' +
    '* @author NHN Ent. FE Development Lab <dl_javascript@nhnent.com>\n' +
    '*/\n' +

    '.CodeMirror {\n' +
    '    font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;\n' +
    '}\n' +

    '.content *:not(table) {\n' +
    '    line-height: 160%;\n' +
    '    box-sizing: content-box;\n' +
    '}\n' +
    '.content i,\n' +
    '.content cite,\n' +
    '.content em,\n' +
    '.content var,\n' +
    '.content address,\n' +
    '.content dfn {\n' +
    '    font-style: italic;\n' +
    '}\n' +

    '.content strong {\n' +
    '    font-weight: bold;\n' +
    '}\n' +

    '.content p {\n' +
    '    margin: 10px 0;\n' +
    '    color: #555;\n' +
    '}\n' +

    '.content > h1:first-of-type,\n' +
    '.content > div > div:first-of-type h1 {\n' +
    '      margin-top: 14px;\n' +
    '}\n' +

    '.content h1,\n' +
    '.content h2,\n' +
    '.content h3,\n' +
    '.content h5 {\n' +
    '    font-weight: bold;\n' +
    '}\n' +

    '.content h1 {\n' +
    '    font-size: 1.6rem;\n' +
    '    line-height: 28px;\n' +
    '    border-bottom: 3px double #999;\n' +
    '    margin: 52px 0 15px 0;\n' +
    '    padding-bottom: 7px;\n' +
    '    color: #000;\n' +
    '}\n' +

    '.content h2 {\n' +
    '    font-size: 1.3rem;\n' +
    '    line-height: 23px;\n' +
    '    border-bottom: 1px solid #dbdbdb;\n' +
    '    margin: 30px 0 13px 0;\n' +
    '    padding-bottom: 7px;\n' +
    '    color: #333;\n' +
    '}\n' +

    '.content h3,\n' +
    '.content h4 {\n' +
    '    font-size: 1.2rem;\n' +
    '    line-height: 18px;\n' +
    '    margin: 20px 0 2px;\n' +
    '    color: #333;\n' +
    '}\n' +

    '.content h5,\n' +
    '.content h6 {\n' +
    '    font-size: 1rem;\n' +
    '    line-height: 17px;\n' +
    '    margin: 10px 0 -4px;\n' +
    '    color: #333;\n' +
    '}\n' +

    '.content blockquote {\n' +
    '    margin: 15px 0;\n' +
    '}\n' +

    '.content blockquote {\n' +
    '    border-left: 4px solid #dddddd;\n' +
    '    padding: 0 15px;\n' +
    '    color: #777777;\n' +
    '}\n' +

    '.content blockquote > :first-child {\n' +
    '    margin-top: 0;\n' +
    '}\n' +

    '.content  blockquote > :last-child {\n' +
    '    margin-bottom: 0;\n' +
    '}\n' +

    '.content pre,\n' +
    '.content code {\n' +
    '    font-family: Consolas, Courier, "Apple SD 산돌고딕 Neo", -apple-system, "Lucida Grande", "Apple SD Gothic Neo", "맑은 고딕", "Malgun Gothic", "Segoe UI", "돋움", dotum, sans-serif;\n' +
    '    border: 0;\n' +
    '    border-radius: 0;\n' +
    '}\n' +

    '.content pre {\n' +
    '    margin: 2px 0 8px;\n' +
    '    padding: 18px;\n' +
    '    background-color: #f5f7f8;\n' +
    '}\n' +

    '.content code {\n' +
    '    color: #c1788b;\n' +
    '    padding: 4px 4px 2px 0;\n' +
    '    letter-spacing: -0.3px;\n' +
    '}\n' +

    '.content pre code {\n' +
    '    padding: 0;\n' +
    '    color: inherit;\n' +
    '    white-space: pre-wrap;\n' +
    '    background-color: transparent;\n' +
    '}\n' +

    '.content pre.addon {\n' +
    '    border: 1px solid #e8ebed;\n' +
    '    background-color: #fff;\n' +
    '}\n' +

    '.content img {\n' +
    '    margin: 4px 0 10px;\n' +
    '    box-sizing: border-box;\n' +
    '    vertical-align: top;\n' +
    '    max-width: 100%;\n' +
    '}\n' +

    '.content table {\n' +
    '    margin: 2px 0 14px;\n' +
    '    color: #555;\n' +
    '    width: auto;\n' +
    '    border-collapse: collapse;\n' +
    '    box-sizing: border-box;\n' +
    '}\n' +

    '.content table th, \n' +
    '.content table td {\n' +
    '    height: 32px;\n' +
    '    padding: 5px 14px 5px 12px;\n' +
    '}\n' +

    '.content table td {\n' +
    '    border: 1px solid #eaeaea;\n' +
    '}\n' +

    '.content table th {\n' +
    '    border: 1px solid #72777b;\n' +
    '    border-top: 0;\n' +
    '    background-color: #7b8184;\n' +
    '    font-weight: 300;\n' +
    '    color: #fff;\n' +
    '    padding-top: 6px;\n' +
    '}\n' +

    '.content ul,\n' +
    '.content menu,\n' +
    '.content ol,\n' +
    '.content dir {\n' +
    '    display: block;\n' +
    '    list-style-type: disc;\n' +
    '    padding-left: 17px;\n' +
    '    margin: 6px 0 10px;\n' +
    '    color: #555;\n' +
    '}\n' +

    '.content ol {\n' +
    '    list-style-type: decimal;\n' +
    '}\n' +

    '.content ul ul,\n' +
    '.content ul ol,\n' +
    '.content ol ol,\n' +
    '.content ol ul {\n' +
    '    margin-top: 0 !important;\n' +
    '    margin-bottom: 0 !important;\n' +
    '}\n' +

    '.content ul li {\n' +
    '    position: relative;\n' +
    '}\n' +
    '.content ul p, ol p {\n' +
    '    margin: 0;\n' +
    '}\n' +
    '.content ul li.task-list-item:before,\n' +
    '.content pre ul li:before {\n' +
    '    content: "";\n' +
    '}\n' +
    '.content hr {\n' +
    '    border-top: 1px solid #eee;\n' +
    '    margin: 16px 0;\n' +
    '}\n' +
    '.content a {\n' +
    '    text-decoration: underline;\n' +
    '    color: #5286bc;\n' +
    '}\n' +

    '.content a:hover {\n' +
    '    color: #007cff;\n' +
    '}\n' +

    '.content {\n' +
    '    font-size: 13px;\n' +
    '    margin: 0;\n' +
    '    padding: 0;\n' +
    '    max-width: 752px;' +
    '    margin: 0 auto;' +
    '}\n' +
    '.content .task-list-item {\n' +
    '    border: 0;\n' +
    '    list-style: none;\n' +
    '    padding-left: 22px;\n' +
    '    margin-left: -22px;\n' +
    '    background-repeat: no-repeat;\n' +
    '    background-size: 16px 16px;\n' +
    '    background-position: 0 2px;\n' +
    '    background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAADdJREFUKBVjvHv37n8GMgALSI+SkhJJWu/du8fARJIOJMWjGpECA505GjjoIYLEB6dVUNojFQAA/1MJUFWet/4AAAAASUVORK5CYII=\');\n' +
    '}\n' +
    '.content .task-list-item.checked {\n' +
    '    background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAMpJREFUKBVjjJ/64D8DGYCJDD1gLbTVyM3OxJDiJMzAxcYIdyALnIWDAdJU7i/OICfCxsDMxMgwc88bwk5F1vTs/W+GFUffwY2H+1FBlI2hLliCQYCbGSyJrqlzwwuGj9//YWoMtRBgUBJnZ6gMEGeQFWaFOw9kE7omkG5GWDyCPF7mJ86gIMbO8P//fwZGRkYGXJpAGuFO/fbrP0PXppcMD179JKgJRSOIA9N8/NZXrM4DqYEBjOgAaYYFOUwRNhruVGyS+MTI1ggAx8NTGcUtFVQAAAAASUVORK5CYII=\');\n' +
    '}\n' +
    '.content .task-list-item input[type=\'checkbox\'],\n' +
    '.content .task-list-item .task-list-item-checkbox {\n' +
    '    margin-left: -17px;\n' +
    '    margin-right: 3.8px;\n' +
    '    margin-top: 3px;\n' +
    '}\n';

  static highlight_css = '/*\n' +

    'github.com style (c) Vasily Polovnyov <vast@whiteants.net>\n' +

    '*/\n' +

    '.hljs {\n' +
    '  display: block;\n' +
    '  overflow-x: auto;\n' +
    '  padding: 0.5em;\n' +
    '  color: #333;\n' +
    '  background: #f8f8f8;\n' +
    '}\n' +

    '.hljs-comment,\n' +
    '.hljs-quote {\n' +
    '  color: #998;\n' +
    '  font-style: italic;\n' +
    '}\n' +

    '.hljs-keyword,\n' +
    '.hljs-selector-tag,\n' +
    '.hljs-subst {\n' +
    '  color: #333;\n' +
    '  font-weight: bold;\n' +
    '}\n' +

    '.hljs-number,\n' +
    '.hljs-literal,\n' +
    '.hljs-variable,\n' +
    '.hljs-template-variable,\n' +
    '.hljs-tag .hljs-attr {\n' +
    '  color: #008080;\n' +
    '}\n' +

    '.hljs-string,\n' +
    '.hljs-doctag {\n' +
    '  color: #d14;\n' +
    '}\n' +

    '.hljs-title,\n' +
    '.hljs-section,\n' +
    '.hljs-selector-id {\n' +
    '  color: #900;\n' +
    '  font-weight: bold;\n' +
    '}\n' +

    '.hljs-subst {\n' +
    '  font-weight: normal;\n' +
    '}\n' +

    '.hljs-type,\n' +
    '.hljs-class .hljs-title {\n' +
    '  color: #458;\n' +
    '  font-weight: bold;\n' +
    '}\n' +

    '.hljs-tag,\n' +
    '.hljs-name,\n' +
    '.hljs-attribute {\n' +
    '  color: #000080;\n' +
    '  font-weight: normal;\n' +
    '}\n' +

    '.hljs-regexp,\n' +
    '.hljs-link {\n' +
    '  color: #009926;\n' +
    '}\n' +

    '.hljs-symbol,\n' +
    '.hljs-bullet {\n' +
    '  color: #990073;\n' +
    '}\n' +

    '.hljs-built_in,\n' +
    '.hljs-builtin-name {\n' +
    '  color: #0086b3;\n' +
    '}\n' +

    '.hljs-meta {\n' +
    '  color: #999;\n' +
    '  font-weight: bold;\n' +
    '}\n' +

    '.hljs-deletion {\n' +
    '  background: #fdd;\n' +
    '}\n' +

    '.hljs-addition {\n' +
    '  background: #dfd;\n' +
    '}\n' +

    '.hljs-emphasis {\n' +
    '  font-style: italic;\n' +
    '}\n' +

    '.hljs-strong {\n' +
    '  font-weight: bold;\n' +
    '}\n';
}
