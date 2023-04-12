var YStorage = (function () {
    'use strict';

    // 自定义浏览器事件的detail数据类型
    function dispatchEvent(detail) {
        const event = new CustomEvent("yStorage", {
            detail: Object.assign({}, {
                once: null,
                timeout: null,
                func: null,
                safety: null,
            }, detail),
        });
        window.dispatchEvent(event);
    }
    /**
     * @class YStorage
     * @description 声明一个类，用于存储数据，同时提供事件监听
     */
    class YStorage {
        constructor(arg) {
            this.namespace = arg.namespace;
            this.target = arg.target || "session";
            this._init(this.target);
        }
        /**
         * @description 初始化存储空间
         * @param target
         * @private
         */
        _init(target) {
            const storageName = target || this.target;
            const storage = window === null || window === void 0 ? void 0 : window[((storageName || "session") + "Storage")];
            if (storage !== undefined) {
                const cachedData = {};
                storage.setItem(this.namespace, JSON.stringify(cachedData));
            }
        }
        // 根据target获取storage对象
        _getStorage(target) {
            const storageName = target || this.target;
            return window === null || window === void 0 ? void 0 : window[((storageName || "session") + "Storage")];
        }
        /**
         * @description 设置属性值
         */
        setItem(key, value, options = {
            timeout: null,
            safety: false,
            once: false,
            target: this.target,
        }) {
            const storage = this._getStorage(options === null || options === void 0 ? void 0 : options.target);
            let cachedDataStr = "";
            if (storage !== undefined)
                cachedDataStr = storage.getItem(this.namespace) || "";
            // 序列化数据
            const cachedData = JSON.parse(cachedDataStr);
            // key安全性检查，如果key已存在，则不能赋值
            if ((options === null || options === void 0 ? void 0 : options.safety) && key in cachedData) {
                throw new Error(`[YStorage] key : ${key} is exist and safety is true`);
            }
            cachedData[key] = {
                value,
                timeout: options.timeout !== null ? new Date().getTime() + options.timeout : null,
                once: options.once,
                safety: options.safety,
            };
            storage === null || storage === void 0 ? void 0 : storage.setItem(this.namespace, JSON.stringify(cachedData));
            dispatchEvent({
                func: "setItem",
                // target: options.target,
                namespace: this.namespace,
                key,
                value,
                ...options,
            });
        }
        /**
         * @description 删除属性
         * @param key {string} 属性名
         * @param target {TargetType} 存储位置，session/local
         */
        removeItem(key, target) {
            const storage = this._getStorage(target);
            let cachedDataStr = "";
            if (storage !== undefined)
                cachedDataStr = storage.getItem(this.namespace) || "";
            const cachedData = cachedDataStr ? JSON.parse(cachedDataStr) : {};
            delete cachedData[key];
            storage === null || storage === void 0 ? void 0 : storage.setItem(this.namespace, JSON.stringify(cachedData));
            dispatchEvent({
                func: "removeItem",
                target: target,
                namespace: this.namespace,
                key,
            });
        }
        /**
         * @description 获取属性值
         * @param key {string} 属性名
         * @param target {TargetType} 存储位置，session/local
         */
        getItem(key, target) {
            let result = null;
            const storage = this._getStorage(target);
            let cachedDataStr = "";
            if (storage !== undefined)
                cachedDataStr = storage.getItem(this.namespace) || "";
            const cachedData = cachedDataStr ? JSON.parse(cachedDataStr) : {};
            const item = cachedData[key];
            if (item) {
                // 如果设置了过期时间，且已经过期，则删除该属性，返回null
                if (item.timeout && item.timeout < new Date().getTime()) {
                    this.removeItem(key, target);
                    result = null;
                }
                else {
                    result = item.value;
                }
                // 如果设置了once，则在取值后删除该属性
                if (item.once) {
                    this.removeItem(key, target);
                }
            }
            return result;
        }
        /**
         * @description 清空存储空间
         * @param [target] {TargetType | undefined} 存储位置，session/local/undefined
         */
        clear(target) {
            if (target === undefined || target === "session") {
                window.sessionStorage.setItem(this.namespace, "");
            }
            if (target === undefined || target === "local") {
                window.localStorage.setItem(this.namespace, "");
            }
            dispatchEvent({
                func: "clear",
                target: target === undefined ? ["local", "session"] : target,
                namespace: this.namespace,
            });
        }
    }

    return YStorage;

})();
