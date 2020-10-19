import marked from 'marked';
import Hljs from './hignlight';
const languages = [
  'cpp',
  'xml',
  'bash',
  'coffeescript',
  'css',
  'markdown',
  'http',
  'java',
  'javascript',
  'json',
  'less',
  'makefile',
  'nginx',
  'php',
  'python',
  'scss',
  'sql',
  'stylus'
];
const renderer = new marked.Renderer();

marked.setOptions({
  renderer,
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight(code, lang) {
    if (!~languages.indexOf(lang)) {
      return Hljs.highlightAuto(code).value;
    }
    return Hljs.highlight(lang, code).value;
  }
});
export default (content) => {
  if (typeof content !== 'string') {
    return '';
  }

  let html = marked(content, { renderer });

  return { html };
};