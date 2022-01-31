using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Xania.AppWorkspace
{
    public static class ListChildRoutes
    {
        [FunctionName("list-childroutes")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "childroutes/{basePath}")] HttpRequest req,
            string basePath,
            ExecutionContext context,
            ILogger log)
        {
            var config = FunctionAppConfiguration.Get(context);
            var connectionString = config["StorageConnectionString"];

            var containerClient = new Azure.Storage.Blobs.BlobContainerClient(connectionString, "xania");
            foreach(var item in containerClient.GetBlobsByHierarchy(delimiter: "/", prefix: "test/"))
            {
            }

            return new OkResult();
        }
    }
}
