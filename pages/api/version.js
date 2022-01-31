/* eslint-disable */

import packageJson from '../../package.json'

export default async (req, res) => {
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=60') // see: https://vercel.com/docs/serverless-functions/edge-caching

  return res.status(200).json({ version: packageJson.version })
}
