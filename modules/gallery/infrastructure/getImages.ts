import { Image } from "../../../modules/gallery/domain/Image.entity";
import fs from "fs";
import path from "path";

const IMAGE_PATH_LOCAL = "/public/images";
const IMAGE_REPO = path.join(process.cwd(), IMAGE_PATH_LOCAL);
export function getImages() {
  const imagesFromRepo = fs.readdirSync(IMAGE_REPO);
  const imagesForApp = imagesFromRepo.map((image) =>
    Image.create({ name: image, content: image })
  );
  return imagesForApp;
}
