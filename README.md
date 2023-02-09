# vue-admin-template-permission

> 这是一个基于的 [vue-admin-template](https://github.com/PanJiaChen/vue-admin-template) 二次开发的项目。本项目添加了动态菜单栏、权限按钮、TagsView以及简单的系统管理页面和个人中心页面。

## 展示

界面设计参考的[若依](https://gitee.com/y_project/RuoYi-Vue)

![image](https://github.com/Tomoe233/vue-admin-template-permission/blob/master/src/docs/image/admin.png)

![image](https://github.com/Tomoe233/vue-admin-template-permission/blob/master/src/docs/image/editor.png)

修改了 ```getInfo``` 接口，根据不同角色返回不同菜单数据

```javascript
{
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'http://inews.gtimg.com/newsapp_bt/0/13856645985/641',
    name: 'Super Admin',
    menus: [
      {
        'path': '/System',
        'component': 'Layout',
        'redirect': '/System/menu',
        'name': 'System',
        'meta': { title: '系统管理', icon: 'el-icon-setting' },
        'children': [
          {
            'path': 'menu',
            'name': 'Menu',
            'component': 'System/menu/index',
            'meta': { title: '菜单管理', icon: 'el-icon-menu' }
          },
          {
            'path': 'role',
            'name': 'Role',
            'component': 'System/role/index',
            'meta': { title: '角色管理', icon: 'el-icon-s-custom' }
          },
          {
            'path': 'user',
            'name': 'User',
            'component': 'System/user/index',
            'meta': { title: '用户管理', icon: 'el-icon-user-solid' }
          }
        ]
      }
    ]
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'http://p4.itc.cn/images01/20200807/ac6e9d41a0bd42d0a02526c8d422ab16.jpeg',
    name: 'Normal Editor',
    menus: []
  }
}
```

![image](https://github.com/Tomoe233/vue-admin-template-permission/blob/master/src/docs/image/menu.png)

![image](https://github.com/Tomoe233/vue-admin-template-permission/blob/master/src/docs/image/role.png)

![image](https://github.com/Tomoe233/vue-admin-template-permission/blob/master/src/docs/image/user.png)

![image](https://github.com/Tomoe233/vue-admin-template-permission/blob/master/src/docs/image/personalCenter.png)

## Build Setup

```bash
# 克隆项目
git clone https://github.com/Tomoe233/vue-admin-template-permission.git

# 进入项目目录
cd vue-admin-template-permission

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=http://registry.npmmirror.com

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

更多信息请参考 [使用文档](https://panjiachen.github.io/vue-element-admin-site/zh/)

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions

