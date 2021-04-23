const {override,fixBabelImports,addLessLoader} = require('customize-cra');

// 配置less https://blog.csdn.net/woyidingshijingcheng/article/details/106429349
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true 
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': 'green' },
    sourceMap:true,
    cssLoaderOptions: { 
    	modules: true,
	  },
  }),
  (config)=>{
    config.target = 'electron-renderer';
    return config;
  }
);