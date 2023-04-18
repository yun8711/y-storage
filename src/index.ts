type TargetType = "local" | "session";

// 回调事件的detail数据类型
interface callbackArg {
  func: string | null;
  target: TargetType;
  namespace: string | null;
  key?: string | null;
  value?: unknown;
  once?: boolean | null;
  expires?: number | null;
  safety?: boolean | null;
  override?: boolean | null;
}

// 在命名空间内存储的数据格式
interface cachedDataInterface {
  [key: string]: setItmOptions;
}

interface setItmOptions {
  value: unknown;
  expires: null | number;
  override: boolean;
  once: boolean;
  [key: string]: unknown;
}

// setItem 方法附加参数类型定义
interface setItmArgs {
  expires: number;
  once: boolean;
  override: boolean;
}

/**
 * @description 获取存储对象
 */
function getStorage(target: TargetType) {
  const storage = window?.[((target || "local") + "Storage") as keyof Window];
  if (storage === undefined) {
    // 抛出异常：当前环境不支持
    throw new Error(`[YStorage] The current environment does not support ${target}Storage`);
  }
  return storage;
}

interface constructorOptions {
  namespace: string;
  override?: boolean;
  target?: TargetType;
  callback?: ((detail: callbackArg) => void) | undefined;
}

/**
 * @class YStorage
 * @description 声明一个类，用于存储数据，同时提供事件监听
 */
class YStorage {
  readonly prefix: string = "YStorage_";
  readonly namespace: string;
  readonly target: TargetType;
  private readonly storage: Storage;
  callback: ((detail: callbackArg) => void) | undefined;

  // 实例初始化
  constructor(options: constructorOptions) {
    this.target = options.target ?? "local";
    this.storage = getStorage(this.target);
    this.namespace = this.prefix + options.namespace;
    options.override = options.override ?? false;
    if (options.callback) {
      this.callback = options.callback;
    }
    this._initSpace(options);
  }

  /**
   * @description 初始化存储空间
   * @private
   * @param {constructorOptions} options
   */
  private _initSpace(options: constructorOptions): void {
    try {
      if (!this.storage.getItem(options.namespace) || options.override === true) {
        this.storage.setItem(options.namespace, JSON.stringify({}));
      }
      this.callback &&
        this.callback({
          func: "init",
          namespace: this.namespace,
          target: this.target,
        });
    } catch (e: unknown) {
      throw new Error(`[YStorage] Initialization failed ${(e as Error)?.message}`);
    }
  }

  /**
   * @description 是否有某个key，只判断key，不判断值
   * @param {string} key
   */
  has(key: string) {
    try {
      const cachedDataStr = this.storage.getItem(this.namespace) || "";
      const cachedData: cachedDataInterface = cachedDataStr ? JSON.parse(cachedDataStr) : {};
      return Object.hasOwn(cachedData, key);
    } catch (e: unknown) {
      throw new Error(`[YStorage] read fail ${(e as Error)?.message}`);
    }
  }

  /**
   * @description 删除存储空间
   */
  destroy() {
    try {
      this.storage.removeItem(this.namespace);
      this.callback &&
        this.callback({
          func: "destroy",
          namespace: this.namespace,
          target: this.target,
        });
    } catch (e: unknown) {
      throw new Error(`[YStorage] destroy fail ${(e as Error)?.message}`);
    }
  }

  /**
   * @description 向存储空间内添加数据
   * @param {string}  key 数据的key
   * @param {any} value 数组值
   * @param {object} options 额外参数
   */
  setItem(key: string, value: unknown, options?: setItmArgs) {
    try {
      // 如果没有传入namespace，且
      const merged: setItmArgs = {
        expires: options?.expires ?? 0,
        once: options?.once ?? false,
        override: options?.override ?? false,
      };
      const cachedDataStr = this.storage.getItem(this.namespace) || "";
      const cachedData: cachedDataInterface = cachedDataStr ? JSON.parse(cachedDataStr) : {};
      // key安全性检查，如果key已存在，则不能赋值，扫除异常：
      if (cachedData[key] && !merged.override) {
        throw new Error(`[YStorage] The key ${key} already exists`);
      }

      cachedData[key] = {
        value: value ?? "",
        expires: merged.expires !== 0 ? new Date().getTime() + merged.expires : 0,
        once: merged.once,
        override: merged.override,
      };
      this.storage.setItem(this.namespace, JSON.stringify(cachedData));
      this.callback &&
        this.callback({
          func: "setItem",
          namespace: this.namespace,
          target: this.target,
          key,
          value,
          ...merged,
        });
    } catch (e: unknown) {
      throw new Error(`[YStorage] setItem failed ${(e as Error)?.message}`);
    }
  }

  /**
   * @description 删除属性
   * @param key {string} 属性名
   */
  removeItem(key: string) {
    try {
      const cachedDataStr = this.storage.getItem(this.namespace) || "";
      const cachedData: cachedDataInterface = cachedDataStr ? JSON.parse(cachedDataStr) : {};
      delete cachedData[key];
      this.storage?.setItem(this.namespace, JSON.stringify(cachedData));
      this.callback &&
        this.callback({
          func: "removeItem",
          target: this.target,
          namespace: this.namespace,
          key,
        });
    } catch (e: unknown) {
      throw new Error(`[YStorage] removeItem failed ${(e as Error)?.message}`);
    }
  }

  /**
   * @description 获取属性值
   * @param key {string} 属性名
   */
  getItem(key: string) {
    try {
      let result: unknown = null;
      const cachedDataStr = this.storage.getItem(this.namespace) || "";
      const cachedData: cachedDataInterface = cachedDataStr ? JSON.parse(cachedDataStr) : {};
      const item = cachedData[key];
      if (item) {
        // 如果设置了过期时间，且已经过期，则删除该属性，返回null
        if (item.expires && item.expires < new Date().getTime()) {
          this.removeItem(key);
        } else {
          result = JSON.parse(typeof item.value === "string" ? item.value : "");
        }
        // 如果设置了once，则在取值后删除该属性
        if (item.once) {
          this.removeItem(key);
        }
      }
      this.callback &&
        this.callback({
          func: "getItem",
          target: this.target,
          namespace: this.namespace,
          key,
          value: result,
        });
      return result;
    } catch (e: unknown) {
      throw new Error(`[YStorage] getItem failed ${(e as Error)?.message}`);
    }
  }

  /**
   * @description 清空存储空间
   */
  clear() {
    try {
      this.storage.setItem(this.namespace, "");
      this.callback &&
        this.callback({
          func: "clear",
          target: this.target,
          namespace: this.namespace,
        });
    } catch (e: unknown) {
      throw new Error(`[YStorage] clear failed ${(e as Error)?.message}`);
    }
  }
}

export default YStorage;
