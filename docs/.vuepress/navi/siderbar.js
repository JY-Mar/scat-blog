/*
 * @Author       : JY Ma
 * @Date         : 2023-02-08 11:16:48
 * @LastEditTime : 2023-02-08 11:16:53
 * @LastEditors  : majy majy@joywise.net
 * @FilePath     : /scat-blog/docs/.vuepress/siderbar.js
 * @Description  : 侧边导航栏配置
 */

module.exports = [
  '/vuepress/',
  {
    text: 'Vue',
    collapsible: true,
    children: [
      '/vue/',
      {
        text: 'Vue 2',
        collapsible: true,
        children: ['/vue/vue2/'],
      },
      {
        text: 'Vue 3',
        collapsible: true,
        children: ['/vue/vue3/'],
      },
      '/vue/optimization.md',
      '/vue/errorRecord.md',
    ],
  },
  {
    text: 'UniApp',
    collapsible: true,
    children: ['/uniapp/', '/uniapp/MP-WEIXIN.md', '/uniapp/H5.md'],
  },
  '/operator/',
  '/functions/',
]
