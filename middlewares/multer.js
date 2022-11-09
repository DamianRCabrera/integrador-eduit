import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      const error = null;
      cb(error, './public/assets/products');
  },
  filename: function (req, file, cb) {
      console.log(file);
      const error = null;
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(error, `${uniqueSuffix}-${file.originalname.toLowerCase().replaceAll(' ', '-')}`);
  }
});

const fileFilter = (req, file, cb) => {
  const validMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
  const mimeTypeIsOk = validMimeTypes.includes(file.mimetype);
  cb(null, mimeTypeIsOk);
};

const upload = multer({ storage, fileFilter});

export default upload;