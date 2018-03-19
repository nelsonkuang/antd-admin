import { request, config } from 'utils';

const { api } = config;
const { basicForm, stepForm, advancedForm } = api;

export async function postBasicForm (params) {
  return request({
    url: basicForm,
    method: 'post',
    data: params,
  });
}

export async function postStepForm (params) {
  return request({
    url: stepForm,
    method: 'post',
    data: params,
  });
}

export async function postAdvancedForm (params) {
  return request({
    url: advancedForm,
    method: 'post',
    data: params,
  });
}
