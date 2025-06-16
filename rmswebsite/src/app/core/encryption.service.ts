import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  appProperties = {
    VALUES: {
      KEY: '(y6er1@n$1234567',
      IV: '0001000100010001',
    },
  };

  private key = CryptoJS.enc.Utf8.parse('(y6er1@n$1234567');
  private iv = CryptoJS.enc.Utf8.parse('0001000100010001');
  constructor() {}
  encryptionAES(msg: any) {
    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(msg),
      this.key,
      {
        keySize: 256 / 8,
        iv: this.iv,
      }
    );

    return ciphertext.toString();
  }

  decryptionAES(msg: any) {
    // Decrypt
    const bytes = CryptoJS.AES.decrypt(msg, this.key, {
      keySize: 256 / 8,
      iv: this.iv,
    });
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
  }
}
