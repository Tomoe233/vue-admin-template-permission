
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
    menus: [
      {
        'path': '/ManagementAccount',
        'component': 'Layout',
        'children': [
          {
            'path': 'index',
            'name': 'managementAccount',
            'component': 'ManagementAccount/index',
            'meta': { title: '账号管理', icon: 'el-icon-notebook-2' }
          }
        ]
      },
      {
        path: '/ManageUsers',
        component: 'Layout',
        children: [
          {
            path: 'index',
            name: 'manageUsers',
            component: 'ManageUsers/index',
            meta: { title: '用户管理', icon: 'el-icon-user' }
          }
        ]
      },
      {
        path: '/PushMessage',
        component: 'Layout',
        children: [
          {
            path: 'index',
            name: 'pushMessage',
            component: 'PushMessage/index',
            meta: { title: '消息推送', icon: 'el-icon-bell' }
          }
        ]
      }
    ]
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
    menus: []
  }
}

module.exports = [
  // user login
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
