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
using Xania.AppWorkspace.Helpers;
using System.Collections.Generic;

namespace Xania.AppWorkspace
{
    public static class MoveBlob
    {
        [FunctionName("UpdateBlob")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "PUT",
            Route = "blob/{*blobName}")] HttpRequest req,
            string blobName, ExecutionContext context, ILogger log)
        {
            var config = FunctionAppConfiguration.Get(context);
            var connectionString = config["StorageConnectionString"];
            var containerService = new BlobContainerClient(connectionString, "xania");
            var sourceBlob = containerService.GetBlobClient(blobName);
            if (await sourceBlob.ExistsAsync())
            {
                var updateModel = await req.FromBody<UpdateModel>();
                if (updateModel?.Tags != null)
                {
                    sourceBlob.SetTags(updateModel.Tags);
                }
                if (!string.IsNullOrEmpty(updateModel.TargetDir))
                {
                    var destBlob = containerService.GetBlobClient(Path.Combine(updateModel.TargetDir, GetName(blobName)));
                    var copy = await destBlob.StartCopyFromUriAsync(sourceBlob.Uri);
                    await copy.WaitForCompletionAsync();
                    await sourceBlob.DeleteAsync();
                }
            }

            return new OkResult();
        }


        static string GetName(string blobName)
        {
            var idx = blobName.LastIndexOf("/");
            if (idx > 0)
            {
                return blobName.Substring(idx + 1);
            }else
            {
                return blobName;
            }
        }
    }

    class UpdateModel
    {
        public Dictionary<string, string> Tags { get; set; }
        public string TargetDir { get; set; }
    }
}
