import { routerRedux } from 'dva/router';
import { message } from 'antd';
import {postBasicForm, postStepForm, postAdvancedForm} from 'services/forms'

export default {
  namespace: 'form',

  state: {
    step: {
      payAccount: 'ant-design@alipay.com',
      receiverAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: '500',
    },
  },

  effects: {
    *submitRegularForm({ payload }, { call }) {
      const data = yield call(postBasicForm, payload);
      if(data.success) {
        message.success('提交成功');
      }
    },
    *submitStepForm({ payload }, { call, put }) {
      yield call(postStepForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put(routerRedux.push('/form/step-form/result'));
    },
    *submitAdvancedForm({ payload }, { call }) {
      const data = yield call(postAdvancedForm, payload);
      if(data.success) {
        message.success('提交成功');
      }
    },
  },

  reducers: {
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
  },
};
