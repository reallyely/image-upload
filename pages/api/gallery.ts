import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import formidable, { Fields, Files } from "formidable";
import fs from "fs";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return uploadImage(req, res)
    case "GET":
      if (req.query.hasOwnProperty("name")) {
        return getImageByName(req, res)
      }
      return listImages(req, res)
    default:
      return methodNotAllowed(req, res)
  }
}

const uploadImage: NextApiHandler = (req, res) => {
  handleForm(req, res)
  return res.status(201).end()
}

const listImages: NextApiHandler = (req, res) => {
  return res.status(200).json({ name: 'John Doe' })
}

const getImageByName: NextApiHandler = (req, res) => {
  return res.status(202).send("lol")
}

const methodNotAllowed: NextApiHandler = (req, res) => {
  return res
    .writeHead(405, `Method not allowed. Supported: ["GET", "POST"]`)
    .send(`Method not allowed. Supported: ["GET", "POST"]`)
}

export const config = {
  api: {
    bodyParser: false
  }
};

const handleForm: NextApiHandler = (req, res) => {
  const form = new formidable.IncomingForm();
  return form.parse(req, parseForm.bind(null, res))
};
type FormParser = (res: NextApiResponse, err: any, fields: Fields, files: Files) => void

const parseForm: FormParser = (res, err, _fields, files) => {
  if (err) return res.writeHead(500, "Problem parsing image").send("Problem parsing image")
  return saveFile(files);
}
const saveFile = (files: Files) => {
  if (Array.isArray(files)) {
    return files.forEach((file: File) => {
      const data = fs.readFileSync(file.path);
      fs.writeFileSync(`./public/images/${file.name}`, data);
      fs.unlinkSync(file.path);
    })
  }

};