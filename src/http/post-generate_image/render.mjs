import { Jimp, loadFont } from 'jimp'
import { SANS_64_BLACK } from "jimp/fonts";
import path from 'node:path'
import url from 'node:url'

export default async function render ({ title }) {
  const dir = path.dirname(url.fileURLToPath(import.meta.url));
  console.log(dir)
  // image 1325 px wide
  const base = path.join(dir, 'base.jpg')
  const img = await Jimp.read(base)
  const font = await loadFont(SANS_64_BLACK);

  // get back to using these fonts
  const sansbold = await loadFont(path.join(dir, `HKGrotesk-72.fnt`))
  const sans = await loadFont(path.join(dir, `HKGrotesk-Regular-32.fnt`))
  const sansmol = await loadFont(path.join(dir, `HKGrotesk-Regular-16.fnt`))

  // write the title, center text
  img.print({ font: font, x: ((1325/2) - (title.length/2 *32)), y: 300, text: title })


  return img.getBuffer("image/jpeg", {
    quality: 50,
  })
}
