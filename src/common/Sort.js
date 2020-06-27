// Sort.js

import React from 'react';

let order;
const compare = (o1, o2) => {
    if (o1.props['progress'] === 3) {
        return 1
    } else if (o2.props['progress'] === 3) {
        return -1
    } else {
        return new Date(o2.props[order]) - new Date(o1.props[order]);
    }
}

const Sort = ({children, by,}) => {
    if (!by) {
        // If no 'sort by property' provided, return original list
        return children;
    }
    order = by;
    return React.Children.toArray(children).sort(compare);

}

export default Sort;