const { Router } = require("express");
const router = Router();
const { signupSchema, singinSchema, CourseSchema, User, Course } = require("../db");
const userMiddleware = require("../middleware/user");
const jwt = require('jsonwebtoken')
const jwt_password = 'tilakapp'

router.post('/user/signup', async (req, res) => {

    try {
        const { username, password } = req.body

        const parsed = signupSchema.safeParse({ username, password })
        if (!parsed.success) {
            return res.json({ message: "Bad Inputs." })
        }

        const userExist = await User.findOne({ username })
        if (userExist) {
            return res.json({
                message: "User already Exists."
            })
        }

        const newUser = await new User({
            username,
            password
        })
        await newUser.save()
        res.status(200).json({
            message: "User Created Succesfully"
        })



    } catch (err) {
        console.log(err);
        res.json({ message: "Internal Server Error" })

    }

})

router.post('/user/signin', async (req, res) => {
    try {
        const { username, password } = req.body

        const parsed = singinSchema.safeParse({ username, password })
        if (!parsed.success) {
            return res.status(400).json({
                message: "Bad Input"
            })
        }
        const user = await User.findOne({ username, password })
        if (!user) {
            return res.status(404).json({
                message: "Invalid Username or Password."
            })
        }

        const token = jwt.sign({ username, password }, jwt_password)
        res.status(200).json({
            token: `Bearer ${token}`
        })

    } catch (err) {
        console.log(err);
        res.json({ message: "Internal Server Error" })

    }
})

router.get('/user/courses', async (req, res) => {
    try {
        const courses = await Course.find()
        res.status(200).json({
            courses: courses
        })

    } catch (err) {
        console.log(err);
        res.json({ message: "Internal Server Error" })

    }
})

router.post('/user/courses/:courseID', userMiddleware, async (req, res) => {
    try {

        const PurchasedCourseId = req.params.courseID
        if (!PurchasedCourseId) {
            return res.status(500).json({ message: "Not Found" })
        }
        const username = req.username
        const user = await User.findOne({ username })

        if (!user.purchasedCourse.includes(PurchasedCourseId)) {
            user.purchasedCourse.push(PurchasedCourseId)
            await user.save()
        } else {
            return res.status(400).json({
                message: "Aleady Purchased. "
            })
        }
        res.status(200).json({
            message: "Course purchased successfully"
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })

    }
})

router.get('/user/purchasedCourses', userMiddleware, async (req, res) => {
    try {
        const username = req.username
        const user = await User.findOne({ username }).populate('purchasedCourse')

        const coursepurchased = user.purchasedCourse
        if (!coursepurchased) {
            return res.status(401).json({ message: "Not Found" })
        }

        res.status(200).json({
            purchasedCourse: coursepurchased
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error." })

    }
})


module.exports = router