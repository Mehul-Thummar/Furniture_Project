const cloudinary = require('cloudinary').v2
const fs = require('fs')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDE_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

exports.uploadCloudinary = async (localPath) => {
    try {
        if (!localPath) return null
        const response = await cloudinary.uploader.upload(localPath, { resource_type: "auto" })

        fs.unlinkSync(localPath);
        return response;

    } catch (err) {
        console.log(err);
        fs.unlinkSync(localPath);
        return null;
    }
}