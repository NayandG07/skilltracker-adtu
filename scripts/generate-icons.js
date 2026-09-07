import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPng(width, height, r, g, b, innerR, innerG, innerB) {
  const rowSize = width * 4 + 1; // +1 for filter type
  const rawData = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter: None

    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;
      
      // Calculate distance from center for circular/geometric motif
      const cx = width / 2;
      const cy = height / 2;
      const dx = (x - cx) / (width * 0.4);
      const dy = (y - cy) / (height * 0.4);
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Diamond test
      const diamondDist = Math.abs(dx) + Math.abs(dy);

      if (diamondDist < 0.65 && diamondDist > 0.15) {
        // Inner terracotta diamond
        rawData[pixelOffset] = innerR;     // R
        rawData[pixelOffset + 1] = innerG; // G
        rawData[pixelOffset + 2] = innerB; // B
        rawData[pixelOffset + 3] = 255;    // A
      } else if (dist < 0.95) {
        // Background rounded surface
        rawData[pixelOffset] = r;
        rawData[pixelOffset + 1] = g;
        rawData[pixelOffset + 2] = b;
        rawData[pixelOffset + 3] = 255;
      } else {
        // Transparent outer or rounded corner
        rawData[pixelOffset] = r;
        rawData[pixelOffset + 1] = g;
        rawData[pixelOffset + 2] = b;
        rawData[pixelOffset + 3] = dist < 1.05 ? 180 : 0;
      }
    }
  }

  const compressedData = zlib.deflateSync(rawData);

  // PNG Header
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR Chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // Bit depth: 8
  ihdrData[9] = 6; // Color type: RGBA (6)
  ihdrData[10] = 0; // Compression
  ihdrData[11] = 0; // Filter
  ihdrData[12] = 0; // Interlace

  const ihdrChunk = createChunk('IHDR', ihdrData);
  const idatChunk = createChunk('IDAT', compressedData);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const length = data.length;
  const chunk = Buffer.alloc(4 + 4 + length + 4);
  chunk.writeUInt32BE(length, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);

  const crc = calculateCrc(Buffer.concat([Buffer.from(type, 'ascii'), data]));
  chunk.writeUInt32BE(crc, 8 + length);
  return chunk;
}

// Standard CRC32 table
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) {
      c = 0xedb88320 ^ (c >>> 1);
    } else {
      c = c >>> 1;
    }
  }
  crcTable[n] = c;
}

function calculateCrc(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

const outDir = path.resolve('public/icons');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Anthropic Off-White (250, 249, 245) and terracotta (217, 119, 87)
const icon192 = createPng(192, 192, 250, 249, 245, 217, 119, 87);
fs.writeFileSync(path.join(outDir, 'icon-192.png'), icon192);

const icon512 = createPng(512, 512, 250, 249, 245, 217, 119, 87);
fs.writeFileSync(path.join(outDir, 'icon-512.png'), icon512);

const iconMaskable = createPng(512, 512, 250, 249, 245, 217, 119, 87);
fs.writeFileSync(path.join(outDir, 'icon-maskable-512.png'), iconMaskable);

console.log('Successfully generated icon-192.png, icon-512.png, and icon-maskable-512.png');
