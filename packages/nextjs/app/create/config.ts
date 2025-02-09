import axios from 'axios';
import fs from 'fs';
import dotenv from 'dotenv';

export function createIPFSForm({
  jsonData,
  fileName,

}: {
  jsonData: object;
  fileName: string;
}): FormData {
  const formData = new FormData();
  const jsonString = JSON.stringify(jsonData);
  const blob = new Blob([jsonString], { type: 'application/json' });

  formData.append('Body', blob, "../../public/ethqub.png");
  formData.append('Key', fileName);
  formData.append('ContentType', 'application/json',);

  return formData;
}

export const QUICKNODE_IPFS_UPLOAD_URL =
  'https://api.quicknode.com/ipfs/rest/v1/s3/put-object';

  export async function uploadToIPFS({
    jsonData,
    fileName,
  }: {
    jsonData: object;
    fileName: string;
  }): Promise<any> {
    const formData = createIPFSForm({ jsonData, fileName });
    console.log('formData', formData);
    console.log('jsonData', jsonData);
    console.log('fileName', fileName);
    try {
      const response = await axios.post(QUICKNODE_IPFS_UPLOAD_URL, formData, {
        headers: {
          'x-api-key': `QN_03c4b5a208c14881b97cca7d125c1e2f`,
      },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      throw new Error();
    }
  }


