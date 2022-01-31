using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Azure.Storage.Blobs;
using System.Linq;

namespace Xania.AppWorkspace
{
    public static class ListBlobs
    {
        [FunctionName("list-blobs")]
        public static async Task<object> Run(
            [HttpTrigger(AuthorizationLevel.Function, "GET", Route = "blob/{*path}")] HttpRequest req,
            string path,
            ExecutionContext context)
        {
            var config = FunctionAppConfiguration.Get(context);
            var connectionString = config["StorageConnectionString"];
            var containerService = new BlobContainerClient(connectionString, "xania");

            return containerService.GetBlobsByHierarchy(prefix: path).Where(e => e.IsBlob).Select(e => e.Blob.Name);
        }
    }
}
