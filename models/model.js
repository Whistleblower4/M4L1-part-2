const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
    {
        name: String,
        grade: {
            type: Number,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value'
            },
            min: [0, 'Grade can not be less than 0'],
            max: [100, 'Grade can not be more than 100']
        }

})

const studentSchema = new mongoose.Schema(
    {
        name: String,
        age: {
            type: Number,
            min: [0, 'Age can not be less than 0']
        },
        email: {
            type: String,
            validate: {
                validator: function(v) {
                    return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
                },
                message: props => `${props.value} is not a valid email!`
            },
            required: [true, 'User email is required']
        },
        courses: [courseSchema]
});

const student = mongoose.model('student', studentSchema);

module.exports = student;