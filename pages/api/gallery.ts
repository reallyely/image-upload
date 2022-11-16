import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return uploadImage(req, res)
    case "GET":
      if (req.query) {
        return getImageByName(req, res)
      }
      return listImages(req, res)
    default:
      res.status(405).send(`Method not allowed. Supported: ["GET", "POST"]`)
  }
}

const uploadImage: NextApiHandler = (req, res) => {
  return res.status(201).end()
}

const listImages: NextApiHandler = (req, res) => {
  return res.status(200).json({ name: 'John Doe' })
}

const getImageByName: NextApiHandler = (req, res) => {
  return res.status(202).send("lol")
}

