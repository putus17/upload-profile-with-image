// Controllers/ProfileController.ts
import { Request, Response } from 'express';
import Profile from '../models/profile';

// Extended request
interface ProfileRequest extends Request {
    file?: Express.Multer.File;
}

// Get all profiles
export const getAllProfiles = async (req: Request, res: Response) => {
    try {
        const profiles = await Profile.find().sort({ createdAt: -1 });
        res.status(200).json(profiles);
    } catch (error) {
        console.error('Error fetching profiles:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
}

// Get profile by ID
export const getProfileById = async (req: Request, res: Response) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
}

// Create a new profile
export const createProfile = async (req: ProfileRequest, res: Response) => {
    try {
        const { name, age, gender } = req.body;
        const file = req.file;
        
        if (!name || !age || !gender || !file) {
            return res.status(400).json({ error: 'All fields are required: name, age, gender, profileImage' });
        }
        const imageURL = `/uploads/${file.filename}`;
        const newProfile = new Profile({
            name,
            age: parseInt(age),
            gender,
            imageURL,
        });
        
        const savedProfile = await newProfile.save();
        res.status(201).json({ message: 'Profile saved to database', profile: savedProfile });
    } catch (error) {
        console.error('Error saving profile:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
}


