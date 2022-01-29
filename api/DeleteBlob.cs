using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Azure.Storage.Blobs;

namespace Xania.AppWorkspace
{
    public static class DeleteBlob
    {
        [FunctionName("DeleteBlob")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "DELETE", Route = "blob/{blobName}")] HttpRequest req,
            string blobName,
            ExecutionContext context,
            ILogger log)
        {
            var config = FunctionAppConfiguration.Get(context);
            var connectionString = config["StorageConnectionString"];
            var blobService = new BlobContainerClient(connectionString, "xania");
            await blobService.DeleteBlobIfExistsAsync(blobName);

            return new OkResult();
        }
    }
}
