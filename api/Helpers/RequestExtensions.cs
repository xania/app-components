using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Xania.AppWorkspace.Helpers
{
    public static class RequestExtensions
    {
        public static async Task<T> FromBody<T>(this HttpRequest req)
        {
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            return System.Text.Json.JsonSerializer.Deserialize<T>(requestBody, options);
        }
    }
}
