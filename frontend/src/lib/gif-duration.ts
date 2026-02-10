/**
 * Calcule la durée totale d'un GIF en millisecondes en parsant les délais
 * des Graphic Control Extensions (GCE) et le nombre de boucles Netscape.
 */
export async function getGifDurationMs(gifUrl: string): Promise<number> {
  const res = await fetch(gifUrl);
  if (!res.ok) throw new Error(`Failed to fetch GIF: ${res.status}`);
  const buffer = await res.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const view = new DataView(buffer);

  let totalDelayCentisec = 0;
  let loopCount = 1; // 0 = infini, on considère une seule boucle pour le loader

  let i = 0;
  while (i < bytes.length - 6) {
    // Graphic Control Extension : 0x21 0xF9 0x04 [4 bytes]
    if (bytes[i] === 0x21 && bytes[i + 1] === 0xF9 && bytes[i + 2] === 0x04) {
      const delayLo = bytes[i + 4];
      const delayHi = bytes[i + 5];
      const delayCentisec = delayLo + (delayHi << 8);
      // Si pas de délai indiqué, les lecteurs utilisent souvent 10 centièmes (100 ms)
      totalDelayCentisec += delayCentisec > 0 ? delayCentisec : 10;
      i += 3 + 1 + 4 + 1; // extension + block size + 4 bytes + block terminator 0
      continue;
    }
    // Netscape Application Extension : 0x21 0xFF 0x0B "NETSCAPE2.0" 0x03 0x01 [loop_lo] [loop_hi]
    if (bytes[i] === 0x21 && bytes[i + 1] === 0xFF && bytes[i + 2] === 0x0B) {
      const subBlockLen = bytes[i + 3];
      if (subBlockLen >= 3 && i + 3 + 1 + subBlockLen <= bytes.length) {
        const loopLo = bytes[i + 6];
        const loopHi = bytes[i + 7];
        loopCount = loopLo + (loopHi << 8);
        // 0 = boucle infinie → on utilise une seule lecture pour le loader
        if (loopCount === 0) loopCount = 1;
      }
      i += 3 + 1 + bytes[i + 3] + 1;
      continue;
    }
    i += 1;
  }

  const durationOneCycleMs = totalDelayCentisec * 10;
  const total = durationOneCycleMs * loopCount;
  // Fallback si le GIF n'a pas de GCE (durée 0) ou durée invalide
  return total > 0 ? total : 2500;
}
