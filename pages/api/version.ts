import type { NextApiRequest, NextApiResponse } from 'next'
import packageJson from '../../package.json'

const usedVersions: { [key: string]: string } = {}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // see: https://vercel.com/docs/serverless-functions/edge-caching
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=60')

  usedVersions[req.query.i as string] = req.query.v as string
  if (typeof req.query.u !== 'undefined') return res.status(200).json({ usedVersions })

  return res.status(200).json({ version: packageJson.version })
}
