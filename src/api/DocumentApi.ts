import Document from "../interfaces/Document";
import axios, { AxiosResponse } from "axios";
import Pagination from "../interfaces/Pagination";
class DocumentApi {
  private baseUrl: string;
  constructor() {
    this.baseUrl = "http://localhost:8000/api/documents";
  }
  public async get(pagination?: Pagination): Promise<any> {
    try {
      const url = `${this.baseUrl}${
        pagination ? `?start=${pagination.start}&end=${pagination.end}` : ""
      }`;
      const response = axios.get(url);
      return response;
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }
  public async create(document: Document): Promise<AxiosResponse<Document>> {
    try {
      const response = await axios.post(this.baseUrl, document);
      return response;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }
  public async update(document: Document): Promise<AxiosResponse<Document>> {
    try {
      const url = `${this.baseUrl}/${document.id}`;
      const response = await axios.put(url, document);
      return response;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }
  public async delete(id: string): Promise<AxiosResponse<any>> {
    try {
      const url = `${this.baseUrl}/${id}`;
      const response = await axios.delete(url);
      return response;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }
}
export default DocumentApi;
