/*
 * @Author       : JY Ma
 * @Date         : 2022-12-23 10:22:44
 * @LastEditTime : 2023-02-08 17:02:19
 * @LastEditors  : majy majy@joywise.net
 * @FilePath     : /scat-blog/docs/.vuepress/config.js
 * @Description  : 配置文件的入口文件
 */

import { defineUserConfig, defaultTheme } from 'vuepress'
// 代码块复制
import { copyCodePlugin } from 'vuepress-plugin-copy-code2'
// 导航栏搜索
import { searchPlugin } from '@vuepress/plugin-search'

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: 'Scat Studio',
  description: 'My Techstack Blog',
  head: [
    ['link', { rel: 'icon', href: '/img/logo.png' }]
  ],
  markdown: {
    // 启用行号
    lineNumbers: true
  },
  theme: defaultTheme({
    logo: '/img/logo.png',
    navbar: require('./navi/navbar'),
    sidebar: require('./navi/siderbar'),
    // 侧边栏最大深度
    sidebarDepth: 10,
    editLink: true,
    editLinkText: '在 GitHub 上编辑此页 ！',
    lastUpdated: true,
    lastUpdatedText: '最后编辑于'
  }),
  // markdown扩展配置
  extendsMarkdownOptions: (markdownOptions, app) => {
    if (markdownOptions.headers === false) return
    markdownOptions.headers ??= {}
    if (markdownOptions.headers.level) return
    // headers可展示层级
    markdownOptions.headers.level = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  // 插件
  plugins: [
    copyCodePlugin({
      showInMobile: true,
      pure: true,
      locales: {
        '/': {
          // 覆盖复制按钮标签文字
          copy: "复制此段代码",
        }
      },
    }),
    searchPlugin({
      locales: {
        '/': {
          placeholder: '搜索文档',
        },
      },
      hotKeys: ['F'],
      // 排除首页
      isSearchable: (page) => page.path !== '/'
    })
  ]
})
