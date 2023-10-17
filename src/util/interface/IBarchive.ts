// export interface Ibarchive {
//   id: string;
//   attachments: string;
//   lat: string;
//   long: string;
//   expireTimeInMinutes: string;
// }

export interface Ibarchive {
  attachments: [string];
  lat: string;
  long: string;
  expireTimeInMinutes: string;
  description: string;
}

interface file {
  fileName: string;
  fileType: string;
  fileSize: number;
  url: string;
  id: string;
}

export interface IbarchiveFileData {
  file: [file];
  userId: string;
  categoryId?: string;
  fileName: string;
  let: string;
  long: string;
  transactionId: string;
  uniqueId: string;
  expireTime: number;
  expireTimeStamp: string;
  id: string;
}

export interface IbarchiveAddFile {
  status: number;
  message: string;
  data: [IbarchiveFileData];
}

export interface IbarchiveGetFile {
  status: number;
  message: string;
  data: [
    {
      file: string;
      fileName: string;
      fileSize?: string;
      mimeType: string;
    }
  ];
}

export interface IbarchiveDeleteFile {
  status: number;
  message: string;
}

export interface IbarchiveUpdateFile {
  status: number;
  message: string;
}

export interface UpdateFileExpireTime {
  id: string;
  expireTimeInMinutes: string | number;
}
