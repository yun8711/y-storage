# y-storage

<p style="text-align: center">

[//]: # (版本)
<img alt="npm" src="https://img.shields.io/npm/v/y-storage?style=flat-square">

[//]: # (包体积)
<img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/y-storage?style=flat-square">

[//]: # (月下载量)
<img alt="npm" src="https://img.shields.io/npm/dm/y-storage?style=flat-square">

[//]: # (开源协议)
<img alt="NPM" src="https://img.shields.io/npm/l/y-storage?style=flat-square">
</p>

## 介绍

一个本地缓存管理工具。

### 项目背景

在实际项目开发中，经常会有操作 localStorage 和 sessionStorage 的场景，尤其是在多人合作，比如像微前端这种场景下，<br/>
每个子项目的开发者都有可能向 localStorage 和 sessionStorage 中添加需要的数据，这样就会造成数据污染的问题；并且每个人的使用方式、封装方式都不一样；
虽然通过规范可以一定程度上解决这个问题，但是仍然需要一个统一的管理工具。<br/>
YStorage 就是为了解决这个问题，让你在项目中可以方便的进行本地数据存储，尽可能避免数据污染及操作的不便性。

### 主要功能

- 命名空间：强制性命名空间，实现数据存储空间隔离
- 时效性：可以设置数据的过期时间，过期后自动删除
- 安全性：数据检验，保证添加数据时，不会覆盖已有数据
- once：实现数据只能被读取一次功能，读取后自动删除

### 注意事项

使用 y-storage 添加的数据，也可以通过浏览器原生的 localStorage、SessionStorage 来访问，只不过 y-storage 进行了一些包装。<br/>
<b>推荐使用 y-storage 来进行数据的存储和读取，保证行为的一致性。</b>

## 安装

```bash
pnpm add y-storage
```

**在浏览器中使用**

```html
<script src="https://unpkg.com/y-storage@0.0.5/dist/index.umd.js"></script>
```

## 用法

### 初始化/创建存储空间

调用 new YStorage()，创建一个存储空间的实例，将会在 target 指定的存储位置（localStorage 或 sessionStorage）中创建一个由 namespace 指定名称的存储空间。<br/>
实际上在 storage 中真实的名称为`YStorage_${namespace}`，这样做的目的是为了避免与其他库的存储空间冲突。<br/>
在初始化时指定namespace 后，后续的操作都会在该存储空间中进行。<br/>
如果你需要多个存储空间，可以创建多个实例对象。
> 在设计之初也曾考虑在一个 YStorage 实例中管理多个存储空间，但是这样做会导致实例对象的复杂度增加，不利于维护。

```js
import YStorage from "y-storage";

const yStorage = new YStorage(options);
```

**参数 options**

| 配置项       | 类型       | 默认值       | 是否必填 | 说明                                                        |
|-----------|----------|-----------|------|-----------------------------------------------------------|
| namespace | string   |           | 必填   | 命名空间，用于区分不同的存储空间                                          |
| target    | string   | 'local'   |      | 存储类型，可选值：local、session，分别表示 localStorage 和 sessionStorage |
| override  | boolean  | false     |      | 如果已存在同名存储空间，是否覆盖                                          |
| callback  | function | undefined |      | 回调函数，在 YStorage 上的操作都会触发该回调函数                             |

### 添加数据

这是核心方法，其中 options 参数是实现 YStorage 中那些额外功能的关键。<br/>
待存储的数据可以是任意能被 JSON.stringify() 方法解析的数据，内部会自动对数据进行转换。

```js
yStorage.setItem(key, value, options);
```

**参数说明**

| 参数              | 类型      | 默认值              | 是否必填 | 说明                                                        |
|-----------------|---------|------------------|------|-----------------------------------------------------------|
| key             | string  |                  | 必填   | 数据的键                                                      |
| value           | unknown | ""               |      | 数据的值                                                      |
| options         | object  | {}               |      | 额外的配置项                                                    |
| options.target  | string  | 实例化时指定的 target 值 |      | 存储类型，可选值：local、session，分别表示 localStorage 和 sessionStorage |
| options.expires | number  | null             |      | 过期时间，单位：毫秒，如果不设置，则表示永不过期                                  |
| options.once    | boolean | false            |      | 是否只能被读取一次，如果设置为 true，则读取后自动删除                             |
| options.safety  | boolean | false            |      | 是否在存储数据时校验 key 是否已存在，如果设置为 true，则不会覆盖已存在的数据               |

### 获取数据

获取指定 key 的数据，如果数据不存在，则返回 null。

```js
yStorage.getItem(key);
```

### 删除数据

删除指定 key<br/>
注意与`setItem(key,'')`的区别，前者是删除数据，后者是将数据置空。

```js
yStorage.removeItem(key);
```

### 清空数据

清空存储空间中的所有数据，但是不会删除存储空间。

```js
yStorage.clear();
```

### 销毁存储空间

从 storage 中删除存储空间。

```js
yStorage.destroy();
```

### 判断键是否存在

判断在当前存储空间中是否存在指定的 key。

```js
yStorage.has(key);
```