# admin

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


project/
│
├── controllers/    # 存放控制器，处理业务逻辑
│   └── user.js
├── models/         # 存放数据库模型相关操作
│   └── user.js
├── routers/        # 存放路由
│   └── user.js
├── servers/        # 启动服务器相关代码
│   └── index.js
├── utils/          # 工具函数
│   ├── db.js
│   └── captcha.js
└── app.js          # 主应用文件
