import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req, res, next) => {
  // Lấy token từ header
  const token = req.header('Authorization');

  // Kiểm tra nếu không có token
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Xác thực token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Lưu thông tin người dùng đã xác thực vào request
    req.user = decoded;
    
    // Chuyển sang middleware hoặc controller tiếp theo
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authMiddleware;