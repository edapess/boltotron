export interface IBoltotronMessage {
  source: string;
  actionType?: string;
  payload: any;
  timestamp?: number;
}
