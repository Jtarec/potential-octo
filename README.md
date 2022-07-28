# potential-octo

Typescript、Jest、babel、eslint 集合模板工具，支持模板配置，快速创建模板
## 使用方法

涵盖修复文件指针版创建文件：
```
npm run create
```
后按照提示输入 文件夹名称、函数名

即会自动根据 template 模板文件夹在 src 目录下生成对应的文件内容，并自动配置好 jest 导入函数以及其他内容


执行目标代码:
```
npm run run:code "/path/code.ts"

eg: npm run test myCall
```

eslint检查：
```
npm run lint
```

eslint自动修复：
```
npm run lint:fix
```

jest检查所有测试用例:
```
npm run test
```

jest检查目标测试用例:
```
npm run test "yourDescribeName1 yourDescribeName2"

eg: npm run test myCall
```

jest检查涉及修改的(对应函数文件被改动的)测试用例:
```
npm run test:changed
```
## 功能特性 | Features

- [x] 支持 **自定义模板** 创建文件
- [x] 支持 jest 仅检测涉及修改的测试用例
- [x] 支持 jest 根据命令执行对应测试用例
- [ ] 提供常考手写题对应测试用例及答案解析
- [ ] 全局 Problem.md 需要展示当前生成的题目总数 以及通过的题目数量

## commit 规范

- feat: 新增功能
- fix: 修复 bug
- docs: 文档变更/ md 变更
- refactor: 模块重构
- test: 增加、修改测试用例
- build: 依赖变更
- chore: 其他杂项
- revert: 回滚 commit