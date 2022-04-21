# potential-octo

Typescript、Jest、babel、eslint 集合模板工具，支持模板配置，快速创建模板

## 使用方法

涵盖修复文件指针版创建文件：
```
npm run create
```
后按照提示输入 文件夹名称、函数名

即会自动根据 template 模板文件夹在 src 目录下生成对应的文件内容，并自动配置好 jest 导入函数以及其他内容

修复文件指针：
```
npm run fix
```
文件名从 1 开始自增，如中间删除了某个文件夹比如 已存在 1 2 3 个文件夹，删除 2 号文件夹，使用 fix 后下次创建文件夹将创建 以 2 为开头文件夹

直接创建文件夹：
```
npm run generate
```

eslint检查：
```
npm run lint
```

eslint自动修复：
```
npm run lint:fix
```

jest测试用例检查:
```
npm run test
```

## 待优化

支持脚手架创建
src 目录边界条件处理
