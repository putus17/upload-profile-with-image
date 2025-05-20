// routes/profile.ts
import { Router } from 'express'
import {
    getAllProfiles,
    getProfileById,
    createProfile,
} from '../controllers/profile.controller'
import { upload } from '../middleware/upload'

const router = Router()

router.get('/', getAllProfiles)
router.get('/:id', getProfileById)
router.post('/', upload.single('profileImage'), createProfile)

export default router