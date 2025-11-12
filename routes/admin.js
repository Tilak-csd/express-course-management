const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const jwt = require('jsonwebtoken')
const { signupSchema, singinSchema, CourseSchema, Admin, Course } = require("../db");
const router = Router();
const jwt_password = "tilakapp"

router.post('/admin/signup/', async (req, res) => {
    // Implement admin signup logic

    try {
        const { username, password } = req.body
        const parsed = signupSchema.safeParse({ username, password })

        if (!parsed.success) {
            return res.status(400).json({
                message: "Bad Inputs"
            })
        }

        const existuser = await Admin.findOne({ username })
        if (existuser) {
            return res.status(400).json({ message: "User Already Exist." })
        }

        const newuser = await new Admin({ username, password })

        await newuser.save()

        res.status(200).json({
            message: "Admin created successfully"
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error"
        })

    }
});

router.post('/admin/signin', async (req, res) => {
    try {
        const { username, password } = req.body

        const parsed = singinSchema.safeParse({ username, password })
        if (!parsed.success) {
            return res.status(400).json({
                message: "Bad Input"
            })
        }
        const user = await Admin.findOne({ username, password })
        if (!user) {
            return res.status(404).json({
                message: "Invalid Username or Password."
            })
        }
        try{
        const token = jwt.sign({ username, password }, jwt_password)

        res.status(200).json({
            token: `Barear ${token}`
        })}
        catch(err){
            console.log(err);
            res.status(500).json({
                message : "Error in verifing the token"
            })
            
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

})

router.post('/admin/newcourses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    try {
 
        const { title, description, price, imageLink } = req.body

        const parsed = CourseSchema.safeParse({ title, description, price, imageLink })
        if (!parsed.success) {
            return res.status(400).json({
                message: "Bad Inputs"
            })
        }

        const published = true
        const newCourse = await new Course({ title, description, price, imageLink, published })
        await newCourse.save()

        res.status(200).json({
            message: "Course created successfully",
            courseId : newCourse._id
        })


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Intenal Server Error."
        })

    }
})


router.get('/admin/courses', adminMiddleware, async (req, res)=>{

    try{
        const course = await Course.find()
        if(!course){
           return res.status(404).json({
                message : "No Course Found"
            })
        }
        res.status(200).json({course})


    }catch(err){
        console.log(err);
        res.status(500).json({
            message : "Internal Server Error."
        })
        
    }

})

module.exports = router;