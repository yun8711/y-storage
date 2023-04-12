type TargetType = "local" | "session";
interface setItmArgs {
    target: TargetType;
    timeout: null | number;
    safety: boolean;
    once: boolean;
}
/**
 * @class YStorage
 * @description 声明一个类，用于存储数据，同时提供事件监听
 */
declare class YStorage {
    namespace: string;
    target: TargetType;
    constructor(arg: {
        namespace: string;
        target: TargetType;
    });
    /**
     * @description 初始化存储空间
     * @param target
     * @private
     */
    private _init;
    private _getStorage;
    /**
     * @description 设置属性值
     */
    setItem(key: string, value: unknown, options?: setItmArgs): void;
    /**
     * @description 删除属性
     * @param key {string} 属性名
     * @param target {TargetType} 存储位置，session/local
     */
    removeItem(key: string, target: TargetType): void;
    /**
     * @description 获取属性值
     * @param key {string} 属性名
     * @param target {TargetType} 存储位置，session/local
     */
    getItem(key: string, target: TargetType): unknown;
    /**
     * @description 清空存储空间
     * @param [target] {TargetType | undefined} 存储位置，session/local/undefined
     */
    clear(target?: TargetType): void;
}
export default YStorage;
