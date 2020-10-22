import isUndefined from "../IsUndefined";
import {toCustomFormat} from "../convertDate";
import InvalidDateFormatException from "../exceptions/InvalidException";

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
                    this.api.saveTest(this.prepareTest()).then(test => {
                        this.test = test;
                        this.isNew = false;
                    });
                }
            } else {
                this.api.updateTest(this.prepareTest());
            }
            this.changeCounter = 0;
        }
    }

    prepareTest() {
        let test = this.test;
        try {
            test.date = !isUndefined(test.date) ? toCustomFormat(new Date(test.date)) : toCustomFormat(new Date());
        } catch (e) {
            if (e instanceof InvalidDateFormatException) {
            //       That means the date is already formatted
            }
        }

        let maxScore = 0;

        if (!isUndefined(test.questions)) {
            // Delete non questions
            test.questions = test.questions.filter(q => q.questionText !== "PLACEHOLDER");
            // Delete temp ids
            // and get maxScore
            let indexes = [];
            test.questions.map(q => {
                if (q.id < 0) {
                    delete q.id;
                }

                q.answers.map(a => {
                    delete a.serialNumber;
                    return a;
                });

                if (!indexes.includes(q.serialNumber)) {
                    maxScore += q.reward;
                    indexes.push(q.serialNumber);
                }

                if (isUndefined(q.reward)) {
                    q.reward = 0;
                }

                return q;
            });
        }

        test.maxScore = maxScore;

        return test;
    }

}

export default TestEditHelper;