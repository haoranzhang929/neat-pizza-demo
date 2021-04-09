export enum Routes {
  Home = "/",
  ViewUploads = "/view-uploads",
  Store = "store",
  OrderID = "orderId",
  NoMatch = "*"
}

export enum Severity {
  Error = "error",
  Success = "success"
}

export enum Message {
  Success = "Your image upload has been successful, thank you",
  UploadError = "Your image upload process has not been successful, please retry",
  NoImage = "Please select a photo",
  StoreNotValid = "Store is not valid",
  OrderIdNotValid = "Order ID is not valid",
  OrderIdExpired = "Apologies, unfortunately you had exceeded the preset time limit of 3 minutes within order completion for image uploading. Customised image printing will not be available for your current order, please try again on your next available order. Thank you"
}

export enum ButtonText {
  Error = "Error",
  Success = "Success",
  Upload = "Upload",
  Retry = "Retry",
  Rerfresh = "Refresh"
}
