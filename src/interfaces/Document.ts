export enum DocumentType {
  PDF = "PDF",
  TXT = "TXT",
  XDOC = "XDOC",
}
interface Document {
  id: string;
  name: string;
  type?: DocumentType;
  description?: string;
}
export default Document;
