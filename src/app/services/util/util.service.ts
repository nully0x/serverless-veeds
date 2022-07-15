import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  private imageOrVideoFileTypes = [
   'video/mp4',
    'video/3gp',
    'video/mov',
    'video/mwv'
  ];

  validateFile(file: File): boolean {
    return this.imageOrVideoFileTypes.includes(file.type);
  }
}
