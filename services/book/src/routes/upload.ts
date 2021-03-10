import { Request, Response, Router } from 'express';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { BadRequestError } from '../common/errors/bad-request-error';

const s3 = new S3({
  accessKeyId: 'apple',
  secretAccessKey: 'banana',
  region: 'andromeda',
});

const router = Router();

router.post(
  '/api/books/upload',
  // admin Authorization check...
  async (req: Request, res: Response) => {
    const { imageSize, imageType } = req.body;

    if (imageSize > 20971520) {
      throw new BadRequestError('image size must less than 20 MB');
    }

    const key = `${uuidv4()}.jpeg`;

    const url = await s3.getSignedUrlPromise('putObject', {
      Bucket: 'bucket-name',
      ContentType: 'image/png',
      Key: key,
    });

    res.send({ key, url });
  }
);

export { router as uploadBookCoverRouter };
