const uploadImage = async (req, res, next) => {
    try {
        if(!req.file){
            return res.status(400).json({
                message: 'File tidak ada',
            });
        }

        res.status(200).json({
            message: 'File berhasil diupload',
            data : {src : `/uploads/${req.file.filename}`},
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {uploadImage};

