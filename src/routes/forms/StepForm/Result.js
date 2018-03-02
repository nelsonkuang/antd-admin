import React, { PureComponent } from 'react';
import { Route, Redirect, Switch } from 'dva/router';
import { Card, Steps } from 'antd';
import { Page } from 'components'
import Step3 from './Step3';

import styles from '../style.less';

const { Step } = Steps;

export default class Result extends PureComponent {
  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 1]) {
      case 'info': return 0;
      case 'confirm': return 1;
      case 'result': return 2;
      default: return 0;
    }
  }
  render() {
    const { match } = this.props;
    console.log(match);
    const currentStep = this.getCurrentStep();
    return (
      <Page inner>
        <Card bordered={false}>
          <div>
            <Steps current={currentStep} className={styles.steps}>
              <Step title="填写转账信息" />
              <Step title="确认转账信息" />
              <Step title="完成" />
            </Steps>
            <Step3 />
          </div>
        </Card>
      </Page>
    );
  }
}
