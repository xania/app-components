using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Azure.Storage.Blobs;
using Microsoft.Extensions.Configuration;

namespace Xania.AppComponent.Create
{
    public static class CreateComponentTrigger
    {
        [FunctionName("CreateComponentTrigger")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ExecutionContext context,
            ILogger log)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(context.FunctionAppDirectory)
                .AddUserSecrets("a4181f96-78ae-4c4b-bf5a-9fda6606833f")
                .AddJsonFile("local.settings.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables()
                .Build();

            var connectionString = config["StorageConnectionString"];

            foreach (var file in req.Form.Files)
            {
                var fileName = file.FileName;
                using var fs = file.OpenReadStream();
                var blobClient = new BlobClient(connectionString, "xania", fileName);

                await blobClient.UploadAsync(fs);
            }

            return new OkResult();
        }
    }
}
