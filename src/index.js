import React from 'react';
import { renderer } from './customRenderer';
import App from './App';

const container = document.getElementById('root');

// 创建渲染容器
const root = renderer.createContainer(
  container, // 目标容器
  false,     // 是否为并发模式
  false      // 是否为服务端渲染的水合模式
);

// 执行渲染
renderer.updateContainer(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root,
  null,  // 父组件
  () => console.log('渲染完成') // 回调函数
);