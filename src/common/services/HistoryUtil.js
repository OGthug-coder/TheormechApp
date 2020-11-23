import TestStatus from "../../preview/util/TestStatus";
import EventCodeDto from "../../preview/util/EventCodeDto";
import {toDefaultFormat} from "../convertDate";

class HistoryUtil {
    static getCurrentScore(history) {
        const sortedHistory = history.sort((e1, e2) => this.compare(e1.date, e2.date));
        if (sortedHistory.length > 0) {
            return sortedHistory[0].score;
        } else {
            return 0;
        }

    }

    static getLastQuestion(history) {
        if (history.length === 0) {
            return -1;
        } else {
            const sortedHistory = history.filter(e => e.eventCode !== EventCodeDto.STARTED);
            if (sortedHistory.length > 0) {
                return sortedHistory
                    .reduce((prev, current) => current.question.serialNumber > prev.question.serialNumber ? current : prev)
                    .question
                    .serialNumber;
            } else {
                return -1;
            }
        }
    }

    static compare = (o1, o2) => {
        const dateTime2 = toDefaultFormat(o2);
        const dateTime1 = toDefaultFormat(o1);
        return dateTime2 - dateTime1;
    };

    static getStatus(lastQuestion, questions) {
        if (lastQuestion !== undefined && questions !== undefined && questions.length > 0) {
            const max = questions.reduce((prev, current) => prev.serialNumber > current.serialNumber ? prev : current).serialNumber;

            if (lastQuestion < 0) {
                return TestStatus.UNTOUCHED;
            } else if (lastQuestion >= 0
                && lastQuestion < max) {
                return TestStatus.NOT_FINISHED;
            } else {
                return TestStatus.FINISHED;
            }
        } else {
            return TestStatus.UNTOUCHED;
        }
    }
}

export default HistoryUtil;