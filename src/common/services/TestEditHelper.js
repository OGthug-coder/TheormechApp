import isUndefined from "../IsUndefined";
import {toCustomFormat} from "../convertDate";

class TestEditHelper {
    constructor(api, test) {
        this.api = api;
        this.test = test;
        this.changeCounter = 0;
        this.isNew = isUndefined(test.id);
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
        const dateFormattingPromise = new Promise((resolve, reject) => {
            let test = this.test;
            test.date = !isUndefined(test.date) ? toCustomFormat(test.date) : toCustomFormat(new Date());
            resolve(test);
        });

        if (!isUndefined(this.test.img) ) {
            const imageUploadPromise = this.api.uploadImage(this.test.img);

            return Promise.all([dateFormattingPromise, imageUploadPromise])
                .then(([test, img]) => {
                    return test.img = img;
                });
        }
        return dateFormattingPromise;
    }

}

export default TestEditHelper;