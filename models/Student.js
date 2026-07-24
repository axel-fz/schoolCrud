// models/Student.js
import mongoose from 'mongoose'

const StudentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide a first name'],
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Please provide a last name'],
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  gender: {
    type: String,
    required: [true, 'Please select gender'],
    enum: ['Male', 'Female', 'Other']
  },
  age: {
    type: Number,
    required: [true, 'Please provide age'],
    min: [15, 'Age must be at least 15'],
    max: [100, 'Age cannot exceed 100']
  },
  grade: {
    type: String,
    required: [true, 'Please provide grade'],
    enum: ['A', 'B', 'C', 'D', 'F']
  },
  course: {
    type: String,
    required: [true, 'Please provide course name'],
    maxlength: [100, 'Course name cannot be more than 100 characters']
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  phone: {
    type: String,
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

export default mongoose.models.Student || mongoose.model('Student', StudentSchema)