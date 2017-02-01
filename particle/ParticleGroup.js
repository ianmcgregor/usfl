import linkedList from '../linked-list';
import objectPool from '../object-pool';
import Particle from './index';

export default class ParticleGroup {
    constructor(factoryFn) {
        if (!factoryFn) {
            factoryFn = () => new Particle();
        }
        this.update = this.update.bind(this);
        this.list = linkedList();
        this.pool = objectPool(factoryFn);
    }

    create(options) {
        const p = this.pool.get();
        p.reset(options);
        this.list.add(p);
        return p;
    }

    add(p) {
        this.list.add(p);
    }

    remove(p) {
        this.list.remove(p);
        this.pool.dispose(p);
    }

    forEach(fn) {
        let p = this.list.first;
        while (p) {
            fn(p);
            p = p.next;
        }
    }

    update(fn) {
        let p = this.list.first;
        while (p) {
            const next = p.next;
            p.update();
            if (typeof fn === 'function') {
                fn(p);
            }
            if (!p.alive) {
                this.remove(p);
            }
            p = next;
        }
    }
}
