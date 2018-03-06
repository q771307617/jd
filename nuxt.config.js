module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '建德企业信息平台',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      { src: 'http://api.tianditu.com/api?v=4.0' },
      {
        src:
          'http://lbs.tianditu.com/api/js4.0/opensource/openlibrary/ImageOverlay.js'
      },
      { src: 'http://code.jquery.com/jquery-1.7.2.min.js' }
    ]
  },
  router: {
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },
  /*
  ** Customize the progress bar color
  */
  modules: ['@nuxtjs/axios', '@nuxtjs/proxy'],
  proxy: [
    /* 开发地址 */
    ['/api', { target: 'http://dev.jd.yumc.pw' }],
    ['/upload', { target: 'http://172.30.34.241:8081' }],
    ['/map', { target: 'http://online.jd.yumc.pw/map' }]
    // ['/map', { target: 'http://172.30.34.63:6080' }]
    // 线上地址
    // ['/api', { target: 'http://online.jd.yumc.pw/' }],
    // ['/upload', { target: 'http://online.jd.yumc.pw/api/upload' }],
    // ['/map', { target: 'http://online.jd.yumc.pw/map' }]
  ],
  loading: { color: '#3B8070' },
  /*
  **页面过渡动画
  */
  css: [
    'assets/main.css',
    'assets/scss/reset.scss',
    'element-ui/lib/theme-chalk/index.css'
  ],
  /*
  **动态路由数组
  */
  /*
  ** Build configuration
  */
  build: {
    // analyze: true,
    // or
    analyze: {
      analyzerMode: 'static'
    },
    /*
    ** Run ESLint on save
    */
    /* 请求数据 */
    vendor: ['axios', 'element-ui'],
    extend(config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
      // 添加sass
      const sassResourcesLoader = {
        loader: 'sass-resources-loader',
        options: {
          resources: ['assets/scss/reset.scss']
        }
      };
      // 遍历nuxt定义的loader配置，向里面添加新的配置。
      config.module.rules.forEach(rule => {
        if (rule.test.toString() === '/\\.vue$/') {
          rule.options.loaders.sass.push(sassResourcesLoader);
          rule.options.loaders.scss.push(sassResourcesLoader);
        }
        if (['/\\.sass$/', '/\\.scss$/'].indexOf(rule.test.toString()) !== -1) {
          rule.use.push(sassResourcesLoader);
        }
      });
    }
  },
  plugins: [
    { src: '~plugins/element-ui', ssr: true },
    { src: '~plugins/filters.js', ssr: true }
  ]
};
