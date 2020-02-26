using System;
using System.IO;
using System.Net;
using System.Threading.Tasks;

namespace TheTvDbApi.Authentication
{
    public class TheTvDbAuthentication : ITheTvDbAuthentication
    {
        private readonly string _apiKey = "fd4ae2a2eafcdfe2008e4ddefbaf9b5d";
        private readonly string _secretKey = "5E1C58891A9A21.47297948";
        private readonly string _userName = "meti651";
        private readonly string _loginUrl = "https://api.thetvdb.com/login";

        public async Task<string> GetToken()
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(_loginUrl);
            if(request != null)
            {
                request.Method = "POST";
                request.ContentType = "application/json";
                using(StreamWriter streamWriter = new StreamWriter(request.GetRequestStream()))
                {
                    string body = "{\"apikey\":\"" + _apiKey + "\"," +
                        "\"userkey\":\"" + _secretKey + "\"," +
                        "\"username\":\"" + _userName + "\"}";
                    streamWriter.Write(body);
                }
            }

            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            using(Stream stream = response.GetResponseStream())
            using(StreamReader reader = new StreamReader(stream))
            {
                return await reader.ReadToEndAsync();
            }

        }
    }
}
