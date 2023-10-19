export interface Ibarchive {
  attachments?: string | [string];
  lat?: string;
  long: string;
  expireTimeInMinutes?: string;
  description: string;
}

interface file {
  fileName: string;
  fileType: string;
  fileSize: number;
  url: string;
  id: string;
}

export interface IbarchiveAddFile {
  file: file | [file];
  userId: string;
  categoryId?: string;
  fileName: string;
  lat: string;
  long: string;
  transactionId: string;
  uniqueId: string;
  expireTime: number;
  expireTimeStamp: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  id: string;
}

export interface IbarchiveAddFileData {
  status: number;
  message: string;
  data: [IbarchiveAddFile];
}

export interface IbarchiveGetFileData {
  status: number;
  message: string;
  data: [IbarchiveGetFile];
}
export interface IbarchiveGetFile {
  file: string;
  fileName: string;
  fileSize?: string;
  mimeType: string;
}

export interface UpdateFileExpireTime {
  id: string;
  expireTimeInMinutes: string | number;
}
