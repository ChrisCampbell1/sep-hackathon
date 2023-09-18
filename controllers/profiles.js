import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'

async function index(req, res) {
  try {
    const profiles = await Profile.find({})
    .populate('pendingRelatives')
    .populate('relatives')
    res.json(profiles)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function show(req, res) {
  try {
    const profile = await Profile.findById(req.params.id)
    .populate('pendingRelatives')
    .populate('relatives')
    res.json(profile)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function addPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    const profile = await Profile.findById(req.params.id)

    const image = await cloudinary.uploader.upload(
      imageFile, 
      { tags: `${req.user.email}` }
    )
    profile.photo = image.url
    
    await profile.save()
    res.status(201).json(profile.photo)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function request(req, res) {
try {
  const requestor = await Profile.findById(req.user.profile)
  const requested = await Profile.findById(req.params.id)
  requested.pendingRelatives.push(requestor._id)
  await requested.save()
  res.status(200).json(requested)
} catch (err) {
  console.log(err)
  res.status(500).json(err)
}
}

async function approve(req, res) {
try {
  const approver = await Profile.findById(req.user.profile)
  const approved = await Profile.findById(req.params.id)
  //remove approved from approver pending array
  // const updatedPending = approver.pendingRelatives.filter((el) => el._id !== approved._id)
  // console.log(approver)
  // approver.pendingRelatives = updatedPending
  approver.pendingRelatives.pull(approved._id)
  approver.relatives.push(approved._id)
  await approver.save()
  approved.relatives.push(approver._id)
  await approved.save()
  res.status(200).json(approver)
} catch (err) {
  console.log(err)
  res.status(500).json(err)
}
}

export { index, addPhoto, show, request, approve }
