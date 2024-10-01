import arc from '@architect/functions'
import render from './render.mjs'

export let handler = arc.http(fn)

async function fn (req) {

  const meetingDate = (new Date(req.body.date)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  if (!meetingDate) return {
    code: 404,
    html: `Could not find: ${ meetingDate }`
  }

  let out = await render({
    title: meetingDate
  })

  return {
    statusCode: 200,
    headers: {
      'content-type': 'image/jpeg',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    isBase64Encoded: true,
    body: out.toString('base64')
  }
}
