import { BlobServiceClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";
export function ListDirectories() {
  // Enter your storage account name
  const account = "appcomponents";
  // const defaultAzureCredential = new DefaultAzureCredential();

  // // const blobServiceClient = new BlobServiceClient(
  // //   `https://${account}.blob.core.windows.net`,
  // //   defaultAzureCredential
  // // );
  // console.log(blobServiceClient);

  return "blob service client";
}
