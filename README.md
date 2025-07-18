# Hexo Shiki 代码高亮插件

一个为 Hexo 博客打造的现代化代码高亮插件，基于 [Shiki](https://shiki.style/) 提供精美的语法高亮效果。

## 特性

- **代码高亮** - 基于 Shiki 实现代码高亮
- **主题切换** - 支持明暗主题自动切换
- **代码复制** - 代码复制按钮，支持多种复制方式
- **自定义主题** - 支持加载自定义主题文件
- **行号显示** - 支持加载自定义主题文件

## 安装

```bash
npm install hexo-shiki-code
# 或
pnpm add hexo-shiki-code
```

## 配置

在你的 Hexo 配置文件 `_config.yml` 中添加：

```yaml
shiki:
  enable: true                    # 启用插件
  theme: "github-dark"           # 默认主题
  # light: "github-light"          # 明亮主题
  # dark: "github-dark"            # 暗色主题
  copyButton: true               # 显示复制按钮
  lineNumbers: true             # 显示行号
  #   customThemesPath: "./themes"   # 自定义主题文件夹路径
  #   cssPath: "css/shiki-code.css"  # 自定义 CSS 路径(用于覆盖样式)
  #   supportedLangs:                # 支持的语言（可选，默认全部）
  #     - javascript
  #     - typescript
  #     - python
  #     - html
  #     - css
```

## 📝 使用方法

```javascript 这是一个 JavaScript 示例
function hello(name) {
  console.log(`Hello, ${name}!`);
}

hello(' Code');
```

## 主题配置

### 使用Shiki内置主题

```yaml
shiki:
  theme: "github-dark"
```


### 使用自定义主题

#### 方法一：主题文件夹

1. 创建主题文件夹（如 `/themes`）
2. 将 `.json` 格式的主题文件放入文件夹
3. 在配置中指定路径：

```yaml
shiki:
  customThemesPath: themes
  light: Chinolor    # 对应 themes/Chinolor-color-theme.json  中的name属性
  dark: Light     # 对应 themes/Chinolor-light-color-theme.json 中的name属性
```


## 自定义样式

插件会自动注入 CSS 文件，你也可以通过以下方式自定义样式：

1. **覆盖默认样式**：在你的主题 CSS 中添加样式规则
2. **使用自定义 CSS**：指定 `cssPath` 配置项
3. **修改源文件**：直接编辑 `shiki-code.css` 文件

### 常用样式自定义

```css
/* 修改代码块背景色 */
figure.hexo-shiki-code {
  background: #your-color;
}

/* 修改复制按钮样式 */
.hexo-shiki-code .shiki-copy-button {
  background: rgba(255, 255, 255, 0.1);
}

/* 修改字体 */
figure.hexo-shiki-code pre {
  font-family: "JetBrains Mono", monospace;
}
```

## 🔧 故障排除

### 主题加载失败

如果遇到主题加载失败的问题：

1. 检查主题名称是否正确
2. 确认自定义主题文件格式是否正确
3. 查看控制台错误信息



##  贡献

欢迎提交 Issue 和 Pull Request！

---