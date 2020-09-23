export interface BackendMessage {
  targetAppVesion?: number;
  error?: {
    errorKey: string,
    additionalInfo: any,
    detailedInfo?: any;
  };
  puzzle?: string;
}

export interface Results<T> extends BackendMessage {
  result: T;
  count?: number | {[id: string]: number};
}
