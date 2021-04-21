const openAboutWindow = require('about-window').default;
const path = require('path')
const create = () => openAboutWindow({
    icon_path: path.join(__dirname, 'icon.png'),
    package_json_dir: path.resolve(__dirname  + '/../../../'),
    copyright: 'Copyright (c) 2021 lizhihao',
    homepage: 'https://github.com/lizhihaoerdaye/touping-xiangmu',// 点击图标后跳转的链接
    // bug_report_url: 'https://github.com/dengyaolong/geektime-electron/issues',
})
module.exports = {create}