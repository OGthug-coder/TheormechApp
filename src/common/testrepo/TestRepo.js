class TestRepo {
    constructor() {
        this.cache = {};
    }

    // Override value if exists
    push(key, value) {
        this.cache[key] = value;
    }

    remove(key) {
        delete this.cache[key];
    }

    // Return undefined if doesnt exist
    get(key) {
        return this.cache[key];
    }

    clear() {
        this.cache = {};
    }

}

export default TestRepo;