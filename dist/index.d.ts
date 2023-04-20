type TargetType = "local" | "session";
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
interface setItmArgs {
    expires: number;
    once: boolean;
    override: boolean;
}
interface constructorOptions {
    namespace: string;
    override?: boolean;
    target?: TargetType;
    callback?: ((detail: callbackArg) => void) | undefined;
}
export declare class YStorage {
    readonly prefix: string;
    readonly namespace: string;
    readonly target: TargetType;
    private readonly storage;
    callback: ((detail: callbackArg) => void) | undefined;
    constructor(options: constructorOptions);
    private _initSpace;
    has(key: string): boolean;
    destroy(): void;
    setItem(key: string, value: unknown, options?: setItmArgs): void;
    removeItem(key: string): void;
    getItem(key: string): unknown;
    clear(): void;
}
export {};
