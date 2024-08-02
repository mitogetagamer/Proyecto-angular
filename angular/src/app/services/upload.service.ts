import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor() {
    AWS.config.update({
      region: 'EE. UU. Este (Ohio) us-east-2', // Ejemplo: 'us-east-1'
      // Puedes agregar credenciales aquí si tienes configuraciones alternativas
    });
  }

  uploadFile(file: File, bucketName: string): Promise<any> {
    const s3 = new AWS.S3({
      params: { Bucket: bucketName },
    });
    const params = {
      Bucket: bucketName,
      Key: file.name,
      Body: file,
      ACL: 'public-read', // Solo si quieres que sea accesible públicamente
    };

    return s3.upload(params).promise();
  }
}
