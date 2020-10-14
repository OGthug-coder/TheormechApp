import {toDefaultFormat} from "../common/convertDate";
import isUndefined from "../common/IsUndefined";

class TestCreationService {
    constructor(api) {
        this.api = api;
    }

    getLimitation(test) {
        if (!isUndefined(test)
            && !isUndefined(test.timeToComplete)
            && test.timeToComplete !== null
            && test.timeToComplete !== "null") {
            return true;
        } else {
            return false
        }
    }

    getDelay(test) {
        if (!isUndefined(test) && !isUndefined(test.date)) {
            let date = toDefaultFormat(test.date);
            let now = new Date();
            return date > now;
        } else {
            return false
        }
    }
}


export default TestCreationService;
