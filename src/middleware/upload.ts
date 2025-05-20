import { Timestamp } from './../../node_modules/bson/src/timestamp';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

//Ensure the uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer storage setup
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
        const Timestamp = Date.now()
        const originalName = file.originalname.replace(/\s+/g, '-');
        const sanitzedOriginal = originalName.replace(/[^a-zA-Z0-9-_\.]/g, '');
        cb(null, `${Timestamp}-${sanitzedOriginal}`);

    }
});

//File fliter to allow image flies only
const fileFilter = (_req: Express.Request, file: Express.Multer.File, 
    cb: multer.FileFilterCallback) => {
    const allowedMimetype = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    if (allowedMimetype.includes(file.mimetype)) {
        cb(null, true);
    }
    
    else {
        cb(new Error('Only image flies are allowed.'));
    }
}

// Limit the file size to 5MB
const limits = {
    fileSize: 5 * 1024 * 1024, // 5MB
};

// Final upload middleware
export const upload = multer({
    storage,
    fileFilter,
    limits,
})