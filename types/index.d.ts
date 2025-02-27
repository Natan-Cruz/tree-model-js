// Project: https://github.com/joaonuno/tree-model-js
// Definitions by: Abhas Bhattacharya <https://github.com/bendtherules>
// TypeScript Version: 2.2

export = TreeModel;

declare class TreeModel<Config extends TreeModel.Config = TreeModel.Config> {
    constructor(config?: Config);

    private config: Config;

    parse<T extends {[Key in Config['childrenPropertyName'] extends string ? Config['childrenPropertyName'] : 'children']: T[] }>(model: T): TreeModel.Node<T>;
}

declare namespace TreeModel {
    class Node<T> {
        constructor(config: any, model: T);
        model: T;
        children: Node<T>[];
        parent: Node<T> | undefined;
        isRoot(): boolean;
        hasChildren(): boolean;
        addChild(child: Node<T>): Node<T>;
        addChildAtIndex(child: Node<T>, index: number): Node<T>;
        setIndex(index: number): Node<T>;
        getPath(): Array<Node<T>>;
        getIndex(): number;

        walk(options: Options, fn: NodeVisitorFunction<T>, ctx?: object): void;
        walk(fn: NodeVisitorFunction<T>, ctx?: object): void;

        all(options: Options, fn: NodeVisitorFunction<T>, ctx?: object): Array<Node<T>>;
        all(fn: NodeVisitorFunction<T>, ctx?: object): Array<Node<T>>;

        first(options: Options, fn: NodeVisitorFunction<T>, ctx?: object): Node<T> | undefined;
        first(fn: NodeVisitorFunction<T>, ctx?: object): Node<T> | undefined;

        drop(): Node<T>;

        [propName: string]: any;
    }

    interface Config {
        /**
         * The name for the children array property. Default is "children".
         */
        childrenPropertyName?: string;
        modelComparatorFn?: ComparatorFunction;
    }

    interface Options {
        strategy: StrategyName;
    }

    type StrategyName = "pre" | "post" | "breadth";

    type ComparatorFunction = (left: any, right: any) => boolean;
    type NodeVisitorFunction<T> = (visitingNode: Node<T>) => boolean;
}