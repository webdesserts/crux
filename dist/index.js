const Crux = {
    create() {
        let obj = Object.create(this);
        obj.init.apply(obj, arguments);
        return obj;
    },
    extend() {
        return Object.create(this);
    },
    init() { },
    get proto() { return Object.getPrototypeOf(this); },
};
export default Crux;
//# sourceMappingURL=index.js.map