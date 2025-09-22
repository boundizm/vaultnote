import crypto from 'crypto';

// Same key as used for the main content encryption
const METADATA_KEY = process.env.METADATA_ENCRYPTION_KEY || 'metadata-encryption-key-for-vaultnote';

/**
 * Encrypt metadata fields (title, authorName, authorEmail)
 */
export async function encryptMetadata(text: string): Promise<string> {
  if (!text) return '';

  try {
    const algorithm = 'aes-256-gcm';
    const key = crypto.scryptSync(METADATA_KEY, 'salt', 32);
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipher(algorithm, key) as any;
    cipher.setAAD(Buffer.from('metadata')); // Additional authenticated data

    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    const authTag = cipher.getAuthTag();

    // Combine IV, encrypted text, and auth tag
    const result = iv.toString('base64') + ':' + encrypted + ':' + authTag.toString('base64');
    console.log('Encrypted metadata:', text, '->', result);
    return result;
  } catch (error) {
    console.error('Encryption error:', error);
    return '';
  }
}

/**
 * Decrypt metadata fields (title, authorName, authorEmail)
 */
export async function decryptMetadata(encryptedText: string): Promise<string> {
  if (!encryptedText) return '';

  try {
    console.log('Decrypting metadata:', encryptedText);
    const parts = encryptedText.split(':');
    if (parts.length !== 3) {
      console.error('Invalid encrypted metadata format, parts:', parts.length);
      throw new Error('Invalid encrypted metadata format');
    }

    const [ivBase64, encrypted, authTagBase64] = parts;

    const algorithm = 'aes-256-gcm';
    const key = crypto.scryptSync(METADATA_KEY, 'salt', 32);
    const iv = Buffer.from(ivBase64, 'base64');
    const authTag = Buffer.from(authTagBase64, 'base64');

    const decipher = crypto.createDecipher(algorithm, key) as any;
    decipher.setAuthTag(authTag);
    decipher.setAAD(Buffer.from('metadata'));

    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    console.log('Decrypted metadata:', encryptedText, '->', decrypted);
    return decrypted;
  } catch (error) {
    console.error('Error decrypting metadata:', error, 'for text:', encryptedText);
    return '[Decryption Failed]';
  }
}
