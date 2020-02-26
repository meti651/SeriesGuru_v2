using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TraktApiSharp;

namespace SerieGuru.Controllers
{
    public interface IAuthenticationController
    {
        public TraktClient Client { get; }
    }
}
