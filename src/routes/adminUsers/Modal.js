import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import city from '../../utils/city'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

class modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmDirty: false,
    };
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const {
      item = {},
      onOk,
      form: { getFieldDecorator, validateFields, getFieldsValue },
      ...modalProps,
    } = this.props;

    const handleOk = () => {
      validateFields((errors) => {
        if (errors) {
          return
        }
        const data = {
          ...getFieldsValue(),
          key: item.key,
        }
        onOk(data)
      })
    }

    const modalOpts = {
      ...modalProps,
      onOk: handleOk,
    }

    return (
      <Modal {...modalOpts}>
        <Form layout="horizontal">
          <FormItem label="用户名" hasFeedback {...formItemLayout}>
            {getFieldDecorator('username', {
              initialValue: item.username,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="密码"
          >
            {getFieldDecorator('password', {
              rules: [{
                required: !item.hasOwnProperty('id'), message: '请输入密码',
              }, {
                validator: this.checkConfirm,
              }, {
                min: 8, message: '密码长度最少为8位',
              }],
            })(
              <Input type="password" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="确认密码"
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: !item.hasOwnProperty('id'), message: '请确认密码',
              }, {
                validator: this.checkPassword,
              }],
            })(
              <Input type="password"  onBlur={this.handleConfirmBlur} />
            )}
          </FormItem>
          <FormItem label="用户角色" hasFeedback {...formItemLayout}>
            {getFieldDecorator('role', {
              initialValue: item.permissions ? item.permissions.role : 'guest',
              rules: [
                {
                  required: true
                },
              ],
            })(<Radio.Group>
              <Radio value={'admin'}>管理员</Radio>
              <Radio value={'developer'}>开发者</Radio>
              <Radio value={'guest'}>普通用户</Radio>
               </Radio.Group>)}
          </FormItem>
          <FormItem label="联系电话" hasFeedback {...formItemLayout}>
            {getFieldDecorator('phone', {
              initialValue: item.phone,
              rules: [
                {
                  required: true,
                  pattern: /^1[34578]\d{9}$/,
                  message: '请输入正确的手机号码',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label="邮箱地址" hasFeedback {...formItemLayout}>
            {getFieldDecorator('email', {
              initialValue: item.email,
              rules: [
                {
                  required: true,
                  pattern: /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                  message: '邮箱地址格式不正确',
                },
              ],
            })(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
