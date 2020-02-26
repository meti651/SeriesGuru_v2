using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace TheTvDbApi.Authentication
{
    public interface ITheTvDbAuthentication
    {
        public Task<string> GetToken();
    }
}
