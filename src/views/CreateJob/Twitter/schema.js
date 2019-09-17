export default {
    unitMin: {
        Unit: {
            numericality: {
                onlyInteger: true,
                greaterThan: 4,
                lessThanOrEqualTo: 59,
                divisibleBy:5,
                message:"Only multiples of 5 upto 55"
            }
        }
    },
    unitHours: {
        isNumber:true,
        Unit: {
            numericality: {
                onlyInteger: true,
                greaterThan: 1,
                lessThanOrEqualTo: 24,
                message:"Only Integer between 2 to 23"
            }
        }
    },
    unitHour: {
        isNumber:true,
        Unit: {
            numericality: {
                onlyInteger: true,
                equalTo: 1,
            }
        }
    },
    username: {
        UserName:{
            presence: true,
        }
    }
};
