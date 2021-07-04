import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { Transform } from 'stream'
const cache: Map<string, number> = new Map()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    axios({
      method: 'get',
      url: req.body.url,
      responseType: 'stream',
    }).then(function (response) {
      response.data.pipe(inoutStream)
    })
    const inoutStream = new Transform({
      transform(chunk: Buffer, encoding, callback) {
        this.push(chunk)
        callback()
      },
    })
      .on('data', (chunk: Buffer) => {
        const word = chunk.toString().split(/(\b[\w]{2,}|a\b)/)
        if (!word) {
          return
        }

        word.forEach((w) => {
          if (/\b[a-zA-Z]{2,}|a\b/.test(w)) {
            if (!cache.has(w)) {
              cache.set(w, 1)
            } else {
              let wd = cache.get(w)
              if (wd) {
                wd++
                cache.delete(w)
                cache.set(w, wd)
              }
            }
          }
        })
      })
      .on('finish', () => {
        const arr: any = []
        cache.forEach((value, key) => {
          arr.push([key, value])
        })
        res.status(200).end(JSON.stringify(arr))
        cache.clear()
      })
  } catch (err) {
    res.status(500)
  }
}
