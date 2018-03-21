/* global window */
/* global document */
import React from 'react';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import pathToRegexp from 'path-to-regexp';
import { connect } from 'dva';
import { Loader, MyLayout } from 'components';
import { BackTop, Layout } from 'antd';
import { classnames, config } from 'utils';
import { Helmet } from 'react-helmet';
import { withRouter } from 'dva/router';
import Error from './error';
import Error401 from './error/401';
import '../themes/index.less';
import './app.less';

const { Content, Footer, Sider } = Layout;
const { Header, Bread, styles } = MyLayout;
const { prefix, openPages } = config;

let lastHref;

const App = ({
  children, dispatch, app, loading, location,
}) => {
  const {
    user, siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys, menu, permissions,
  } = app;
  let { pathname } = location;
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const { iconFontJS, iconFontCSS, logo } = config;
  const current = menu.filter(item => pathToRegexp(item.route || '').exec(pathname));
  let hasPermission = current.length ? permissions.visit.includes(current[0].id) : false;
  if (!hasPermission && permissions.visit.includes('92') && pathname.startsWith('/form/step-form/')) { // 如果有92步骤一权限，不拦截
    hasPermission = true;
  }
  const { href } = window.location;

  if (lastHref !== href) {
    NProgress.start();
    if (!loading.global) {
      NProgress.done();
      lastHref = href;
    }
  }

  const headerProps = {
    menu,
    user,
    location,
    siderFold,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    switchMenuPopover () {
      dispatch({ type: 'app/switchMenuPopver' });
    },
    logout () {
      dispatch({ type: 'app/logout' });
    },
    switchSider () {
      dispatch({ type: 'app/switchSider' });
    },
    changeOpenKeys (openKeys) {
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } });
    },
  };

  const siderProps = {
    menu,
    location,
    siderFold,
    darkTheme,
    navOpenKeys,
    changeTheme () {
      dispatch({ type: 'app/switchTheme' });
    },
    changeOpenKeys (openKeys) {
      window.localStorage.setItem(`${prefix}navOpenKeys`, JSON.stringify(openKeys));
      dispatch({ type: 'app/handleNavOpenKeys', payload: { navOpenKeys: openKeys } });
    },
  };

  const breadProps = {
    menu,
    location,
  };

  if (openPages && openPages.includes(pathname)) { // 如果pathname是/login的话直接全屏显示login页面，openPages: ['/login']
    console.log(pathname);
    return (<div>
      <Loader fullScreen spinning={loading.effects['app/query']} />
      {children}
    </div>);
  }
  console.log(pathname);
  return ( // 否则输出其他页面
    <div>
      <Loader fullScreen spinning={loading.effects['app/query']} />
      <Helmet>
        <title>ANTD ADMIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={logo} type="image/x-icon" />
        {iconFontJS && <script src={iconFontJS} />}
        {iconFontCSS && <link rel="stylesheet" href={iconFontCSS} />}
      </Helmet>

      <Layout className={classnames({ [styles.dark]: darkTheme, [styles.light]: !darkTheme })}>
        {!isNavbar && <Sider // 是否输出左则菜单
          trigger={null}
          collapsible
          collapsed={siderFold}
        >
          {siderProps.menu.length === 0 ? null : <MyLayout.Sider {...siderProps} />}
        </Sider>}
        <Layout style={{ height: '100vh', overflow: 'scroll' }} id="mainContainer">
          <BackTop target={() => document.getElementById('mainContainer')} />
          <Header {...headerProps} />
          <Content>
            <Bread {...breadProps} />
            { pathname === '/' && !hasPermission && <div style={{
                display:'block',
                textAlign:'center',
                width:'100vw',
                height:'100vh',
                lineHeight:'100vh',
                backgroundColor:'#fff',
                position:'fixed',
                top:0,
                left:0,
                zIndex:9999,
              }}>请先登录，跳转中</div> }
            { hasPermission ? children : <Error /> }
          </Content>
          <Footer >
            {config.footerText}
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
};

export default withRouter(connect(({ app, loading }) => ({ app, loading }))(App));
