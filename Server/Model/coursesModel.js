import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  oldprice: {
    type: Number,
    required: true
  },
  newprice: {
    type: Number,
    required: true
  },
  img: {
    type: String,
    required: true,
  },
  category :{
    type:String,
    required:true,
  },
  description:{
    type:String,
    require:true,
  },
  timestamp: {
    type: Date,
    default: Date.now // Giá trị mặc định là thời gian hiện tại
  }

});

const Course = mongoose.model('Course', courseSchema);

export default Course;