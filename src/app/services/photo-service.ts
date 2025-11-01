import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  photoprofile: string | null =  'assets/imgs/profile.jpeg';

  constructor() { }

  async addPhotoToProfile () {
    try{
      const image = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        quality: 100
      });
      // if (image.dataUrl) {
      //   this.photoprofile = image.dataUrl || null;
      // }
      this.photoprofile = image.dataUrl || null;
      return this.photoprofile;
    } catch (error) {
      console.error('Error tomando la foteli', error);
      return null;
    }

  }
  
}
