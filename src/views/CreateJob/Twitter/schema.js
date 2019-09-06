export default {
    unitMin: {
        Unit: {
            numericality: {
                onlyInteger: true,
                greaterThan: 4,
                lessThanOrEqualTo: 59,
                divisibleBy:5,
            }
        }
    },
    unitHour: {
        isNumber:true,
        Unit: {
            numericality: {
                onlyInteger: true,
                greaterThan: 1,
                lessThanOrEqualTo: 24,
            }
        }
    }
};
