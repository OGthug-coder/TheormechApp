import isUndefined from "../IsUndefined";
import {toCustomFormat} from "../convertDate";

class TestEditHelper {
    constructor(api, test) {
        this.api = api;
        this.test = test;
        this.changeCounter = 0;
        this.isNew = isUndefined(test.id);
    }

    getTest() {
        return this.test;
    }

    updateValue(testAttribute, value) {
        this.changeCounter++;
        this.test[testAttribute] = value;
    }

    sendChanges() {
        if (this.changeCounter > 0) {
            if (this.isNew) {
                if (!isUndefined(this.test.title)) {
                    this.api.saveTest(this.prepareTest());
                    console.log("save");
                }
            } else {
                this.api.updateTest(this.prepareTest());
                console.log("update");
            }
        }
    }

    prepareTest() {
        let test = this.test;
        test.date = !isUndefined(test.date) ? toCustomFormat(new Date(test.date)) : toCustomFormat(new Date());

        return test;
    }

}

export default TestEditHelper;