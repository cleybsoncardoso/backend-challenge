import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const MulterConfig: MulterOptions = {
  storage: diskStorage({
    destination: './public',
    filename: (req, file, callback) => {
      const fileName = Date.now().toString(16) + '-' + (Math.random() * 10000000).toString(16);
      const extension = extname(file.originalname);
      const filename = `${fileName}${extension}`;
      callback(null, filename);
    },
  }),
};
