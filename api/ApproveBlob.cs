using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Azure.Storage.Blobs.Specialized;

namespace Xania.AppWorkspace
{
    public static class ApproveBlob
    {
        [FunctionName("ApproveBlob")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "PUT", Route = "blob/{blobName}/{targetName}")] HttpRequest req,
            string blobName,
            string targetName,
            ExecutionContext context,
            ILogger log)
        {
            var config = FunctionAppConfiguration.Get(context);
            var connectionString = config["StorageConnectionString"];
            var containerService = new BlobContainerClient(connectionString, "xania");
            var sourceBlob = containerService.GetBlobClient(blobName);
            if (await sourceBlob.ExistsAsync())
            {
                var destBlob = containerService.GetBlobClient(targetName + "/" + blobName);
                var copy = await destBlob.StartCopyFromUriAsync(sourceBlob.Uri);
                await copy.WaitForCompletionAsync();
                await sourceBlob.DeleteAsync();
            }

            return new OkResult();
        }
    }
}
