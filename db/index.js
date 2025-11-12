const mongoose = require('mongoose');
const zod = require('zod');

// Connect to MongoDB
mongoose.connect("mongodb+srv://admin:admin123456789@cluster0.mlaafeg.mongodb.net/user_app")

// Define schemas

// zod
const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string().min(6)
})

const singinSchema = zod.object({
    username : zod.string(),
    password : zod.string()
})

const CourseSchema = zod.object({
    title : zod.string().min(5),
    description : zod.string().min(15),
    price : zod.number().min(1),
    imageLink : zod.string().min(1)
})

const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String,
    purchasedCourse : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course'
    }]
});

const courseSchema = new mongoose.Schema({
    // Schema definition here
    title : String,
    description : String,
    price : Number,
    imageLink : String,
    published : Boolean
});

const Admin = mongoose.model('Admin', AdminSchema)
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', courseSchema);

module.exports = {
    signupSchema,
    singinSchema,
    CourseSchema,
    Admin,
    User,
    Course
}