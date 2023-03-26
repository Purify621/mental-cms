<template>
  <!-- 添加科普文章 -->
  <div class="container">
    <div class="menu"><Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :default-config="toolbarConfig"
      :mode="mode"
    />
    </div>
    <div class="edit">
      <div class="edit_container">
        <Editor
          v-model="html"
          style="height: 500px; overflow-y: hidden;"
          :default-config="editorConfig"
          :mode="mode"
          @onCreated="onCreated"
        />
      </div>
      <div class="textdisplay">
        <div class="html spacing">
          {{ r_html }}
          <el-tooltip class="item" effect="dark" content="此处用于显示代码片段" placement="left">
            <el-button class="tips" type="primary" size="mini" circle icon="el-icon-info" />
          </el-tooltip>
        </div>
        <!-- 使用v-html 把html代码渲染到页面上 -->
        <div class="html" v-html="r_html" />

      </div>
    </div>
    <div class="footer">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="formInline.title" placeholder="文章标题" />
        </el-form-item>
        <el-form-item label="当前日期">
          <el-input v-model="formInline.time" disabled placeholder="自动获取当前时间" />
        </el-form-item>
        <el-form-item class="add">
          <el-button type="primary" @click="onSubmit">添加文章</el-button>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch
            v-model="sValue"
            class="statusTitle"
            active-color="#00a870"
            active-text="启用"
            inactive-text="禁用"
            @change="handleSwitch()"
          />
        </el-form-item>
        <el-form-item label="文章类型">
          <el-select v-model="formInline.type" placeholder="请选择">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.value"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { addPopularScience } from '@/api/Popularscience'
export default {
  name: 'MentalPopularSciencePage',
  components: {
    Editor, Toolbar
  },
  data() {
    return {
      editor: null,
      html: '',
      // 工具栏配置
      toolbarConfig: {
        // 工具配置 删减了一些无用配置
        toolbarKeys: [
          'headerSelect',
          // 'blockquote',
          '|',
          // 'bold',
          'underline',
          'italic',
          /*
          {
            'key': 'group-more-style',
            'title': '更多',
            'iconSvg': '<svg viewBox="0 0 1024 1024"><path d="M204.8 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path><path d="M505.6 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path><path d="M806.4 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path></svg>',
            'menuKeys': [
              'through',
              'code',
              'sup',
              'sub',
              'clearStyle'
            ]
          },
          */
          'color',
          'bgColor',
          '|',
          'fontSize',
          'fontFamily',
          'lineHeight',
          '|',
          'bulletedList',
          'numberedList',
          // 'todo',
          {
            'key': 'group-justify',
            'title': '对齐',
            'iconSvg': '<svg viewBox="0 0 1024 1024"><path d="M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z"></path></svg>',
            'menuKeys': [
              'justifyLeft',
              'justifyRight',
              'justifyCenter',
              'justifyJustify'
            ]
          },
          {
            'key': 'group-indent',
            'title': '缩进',
            'iconSvg': '<svg viewBox="0 0 1024 1024"><path d="M0 64h1024v128H0z m384 192h640v128H384z m0 192h640v128H384z m0 192h640v128H384zM0 832h1024v128H0z m0-128V320l256 192z"></path></svg>',
            'menuKeys': [
              'indent',
              'delIndent'
            ]
          },
          '|',
          // 'emotion',
          'insertLink',
          {
            'key': 'group-image',
            'title': '图片',
            'iconSvg': '<svg viewBox="0 0 1024 1024"><path d="M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z"></path></svg>',
            'menuKeys': [
              'insertImage',
              'uploadImage'
            ]
          },
          /*
          {
            'key': 'group-video',
            'title': '视频',
            'iconSvg': '<svg viewBox="0 0 1024 1024"><path d="M981.184 160.096C837.568 139.456 678.848 128 512 128S186.432 139.456 42.816 160.096C15.296 267.808 0 386.848 0 512s15.264 244.16 42.816 351.904C186.464 884.544 345.152 896 512 896s325.568-11.456 469.184-32.096C1008.704 756.192 1024 637.152 1024 512s-15.264-244.16-42.816-351.904zM384 704V320l320 192-320 192z"></path></svg>',
            'menuKeys': [
              'insertVideo',
              'uploadVideo'
            ]
          },
          */
          // 'insertTable',
          'codeBlock',
          'divider'
          // '|'
          // 'undo',
          // 'redo',
          // '|'
          // 'fullScreen'
        ]
      },
      // 编辑器配置
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default', // or 'simple'
      // 获取到编辑区里的 html
      r_html: '',
      // 表单内容
      formInline: {
        title: '',
        time: '',
        type: ''
      },
      // 滑块状态
      sValue: true,
      // 文章对象
      article: {
        title: '',
        data: '',
        date: ''
      },
      options: [
        { value: '心理科普' },
        { value: '前沿进展' }
      ]
    }
  },
  computed: {},
  // 侦听器
  watch: {
    html() {
      this.r_html = this.editor.getHtml()
    }
  },
  mounted() {
    // 页面加载就获取当前日期
    this.time()
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
  methods: {
    // 添加按钮执行的操作
    onSubmit() {
      this.article.data = this.r_html
      this.article.title = this.formInline.title
      this.article.date = this.formInline.time
      this.article.type = this.formInline.type
      addPopularScience(this.article).then(res => {
        this.$message({
          message: '添加成功',
          type: 'successs'
        })
      })
    },
    // 获取当前时间
    time() {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      this.formInline.time = `${year}-${month}-${day}`
    },
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    }
  }
}
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang='scss' scoped>
.container{
  width: 100%;
  height: 93vh;
  padding: 10px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  .menu{
    width: 100%;
    height: 6vh;
  }
  // 编辑区
  .edit{
    width: 100%;
    height: 70vh;
    display: flex;
    .edit_container{
      width: 50%;
      border: lightgray solid 1px;
    }
  // 文本显示区
  .textdisplay{
    width: 50%;
    height: 100%;
    padding: 0 10px 0 10px;
    position: relative;
      .html{
        width: 100%;
        height: 49%;
        padding-right: 30px;
        // 显示滚动条
        overflow-y: auto;
        border: lightgray solid 1px;
        border-radius: 10px;
      }
      .spacing{
        margin-bottom: 2%;
      }
    }
    // 提示信息
    .tips{
      position: absolute;
      top: 5px;
      right: 15px;
    }
  }
  .footer{
    width: 100%;
    height: 12vh;
    .el-form{
      width: 100%;
      position: relative;
      margin: 25px auto;
      // 添加按钮
      .add{
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>
<style>
/* 滑块样式 */
.el-switch__label * {
    line-height: 1;
    font-size: 12px;
    display: inline-block;
  }
 .el-switch__label {
    position: absolute;
    display: none;
    color: #fff !important;
    font-size: 12px !important;
  }
  /*打开时文字位置设置*/
.el-switch__label--right {
    z-index: 1;
    right: -8px;
  }
  /*关闭时文字位置设置*/
.el-switch__label--left {
    z-index: 1;
    left: 21px;
  }
  /*显示文字*/
.el-switch__label.is-active {
    display: block;
  }
   /*开关宽度*/
.el-switch .el-switch__core,
  .el-switch .el-switch__label {
    width: 55px !important;
  }
</style>
