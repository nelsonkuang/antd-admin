import React from 'react';
import PropTypes from 'prop-types';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { Switch, Route, Redirect, routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';
import App from 'routes/app';

const { ConnectedRouter } = routerRedux;

const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  });
  const error401 = dynamic({
    app,
    component: () => import('./routes/error/401'),
  });
  const routes = [
    {
      path: '/dashboard',
      models: () => [import('./models/dashboard')],
      component: () => import('./routes/dashboard/'),
    }, {
      path: '/user',
      models: () => [import('./models/user')],
      component: () => import('./routes/user/'),
    }, {
      path: '/adminUsers',
      models: () => [import('./models/adminUsers')],
      component: () => import('./routes/adminUsers/'),
    }, {
      path: '/user/:id',
      models: () => [import('./models/user/detail')],
      component: () => import('./routes/user/detail/'),
    }, {
      path: '/login',
      models: () => [import('./models/login')],
      component: () => import('./routes/login/'),
    }, {
      path: '/request',
      component: () => import('./routes/request/'),
    }, {
      path: '/UIElement/iconfont',
      component: () => import('./routes/UIElement/iconfont/'),
    }, {
      path: '/UIElement/search',
      component: () => import('./routes/UIElement/search/'),
    }, {
      path: '/UIElement/dropOption',
      component: () => import('./routes/UIElement/dropOption/'),
    }, {
      path: '/UIElement/layer',
      component: () => import('./routes/UIElement/layer/'),
    }, {
      path: '/UIElement/dataTable',
      component: () => import('./routes/UIElement/dataTable/'),
    }, {
      path: '/UIElement/editor',
      component: () => import('./routes/UIElement/editor/'),
    }, {
      path: '/UIElement/wangEditor',
      component: () => import('./routes/UIElement/wangEditor/'),
    }, {
      path: '/chart/ECharts',
      component: () => import('./routes/chart/ECharts/'),
    }, {
      path: '/chart/highCharts',
      component: () => import('./routes/chart/highCharts/'),
    }, {
      path: '/chart/Recharts',
      component: () => import('./routes/chart/Recharts/'),
    }, {
      path: '/post',
      models: () => [import('./models/post')],
      component: () => import('./routes/post/'),
    }, {
      path: '/form/basic-form',
      models: () => [import('./models/form')],
      component: () => import('./routes/forms/BasicForm'),
    }, {
      path: '/form/step-form',
      models: () => [import('./models/form')],
      component: () => import('./routes/forms/StepForm/Info'),
    }, {
      path: '/form/step-form/confirm',
      models: () => [import('./models/form')],
      component: () => import('./routes/forms/StepForm/Confirm'),
    }, {
      path: '/form/step-form/result',
      models: () => [import('./models/form')],
      component: () => import('./routes/forms/StepForm/Result'),
    }, {
      path: '/form/advanced-form',
      models: () => [import('./models/form')],
      component: () => import('./routes/forms/AdvancedForm'),
    },
  ];

  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <App>
          <Switch>
            <Route exact path="/" render={() => (<Redirect to="/dashboard" />)} />
            {
              routes.map(({ path, ...dynamics }, key) => (
                <Route key={key}
                  exact
                  path={path}
                  component={dynamic({
                    app,
                    ...dynamics,
                  })}
                />
              ))
            }
            <Route exact path="/error/401" component={error401} />
            <Route component={error} />
          </Switch>
        </App>
      </ConnectedRouter>
    </LocaleProvider>
  );
};

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
};

export default Routers;
