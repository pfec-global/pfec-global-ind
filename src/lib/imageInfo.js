import { cache } from "react";

// Does a picture have see-through parts? The country banners in Strapi come in two kinds: plain photos, and
// finished designs (their own frame, flag and slanted stripes) with see-through edges. A design must be drawn as
// uploaded - put inside the hero's white photo card, its see-through edges show the card as a white background.
// The answer is in the first bytes of the file, so only those are read:
//   PNG:  the colour type in its header (4 or 6 = with transparency), or a transparency chunk (tRNS) for a palette
//   WebP: the "has transparency" flag of its extended header (VP8X), or of a lossless picture (VP8L)
//   anything else (JPEG...): no transparency
// Returns false when the picture cannot be read, so the page then simply uses the photo card.
// cache(): asked once per page view, however many times a page needs the answer.
export const hasSeeThroughParts = cache(async function hasSeeThroughParts(url) {
  if (!url) return false;
  try {
    // A normal download, stopped once the start of the file has arrived. (Not a "Range" request: the CMS server
    // answers those with a broken response when the range is longer than a small file.)
    const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(5000) });
    if (!response.ok || !response.body) return false;
    const reader = response.body.getReader();
    const parts = [];
    let size = 0;
    while (size < 65536) {
      const { done, value } = await reader.read();
      if (done) break;
      parts.push(value);
      size += value.length;
    }
    reader.cancel().catch(() => {});
    const bytes = new Uint8Array(size);
    parts.reduce((offset, part) => (bytes.set(part, offset), offset + part.length), 0);
    const text = (start, length) => String.fromCharCode(...bytes.subarray(start, start + length));

    // PNG: 8-byte signature, then the IHDR chunk; the colour type is byte 25
    if (bytes[0] === 0x89 && text(1, 3) === "PNG") {
      if (bytes[25] === 4 || bytes[25] === 6) return true;
      // A palette picture is see-through when it has a tRNS chunk (it comes before the image data)
      for (let i = 8; i + 8 < bytes.length; ) {
        const length = (bytes[i] << 24) | (bytes[i + 1] << 16) | (bytes[i + 2] << 8) | bytes[i + 3];
        const type = text(i + 4, 4);
        if (type === "tRNS") return true;
        if (type === "IDAT" || type === "IEND") return false;
        i += 12 + length;
      }
      return false;
    }

    // WebP: "RIFF" .... "WEBP", then the first chunk
    if (text(0, 4) === "RIFF" && text(8, 4) === "WEBP") {
      const chunk = text(12, 4);
      if (chunk === "VP8X") return (bytes[20] & 0x10) !== 0; // the alpha flag
      if (chunk === "VP8L") return (bytes[24] & 0x10) !== 0; // the "alpha is used" bit of a lossless picture
      return false; // "VP8 " (lossy without transparency)
    }
    return false;
  } catch {
    return false;
  }
});
