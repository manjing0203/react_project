import React, { useState, useEffect,forwardRef, useImperativeHandle } from 'react'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'

function MyEditor(props, ref) {
    const [editor, setEditor] = useState(null) // 存储 editor 实例
    const [html, setHtml] = useState('')

    // 模拟 ajax 请求，异步设置 html

    useEffect(() => {
            setHtml(props.detail)
    },[props.detail,setHtml])

    const toolbarConfig = { }
    const editorConfig = {
        placeholder: '请输入内容...',
    }

    // 及时销毁 editor
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    //获取富文本
   function getRichText() {
    return editor.getHtml()
   } 

   useImperativeHandle(ref, () => ({
    getRichText,
  }));

    return (
        <>
            <div style={{ border: '1px solid #ccc', zIndex: 100, marginTop: '15px'}}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => setHtml(editor.getHtml())}
                    mode="default"
                    style={{ height: '200px' }}
                />
            </div>
        </>
    )
}

export default forwardRef(MyEditor)