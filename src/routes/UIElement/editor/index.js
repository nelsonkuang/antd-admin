import React from 'react'
import { Editor } from 'components'
import { convertToRaw } from 'draft-js'
import { Row, Col, Card } from 'antd'
import draftToHtml from 'draftjs-to-html'
import draftToMarkdown from 'draftjs-to-markdown'
// import emoji from 'emoji'
// import 'emoji/lib/emoji.css'
// https://github.com/jpuri/react-draft-wysiwyg/blob/master/docs/src/components/Demo/index.js

export default class EditorPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editorContent: null,
    }
  }
  onEditorStateChange = (editorContent) => {
    this.setState({
      editorContent,
    })
  }
  componentDidMount () {
    /*let _this = this;
    _this.editor.querySelector('.rdw-emoji-wrapper').onclick = function () {
      setTimeout (function () {
        _this.editor.querySelectorAll('.rdw-emoji-modal .rdw-emoji-icon').forEach(item => {
          item.innerHtml = emoji.unifiedToHTML(item.innerText);
        });
      }, 1000);
    } */ // emoji是个坑
  }
  render () {
    const { editorContent } = this.state
    const colProps = {
      lg: 12,
      md: 24,
    }
    const textareaStyle = {
      minHeight: 496,
      width: '100%',
      background: '#f7f7f7',
      borderColor: '#F1F1F1',
      padding: '16px 8px',
    }
    return (<div className="content-inner" ref={ editor => { this.editor = editor }} >
      <Row gutter={32}>
        <Col {...colProps}>
          <Card title="Editor" style={{ overflow: 'visible' }}>
            <Editor
              wrapperStyle={{
                minHeight: 500,
              }}
              editorStyle={{
                minHeight: 376,
              }}
              editorState={editorContent}
              onEditorStateChange={this.onEditorStateChange}
              toolbar={{
                // options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'image', 'remove', 'history'],
                image: {
                  className: undefined,
                  component: undefined,
                  popupClassName: undefined,
                  urlEnabled: true,
                  uploadEnabled: true,
                  alignmentEnabled: true,
                  uploadCallback: function () {
                    // 这里处理上传图片代码
                  },
                  inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                  alt: { present: false, mandatory: false },
                  defaultSize: {
                    height: 'auto',
                    width: 'auto',
                  },
                },
              }}
            />
          </Card>
        </Col>
        <Col {...colProps}>
          <Card title="HTML">
            <textarea
              style={textareaStyle}
              disabled
              value={editorContent ? draftToHtml(convertToRaw(editorContent.getCurrentContent())) : ''}
            />
          </Card>
        </Col>
        <Col {...colProps}>
          <Card title="Markdown">
            <textarea
              style={textareaStyle}
              disabled
              value={editorContent ? draftToMarkdown(convertToRaw(editorContent.getCurrentContent())) : ''}
            />
          </Card>
        </Col>
        <Col {...colProps}>
          <Card title="JSON">
            <textarea
              style={textareaStyle}
              disabled
              value={editorContent ? JSON.stringify(convertToRaw(editorContent.getCurrentContent())) : ''}
            />
          </Card>
        </Col>
      </Row>
    </div>)
  }
}
