import express from 'express';
import * as blogPostController from '../controllers/blogposts.js';
import cloudinaryUploader from '../middleware/cloudinary.js';
import { authentication } from '../middleware/authentication.js';

const router = express.Router();

router.get("/", blogPostController.findAll);
router.get("/:id", blogPostController.findById);


router.post("/", authentication, cloudinaryUploader.single("cover"), blogPostController.create);

router.put("/:id", authentication, cloudinaryUploader.single("cover"), blogPostController.update);
router.delete("/:id", authentication, blogPostController.cancell);
router.patch("/:id/cover", authentication, cloudinaryUploader.single("cover"), blogPostController.uploadBlogPostCover);

export default router;