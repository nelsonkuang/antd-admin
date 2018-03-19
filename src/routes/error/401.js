import React from 'react';
import { Icon } from 'antd';
import styles from './index.less';
import { Page } from 'components';

const Error401 = () => (<Page inner={false}>
  <div className={styles.error}>
    <Icon type="frown-o" />
    <h1>401 Unauthorized</h1>
  </div>
</Page>);

export default Error401;
