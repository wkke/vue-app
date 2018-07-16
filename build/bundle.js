const fs = require("fs")
const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const alias = require("./alias")
const resolve = (p) => path.resolve(__dirname, "..", p)

const entryDir = resolve("src/page")
const outputDir = resolve("dist")
const templatePath = resolve("template/index.html")
const entryFiles = fs.readdirSync(entryDir)

const glob = require('glob'); //引入路径的处理插件


const
    entry = {},
    output = {}
htmlPlugins = [];


//遍历项目目录分析出页面入口，生成entry清单
// function auto_find_entries(globPath) {
//     var files = glob.sync(globPath);
//     var entries = {},
//         entry, dirname, basename;
//     console.log("共扫描到模块" + files.length + "个");
//     for (var i = 0; i < files.length; i++) {
//         entry = files[i];
//         dirname = path.dirname(entry);
//         basename = path.basename(entry, '.js');
//         entries[path.join(dirname, basename)] = './' + entry;
//     }
//     return entries;
// }
//entrys = auto_find_entries('./src/pages/**/*.js');


// 映射目录别名
function resolveAlias() {
    Object.keys(alias).forEach(attr => {
        const val = alias[attr]
        alias[attr] = resolve(val)
    })
}

// 处理输出项
//考虑到嵌套目录的情况
function resolveEntryAndOutput(env) {

    var files = glob.sync(entryDir + "/**/index.js");
    let ety;
    let chunkname;
    for (var i = 0; i < files.length; i++) {
        ety = files[i];
        chunkname = path.dirname(files[i]).split(entryDir.replace(/\\/g, "/") + "/")[1];
        //     chunkname = chunkname.replace(/\//g, "_");

        entry[chunkname] = path.dirname(resolve(ety));
        if (env === "dev") {
            output.filename = "js/[name].bundle.js";
        } else {
            output.filename = "js/[name].bundle.[hash].js";
        }
        output.path = outputDir;
    }
    // console.log(etys);
    // entryFiles.forEach(dir => {
    //     entry[dir] = resolve(`${entryDir}/${dir}`)
    //     if (env === "dev") {
    //         output.filename = "js/[name].bundle.js";
    //     } else {
    //         output.filename = "js/[name].bundle.[hash].js";
    //     }
    //     output.path = outputDir;
    // })
}
var pageindexhtml = "";

function genPageIndexHtml() {
    return pageindexhtml;
}
// Handle HTML Templates
function combineHTMLWithTemplate() {

    var files = glob.sync(entryDir + "/**/index.js");
    let ety;
    let chunkname;
    let chunkpath;
    let pages = [];
    for (var i = 0; i < files.length; i++) {
        ety = files[i];
        chunkpath = path.dirname(files[i]).split(entryDir.replace(/\\/g, "/") + "/")[1];
        chunkname = chunkpath;
        pages.push(chunkpath + `.html`);
        const htmlPlugin = new HTMLWebpackPlugin({
            filename: chunkpath + `.html`,
            template: templatePath,
            chunks: [chunkname, "vendor"]
        })
        htmlPlugins.push(htmlPlugin)
    }
    for (var i = 0; i < pages.length; i++) {
        pageindexhtml += "<a  target='_blank' href='" + pages[i] + "'  >" + pages[i] + "</a><br/>";
    }

    //为目录页单独处理
    {

        const htmlPlugin = new HTMLWebpackPlugin({
            filename: `1.html`,
            templateContent: pageindexhtml,
            chunks: []
        })
        htmlPlugins.push(htmlPlugin)
    }


    // entryFiles.forEach(dir => {
    //     const htmlPlugin = new HTMLWebpackPlugin({
    //         filename: `${dir}.html`,
    //         template: templatePath,
    //         chunks: [dir, "vendor"]
    //     })
    //     console.log(`${dir}.html`);
    //     htmlPlugins.push(htmlPlugin)
    // })
}

function initConfig(env) {
    resolveAlias();
    resolveEntryAndOutput(env);
    combineHTMLWithTemplate();
    return {
        entry,
        output,
        alias,
        htmlPlugins
    }
}
exports.initConfig = initConfig;
exports.resolve = resolve;