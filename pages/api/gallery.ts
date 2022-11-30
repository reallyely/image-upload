import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import formidable, { Fields, File, Files } from "formidable";

import { Image } from "../../modules/gallery/domain/Image.entity";
import fs from "fs";
import path from "path";
import process from "process";

const IMAGE_PATH_LOCAL = "/public/images";
const IMAGE_PATH_WEB = "/images";
const IMAGE_REPO = path.join(process.cwd(), IMAGE_PATH_LOCAL);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return uploadImage(req, res);
    case "GET":
      if (req.query.hasOwnProperty("name")) {
        return getImageByName(req, res);
      }
      return listImages(req, res);
    default:
      return methodNotAllowed(req, res);
  }
}

const uploadImage: NextApiHandler = (req, res) => {
  handleForm(req, res);
  return res.status(201).end();
};

const listImages: NextApiHandler = (req, res) => {
  const imagesFromRepo = fs.readdirSync(IMAGE_REPO);
  const imagesForApp = imagesFromRepo.map((image) =>
    Image.create({ name: image, content: image })
  );
  return res.status(200).send(imagesForApp);
};

const getImageByName: NextApiHandler = (req, res) => {
  return res.status(202).send("Not yet implemented");
};

const methodNotAllowed: NextApiHandler = (req, res) => {
  return res
    .writeHead(405, `Method not allowed. Supported: ["GET", "POST"]`)
    .send(`Method not allowed. Supported: ["GET", "POST"]`);
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const handleForm: NextApiHandler = (req, res) => {
  const form = new formidable.IncomingForm({
    multiples: true,
    uploadDir: IMAGE_REPO,
    filter: function ({ mimetype }) {
      return !!mimetype && !!mimetype.includes("image");
    },
  });
  return form.parse(req, parseForm);
};
type FormParser = (err: any, fields: Fields, files: Files) => void;

const parseForm: FormParser = (err, _fields, { file }) => {
  // if (err) return res.writeHead(500, "Problem parsing image").send("Problem parsing image")
  // @ts-ignore
  return Array.from(file).forEach(saveIt);
};

const saveIt = (file: File) => {
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(`${IMAGE_REPO}/${file.originalFilename}`, data);
  fs.unlinkSync(file.filepath);
};
