// app/api/students/route.js
import { NextResponse } from 'next/server'
import dbConnect from '../../../lib/mongodb'
import Student from '../../../models/Student'

export async function GET(request) {
  try {
    await dbConnect()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
      const student = await Student.findById(id)
      if (!student) {
        return NextResponse.json({ success: false, error: 'Student not found' }, { status: 404 })
      }
      return NextResponse.json({ success: true, data: student })
    }

    const students = await Student.find({}).sort({ createdAt: -1 })
    return NextResponse.json({ success: true, data: students })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}


export async function POST(request) {
  try {
    await dbConnect()
    console.log("connected successfully")
    const body = await request.json()
    const student = await Student.create(body)
    return NextResponse.json(
      { success: true, data: student },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}

export async function PUT(request) {
  try {
    await dbConnect()
    const body = await request.json()
    const { id, ...updateData } = body
    const student = await Student.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
    if (!student) {
      return NextResponse.json({ success: false, error: 'Student not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: student })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}

export async function DELETE(request) {
  try {
    await dbConnect()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 })
    }

    const student = await Student.findByIdAndDelete(id)
    if (!student) {
      return NextResponse.json({ success: false, error: 'Student not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: {} })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}