import express from 'express';
import Course from '../Model/coursesModel.js';
import dataCourses from '../data/Courses.js';

const router = express.Router();

router.post('/courses', async (req, res) => {
    try {
        // Lấy dữ liệu khóa học từ file Courses.js
        const courses = dataCourses;

        // Xóa tất cả các mục từ cơ sở dữ liệu
        await Course.deleteMany({});

        // Thêm từng khóa học vào cơ sở dữ liệu
        const createdCourses = await Course.insertMany(courses);

        // Trả về thông tin của các khóa học đã được thêm
        res.status(201).json(createdCourses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/courses', async (req, res) => {
    try {
        // Lấy dữ liệu mới từ cơ sở dữ liệu
        const courses = await Course.find();

        res.json(courses); // Trả về danh sách khóa học
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;