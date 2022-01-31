using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Azure.Storage.Blobs;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace Xania.AppWorkspace
{
    public static class CreateComponentTrigger
    {
        [FunctionName("CreateComponentTrigger")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ExecutionContext context,
            ILogger log)
        {
            var config = FunctionAppConfiguration.Get(context);
            var connectionString = config["StorageConnectionString"];

            foreach (var file in req.Form.Files)
            {
                var blobName = Path.Combine("uploads", file.FileName);
                using var fs = file.OpenReadStream();
                var blobClient = new BlobClient(connectionString, "xania", blobName);

                await blobClient.UploadAsync(fs);
            }

            return new OkResult();
        }
    }
}
