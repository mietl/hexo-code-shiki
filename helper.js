const fs = require('fs');
const path = require('path');

function loadShikiThemes(themesPath) {
    const themes = [];

    if (!themesPath || !fs.existsSync(themesPath)) {
        console.warn(`主题目录不存在: ${themesPath}`);
        return themes;
    }

    try {
        const files = fs.readdirSync(themesPath);

        for (const file of files) {
            if (file.endsWith('.json')) {
                const filePath = path.join(themesPath, file);
                try {
                    const themeContent = fs.readFileSync(filePath, 'utf8');
                    const theme = JSON.parse(themeContent);
                    themes.push(theme);
                    console.log(`已加载主题: ${theme.name || file}`);
                } catch (error) {
                    console.error(`加载主题文件失败 ${file}:`, error.message);
                }
            }
        }
    } catch (error) {
        console.error(`读取主题目录失败:`, error.message);
    }

    return themes;
}

module.exports = {
    loadShikiThemes
};