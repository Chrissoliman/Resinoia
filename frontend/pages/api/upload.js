import { IncomingForm } from 'formidable';
import cloudinary from 'cloudinary';
import { mongooseConnect } from "@/lib/mongoose";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: { bodyParser: false },
};

export default async function handle(req, res) {
  await mongooseConnect();

  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Failed to parse form data' });
      return;
    }

    try {
      const links = await Promise.all(
        Object.values(files).map(async file => {
          const result = await cloudinary.v2.uploader.upload(file.path, {
            folder: 'Resinoia',
            public_id: `file_${Date.now()}`,
            resource_type: 'auto',
          });
          return result.secure_url;
        })
      );

      res.status(200).json({ links });
    } catch (uploadError) {
      res.status(500).json({ error: 'Failed to upload files' });
    }
  });
}
