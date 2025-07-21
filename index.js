const shiki = require('shiki');
const fs = require('fs');
const path = require('path');
const helper = require('./helper');

const shikiConfig = hexo.config.shiki

if (!shikiConfig.enable) return;

const codeMatch = /(?<quote>[> ]*)(?<ul>(-|\d+\.)?)(?<start>\s*)(?<tick>~{3,}|`{3,}) *(?<lang>\S+)? *(?<figcation>.*)?\n(?<code>[\s\S]*?)\k<quote>\s*\k<tick>(?<end>\s*)$/gm;

// 默认支持所有语言
let bundledLanguagesKeys = Object.keys(shiki.bundledLanguages)

const light = shikiConfig.light ?? shikiConfig.theme;
const dark = shikiConfig.dark ?? shikiConfig.theme;

let themes = []

console.log('mietl');
if (shikiConfig?.customThemesPath) {
  const customThemes = helper.loadShikiThemes(shikiConfig.customThemesPath);
  for (const theme of customThemes) {
    // 只加载使用的主题
    if([light,dark].includes(theme.name)){
      themes.push(theme);
    }
  }
}else{
  themes = Array.from(new Set([light,dark]))
}
console.log('debug');


shiki.createHighlighter({
  themes,
  langs: shikiConfig?.supportedLangs ?? bundledLanguagesKeys
}).then(async highlighter => {

  const lightTheme = highlighter.getTheme(light)
  const darkTheme = highlighter.getTheme(dark)

  hexo.extend.injector.register('head_end', () => {
    return `<script>
      document.documentElement.dataset.lightShiki = '${lightTheme.type}-shiki';
      document.documentElement.dataset.darkShiki = '${darkTheme.type}-shiki';
    </script>`;
  });

  hexo.extend.filter.register('before_post_render', function (post) {
    post.content = post.content.replace(codeMatch, (...argv) => {
      let { quote, ul, start, end, lang, figcation, code } = argv.pop();

      let html = '';

      
      try {
        // 生成高亮代码
        html = highlighter.codeToHtml(code, {
          lang: lang?.toLowerCase() ?? 'none',
          themes: { 
            light,
            dark,
          }
        });

      } catch (error) {
        html = `<pre class="shiki-fallback"><code class="language-${lang}">${error.message}</code></pre>`
      }

      const copyButton = shikiConfig.copyButton ? `<button class="shiki-copy-button" onclick="copyShikiCode(this)">
                      <span class="button-text">复制</span>
                    </button>` : ''

      const classList = ['hexo-shiki-code'];

      if(lang) classList.push('lang')
      if(shikiConfig.lineNumbers) classList.push('line-numbers')

      return `${quote + ul + start
        }<hexoPostRenderCodeBlock>
              <figure class="${classList.join(' ')}" >
                  <figcaption class="title-bar">
                    <span class="shiki-lang-label">${lang} ${figcation?.trim() ? ` · <i>${figcation}</i>` : ''}</span>
                    ${copyButton}
                  </figcaption>
                  ${html}
              </figure>
        </hexoPostRenderCodeBlock>${end}`;
    });

    return post;
  });

}).catch(error => {
  console.error('Shiki 初始化失败：', error);
});


const css = hexo.extend.helper.get("css").bind(hexo);
const js = hexo.extend.helper.get("js").bind(hexo);

hexo.extend.generator.register('shiki-css', function () {
  return {
    path: 'css/shiki-code.css',
    data: function () {
      return fs.createReadStream(path.join(__dirname, 'shiki-code.css'));
    }
  };
});


hexo.extend.injector.register("head_end", () => {
  return css(
    shikiConfig.cssPath || "css/shiki-code.css"
  )
})

hexo.extend.injector.register("body_end", () => {
  return js(
    "js/shiki-code.js"
  )
})

hexo.extend.generator.register('shiki-code', function () {
  return {
    path: 'js/shiki-code.js',
    data: function () {
      return fs.createReadStream(path.join(__dirname, 'shiki-code.js'));
    }
  };
});
