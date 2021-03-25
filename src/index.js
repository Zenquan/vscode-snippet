/**
 * 思路
 * 1. 读取tpl目录的文件
 * 2. 遍历目录的文件
 * 3. 把文件转成字符串，正则匹配\n，空格，格式化成snippets
 * 4. 写入到snippets/snippets.code-snippets中
 * 5. 发布插件，就ok了
 * 6. 更新就通过vscode更新
 */
const fs = require('fs'),
  path = require('path');

const dirs = async (path) => {
  let ds  = [];
  for await (
      const dirent of 
        (await fs.promises.opendir(path))
    ) {
    ds.push(dirent.name);
  };

  return ds;
};

async function generateSnippets (paths) {
  const files = await dirs(paths);
  console.log('>>>', files);
  let snippets = {};
  await files.forEach((f) => {
    const res = fs.readFileSync(`${paths}/${f}`, {
      encoding: 'utf8'
    });
  
    // let str = JSON.stringify(res); 
    console.log('res>>>', res);
  })
}

generateSnippets(path.resolve(__dirname, './snippets/')).catch(console.error);