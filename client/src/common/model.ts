export interface Image {
  id: string;
  author: string;
  url: string;
  download_url: string;
}

export interface ItemToDelete {
  orderId: number;
  store: number;
}
