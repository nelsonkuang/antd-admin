import React from 'react';
import { Button, Row, Col, Card } from 'antd';
import E from 'wangeditor';

export default class WangEditorPage extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      editorContent: '',
    };
    this.clickHandle = this.clickHandle.bind(this);
  }
  componentDidMount () {
    const elem = this.editorElem;
    const editor = new E(elem);
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = (html) => {
      this.setState({
        editorContent: html,
      });
    };
    editor.create();
  }
  clickHandle () {
    alert(this.state.editorContent);
  }
  render () {
    const colProps = {
      lg: 24,
      md: 12,
    };
    return (<div className="content-inner" >
      <Row gutter={32}>
        <Col {...colProps}>
          <Card title="WangEditor" style={{ overflow: 'visible' }}>
            {/* 将生成编辑器 */}
            <div ref={r => this.editorElem = r} />
            <Button type="primary" onClick={this.clickHandle} style={{ marginTop: 15 }}>获取内容</Button>
          </Card>
        </Col>
      </Row>
    </div>);
  }
}
