/**
 * Converts a Buffer data into a base 64 string.
 * 
 * @param {Buffer} buffer 
 * @returns Base 64 string.
 */
const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export { arrayBufferToBase64 }