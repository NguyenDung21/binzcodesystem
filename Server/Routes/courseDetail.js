import express from 'express';
import Course from '../Model/coursesModel.js';
import mongoose from 'mongoose';

const router = express.Router();

// Get course by ID
router.get("/courses/:id", async (req, res) => {
  try {
    const courseId = req.params.id;

    // Kiểm tra xem id có đúng định dạng ObjectId không
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'Invalid course ID' });
    }

    const course = await Course.findById(courseId);

    // Kiểm tra xem course có tồn tại không
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;