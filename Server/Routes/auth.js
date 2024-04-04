import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import usersData from '../data/users.js';
import User from '../Model/userModel.js'

dotenv.config();

router.post('/user', async (req, res) => {
    try {
        // Xóa tất cả người dùng hiện có
        await User.deleteMany({});

        // Thêm mới người dùng từ danh sách được cung cấp từ file users.js
        const importUser = await User.insertMany(usersData);

        // Trả về thông tin người dùng đã được lưu
        res.send({ importUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.post('/register', (req, res)=>{
    // To post / insert data into database

    const {email, password} = req.body;
    User.findOne({email: email})
    .then(user => {
        if(user){
            res.json("Already registered")
        }
        else{
            User.create(req.body)
            .then(log_reg_form => res.json(log_reg_form))
            .catch(err => res.json(err))
        }
    })
    
})


// Định nghĩa route POST để xử lý yêu cầu đăng nhập
router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    User.findOne({email: email})
    .then(user => {
        if(user){
            // If user found then these 2 cases
            if(user.password === password) {
                res.json("Success");
            }
            else{
                res.json("Wrong password");
            }
        }
        // If user not found then 
        else{
            res.json("No records found! ");
        }
});
});

export default router;
