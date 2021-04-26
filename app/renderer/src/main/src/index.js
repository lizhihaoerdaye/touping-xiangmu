import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
import AllPage from './views/index'
import './assets/scss/resume-react.scss';


ReactDOM.render(
  <ConfigProvider locale={zhCN}>
      <AllPage />
  </ConfigProvider>,
  document.getElementById('root')
);

