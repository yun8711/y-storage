# y-storage

## 介绍

一个本地缓存管理工具。

### 项目背景

在实际项目开发中，经常会有操作 localStorage 和 sessionStorage 的场景，尤其是在多人合作，比如像微前端这种场景下，
每个子项目的开发者都有可能向 localStorage 和 sessionStorage 中添加需要的数据，这样就会造成数据污染的问题；并且每个人的使用方式、封装方式都不一样；
虽然通过规范可以一定程度上解决这个问题，但是仍然需要一个统一的管理工具。
这个工具就是为了解决这个问题，让你在项目中可以方便的进行本地数据存储，免除数据污染及操作的不便性。

### 主要功能

- 命名空间：强制性命名空间，实现数据存储空间隔离
- 时效性：可以设置数据的过期时间，过期后自动删除
- 安全性：数据检验，保证添加数据时，不会覆盖已有数据
- once：实现数据只能被读取一次功能，读取后自动删除

### 注意事项

使用 y-storage 添加的数据，也可以通过浏览器原生的 localStorage、SessionStorage 来访问，只不过 y-storage 进行了一些包装。
仍然推荐使用 y-storage 来进行数据的存储和读取，保证行为的一致性。

## 安装

```bash
npm install y-storage
// 或者
pnpm add y-storage
```

**在浏览器中使用**

```html
<script src="https://unpkg.com/dist/index.js"></script>
```

## 用法

### 初始化

调用 new YStorage()，创建一个实例对象，会在 target 指定的存储位置（localStorage 或 sessionStorage）空间中创建一个指定由 `YStorage_${namespace}` 指定名称的存储空间。
如果你需要多个存储空间，可以创建多个实例对象。

```js
import YStorage from "y-storage";

const yStorage = new YStorage(options);
```

**参数说明**

| 参数        | 类型       | 默认值       | 是否必填 | 说明                                                        |
|-----------|----------|-----------|------|-----------------------------------------------------------|
| namespace | string   |           | 必填   | 命名空间，用于区分不同的存储空间                                          |
| target    | string   | 'local'   |      | 存储类型，可选值：local、session，分别表示 localStorage 和 sessionStorage |
| override  | boolean  | false     |      | 如果已存在同名存储空间，是否覆盖                                          |
| callback  | function | undefined |      | 回调函数，在 YStorage 上的操作都会触发该回调函数                             |

### 添加数据

这是核心方法，其中 options 参数提供了一些额外的功能，如设置数据的过期时间、数据只能被读取一次等。
待存储的数据可以是任意能被 JSON.stringify() 方法执行的数据，方法内部会自动对数据进行转换。

```js
yStorage.setItem(key, value, options);
```

**参数说明**

| 参数              | 类型      | 默认值              | 是否必填 | 说明                                                        |
|-----------------|---------|------------------|------|-----------------------------------------------------------|
| key             | string  |                  | 必填   | 数据的键                                                      |
| value           | unknown | ""               | 必填   | 数据的值                                                      |
| options         | object  | {}               |      | 额外的配置项                                                    |
| options.target  | string  | 实例化时指定的 target 值 |      | 存储类型，可选值：local、session，分别表示 localStorage 和 sessionStorage |
| options.expires | number  | null             |      | 过期时间，单位：毫秒，如果不设置，则表示永不过期                                  |
| options.once    | boolean | false            |      | 是否只能被读取一次，如果设置为 true，则读取后自动删除                             |
| options.safety  | boolean | false            |      | 是否在存储数据时校验 key 是否已存在，如果设置为 true，则不会覆盖已存在的数据               |

### 获取数据

```js
yStorage.getItem(key);
```

### 删除数据

```js
yStorage.removeItem(key);
```

### 清空存储空间

```js
yStorage.clear();
```

### 删除存储空间

```js
yStorage.destroy();
```

### 判断键是否存在

```js
yStorage.has(key);
```