/* global window */
/* global document */
/* global location */
import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import config from 'config'
import { EnumRoleType } from 'enums'
import { query, logout } from 'services/app'
import * as menusService from 'services/menus'
import queryString from 'query-string'

const { prefix } = config

export default {
  namespace: 'app', // APP的state初始状态
  state: {
    user: {}, // 用户信息
    permissions: { // 用户的权限
      visit: [],
    },
    menu: [ // 用户初始菜单，默认大家都有1首页
      {
        id: 1,
        icon: 'laptop',
        name: 'Dashboard',
        router: '/dashboard',
      },
    ],
    menuPopoverVisible: false,
    siderFold: window.localStorage.getItem(`${prefix}siderFold`) === 'true', // 默认展开侧边？
    darkTheme: window.localStorage.getItem(`${prefix}darkTheme`) === 'true', // 默认黑色？
    isNavbar: document.body.clientWidth < 769, // 手机模式？展示或者隐藏左侧菜单栏
    navOpenKeys: JSON.parse(window.localStorage.getItem(`${prefix}navOpenKeys`)) || [], // 默认展开的菜单
    locationPathname: '', // 当前url路径
    locationQuery: {}, // 当前url参数
  },
  subscriptions: {

    setupHistory ({ dispatch, history }) {
      history.listen((location) => {
        dispatch({ // 监听路由url变化，更新url路径与参数
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: queryString.parse(location.search), // 把参数串格式转为json obj
          },
        })
      })
    },

    setup ({ dispatch }) { // 初始化，监听resize动作
      dispatch({ type: 'query' })
      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' })
        }, 300)
      }
    },

  },
  effects: {

    * query ({
      payload,
    }, { call, put, select }) {
      const { success, user } = yield call(query, payload)
      const { locationPathname } = yield select(_ => _.app)
      if (success && user) { // 如果已登录，动态生成菜单并记录路由
        const { list } = yield call(menusService.query)
        const { permissions } = user
        let menu = list 
        if (permissions.role === EnumRoleType.ADMIN || permissions.role === EnumRoleType.DEVELOPER) { // 枚举类型，可代表多种类型的变量
          permissions.visit = list.map(item => item.id)
        } else {
          menu = list.filter((item) => { // 过滤没有权限的菜单，用[true, true, true].every(_ => _)来过滤
            const cases = [
              permissions.visit.includes(item.id),
              item.mpid ? permissions.visit.includes(item.mpid) || item.mpid === '-1' : true,
              item.bpid ? permissions.visit.includes(item.bpid) : true,
            ]
            // console.log(cases);
            return cases.every(_ => _)
          })

          // console.log(menu);
        }
        yield put({ // 分发type为updateState的action
          type: 'updateState',
          payload: {
            user,
            permissions,
            menu,
          },
        })
        if (location.pathname === '/login') { // 路由记录为dashboard
          yield put(routerRedux.push({
            pathname: '/dashboard',
          }))
        }
      } else if (config.openPages && config.openPages.indexOf(locationPathname) < 0) { // 如果未登录，跳登录页并设置(search)url带from参数
        yield put(routerRedux.push({ 
          pathname: '/login',
          search: queryString.stringify({
            from: locationPathname,
          }),
        }))
      }
    },

    * logout ({
      payload,
    }, { call, put }) {
      const data = yield call(logout, parse(payload)) // 登出时，如果传payload为参数，就用parse把参数转化为json对象，本例子中 payload 为undefined 则 parse(payload) 为{}
      if (data.success) {
        yield put({ type: 'query' })
      } else {
        throw (data)
      }
    },

    * changeNavbar (action, { put, select }) {
      const { app } = yield (select(_ => _))
      const isNavbar = document.body.clientWidth < 769
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar })
      }
    },

  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    switchSider (state) {
      window.localStorage.setItem(`${prefix}siderFold`, !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },

    switchTheme (state) {
      window.localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },

    switchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },

    handleNavbar (state, { payload }) {
      return {
        ...state,
        isNavbar: payload,
      }
    },

    handleNavOpenKeys (state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys,
      }
    },
  },
}
