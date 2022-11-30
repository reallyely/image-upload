import { Image } from "../../../modules/gallery/domain/Image.entity"
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto"

const IMAGE_PATH_LOCAL = "/public/images"
const IMAGE_REPO = path.join(process.cwd(), IMAGE_PATH_LOCAL)
export function getImages() {
  const imagesFromRepo = fs.readdirSync(IMAGE_REPO);
  const imagesForApp = imagesFromRepo.map(image => Image.create({ id: randomUUID(), name: image, content: image }))
  return imagesForApp
}