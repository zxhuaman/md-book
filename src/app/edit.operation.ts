import {Tool} from './tool';

export enum Operation {
  BOLD = 'bold',
  ITALIC = 'italic',
  HEADER = 'header',
  UNDERLINE = 'underline',
  STRIKETHROUGH = 'strikethrough',
  MARK = 'mark',
  SUPERSCRIPT = 'superscript',
  SUBSCRIPT = 'subscript',
  ALIGN_LEFT = 'align_left',
  ALIGN_CENTER = 'align_center',
  ALIGN_RIGHT = 'align_right',
  QUOTE = 'quote',
  ORDERED_LIST = 'ordered_list',
  UNORDERED_LIST = 'unordered_list',
  LINK = 'link',
  IMAGE = 'image',
  CODE = 'code',
  TABLE = 'table',
  PREVIOUS = 'previous',
  NEXT = 'next',
  DELETE = 'delete',
  FULLSCREEN = 'fullscreen',
  FULLSCREEN_EXIT = 'fullscreen_exit',
  PREVIEW = 'preview',
  NO_PREVIEW = 'no_preview'
}

export const EDIT_TOOLS = new Array(
  new Tool(Operation.BOLD, '粗体', '**', '粗体', '**'),
  new Tool(Operation.ITALIC, '斜体', '*', '斜体', '*'),
  new Tool(Operation.HEADER, '标题', '# ', '', ''),
  new Tool(Operation.UNDERLINE, '下划线', '++', '下划线', '++'),
  new Tool(Operation.STRIKETHROUGH, '中划线', '~~', '中划线', '~~'),
  new Tool(Operation.MARK, '标记', '==', '标记', '=='),
  new Tool(Operation.SUPERSCRIPT, '上标', '^', '上标', '^'),
  new Tool(Operation.SUBSCRIPT, '下标', '~', '下标', '~'),
  new Tool(Operation.ALIGN_LEFT, '左对齐', '\n::: hljs-left\n', '居左', '\n:::'),
  new Tool(Operation.ALIGN_RIGHT, '右对齐', '\n::: hljs-right\n', '居右', '\n:::'),
  new Tool(Operation.ALIGN_CENTER, '居中', '\n::: hljs-center\n', '居中', '\n:::'),
  new Tool(Operation.QUOTE, '引用', '>', '引用', ''),
  new Tool(Operation.ORDERED_LIST, '有序列表', '1. ', '', ''),
  new Tool(Operation.UNORDERED_LIST, '无序列表', '- ', '', ''),
  new Tool(Operation.LINK, '链接', '[](', '链接', ')'),
  new Tool(Operation.IMAGE, '图片', '![](', '图片', ')'),
  new Tool(Operation.CODE, '代码块', '```', 'language', '\n\n```\n'),
  new Tool(Operation.TABLE, '表格', '\n|column1|column2|column3|\n' +
    '|-|-|-|\n' +
    '|content1|content2|content3|\n', '', ''),
/*  new Tool(Operation.PREVIOUS, '上一步', '', '', ''),
  new Tool(Operation.NEXT, '下一步', '', '', ''),*/
  new Tool(Operation.DELETE, '删除', '', '', '')
);

export const FULLSCREEN_TOOL = new Tool(Operation.FULLSCREEN, '全屏', '', '', '');
export const PREVIEW_TOOL = new Tool(Operation.PREVIEW, '预览', '', '', '');
export const NO_PREVIEW_TOOL = new Tool(Operation.NO_PREVIEW, '取消预览', '', '', '');
export const FULLSCREEN_EXIT_TOOL = new Tool(Operation.FULLSCREEN_EXIT, '退出全屏', '', '', '');
