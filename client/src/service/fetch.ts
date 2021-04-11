import axios from "axios";
import { Image, Store } from "../common/model";

export const fetchImages = async (store: number) =>
  await axios.get<Image[]>(`/api/images?store=${store}`);

export const fetchStoreList = async () => await axios.get<Store[]>("/api/stores");

export const upload = async (store: string, orderId: string, data: FormData) =>
  await axios.post(`/api/image?store=${store}&orderId=${orderId}`, data, {
    headers: { "Content-type": "multipart/form-data" }
  });
