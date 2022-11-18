import { createMocks, Query, RequestMethod } from 'node-mocks-http';
import type { NextApiRequest, NextApiResponse } from 'next';
import galleryHandler from "@/pages/api/gallery";
type MockReturn = { req: NextApiRequest; res: NextApiResponse }
const getMock = (method: RequestMethod, query?: Query): MockReturn => createMocks({ method, query })


describe("Gallery API", () => {
  it("Accepts POST", () => {
    const { req, res } = getMock("POST")
    galleryHandler(req, res)
    expect(res.statusCode).toBe(201)
  })
  it("Gets a specific image", () => {
    const { req, res } = getMock("GET", { name: "portrait.jpg" })
    galleryHandler(req, res)
    expect(res.statusCode).toBe(202)
  })
  it("Lists all images", () => {
    const { req, res } = getMock("GET")
    galleryHandler(req, res)
    expect(res.statusCode).toBe(200)
  })
  const invalidMethods: Array<RequestMethod> = ["PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"]
  it.each(invalidMethods)("Refuses invalid methods", (method) => {
    const { req, res } = getMock(method)
    galleryHandler(req, res)
    expect(res.statusCode).toBe(405)
    expect(res.statusMessage).toBe(`Method not allowed. Supported: ["GET", "POST"]`)
  })
})