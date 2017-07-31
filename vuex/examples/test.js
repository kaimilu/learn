var path = require('path')
var fs = require('fs')

/**
 * fs.readdirSync(path);
 * 返回一个不包括 '.' 和 '..' 的文件名的数组
 * http://nodejs.cn/api/fs.html#fs_fs_readdirsync_path_options
 * console.log(fs.readdirSync(__dirname))
 */


/**
 *  Array.prototype.reduce()
 *  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
 */

/**
 *  node: path.join([...paths])
 *  ...paths <string> 一个路径片段的序列
 *  返回: <string>
 *  
 */

const str = path.join('/foo', 'bar', 'baz/asdf', '/quux', '..')
console.log(str)

fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir)
    const entry = path.join(fullDir, 'app.js')

    // 如果是目录 并且entry存在
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
        entries[dir] = ['webpack-hot-middleware/client', entry]
    }

    // console.log(fullDir)
    console.log(entries)

    return entries;
}, {});