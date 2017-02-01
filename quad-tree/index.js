
class Node {
    constructor(bounds, depth, maxDepth, maxChildren) {
        this._bounds = bounds;
        this._depth = depth;
        this._maxDepth = maxDepth;
        this._maxChildren = maxChildren;

        this.children = [];
        this.nodes = [];
    }

    insert(item) {
        if (this.nodes.length) {
            const index = this._findIndex(item);
            this.nodes[index].insert(item);
            return;
        }

        this.children.push(item);

        if (!(this._depth >= this._maxDepth) && this.children.length > this._maxChildren) {

            this.subdivide();

            for (let i = 0; i < this.children.length; i++) {
                this.insert(this.children[i]);
            }

            this.children.length = 0;
        }
    }

    retrieve(item) {
        if (this.nodes.length) {
            const index = this._findIndex(item);
            return this.nodes[index].retrieve(item);
        }

        return this.children;
    }

    _findIndex(item) {
        const {x, y, width, height} = this._bounds;

        const right = item.x > x + width / 2;
        const bottom = item.y > y + height / 2;

        let index;

        if (right) {
            index = bottom ? Node.BR : Node.TR;
        } else {
            index = bottom ? Node.BL : Node.TL;
        }

        return index;
    }

    subdivide() {
        const depth = this._depth + 1;

        const {x, y, width, height} = this._bounds;
        const w = width / 2;
        const h = height / 2;

        this.nodes[Node.TL] = new Node({
            x,
            y,
            width: w,
            height: h
        },
        depth, this._maxDepth, this._maxChildren);

        this.nodes[Node.TR] = new Node({
            x: x + w,
            y,
            width: w,
            height: h
        },
        depth, this._maxDepth, this._maxChildren);

        this.nodes[Node.BL] = new Node({
            x,
            y: y + h,
            width: w,
            height: h
        },
        depth, this._maxDepth, this._maxChildren);

        this.nodes[Node.BR] = new Node({
            x: x + w,
            y: y + h,
            width: w,
            height: h
        },
        depth, this._maxDepth, this._maxChildren);
    }

    clear() {
        this.children.length = 0;

        while (this.nodes.length) {
            this.nodes.pop().clear();
        }
    }
}

Node.TL = 0;
Node.TR = 1;
Node.BL = 2;
Node.BR = 3;

export default class QuadTree {
    constructor(bounds, maxDepth = -1, maxChildren = -1) {
        this.root = new Node(bounds, 0, maxDepth, maxChildren);
    }

    insert(item) {
        if (Array.isArray(item)) {
            for (let i = 0; i < item.length; i++) {
                this.root.insert(item[i]);
            }
        } else {
            this.root.insert(item);
        }
    }

    clear() {
        this.root.clear();
    }

    retrieve(item) {
        return this.root.retrieve(item);
    }
}
