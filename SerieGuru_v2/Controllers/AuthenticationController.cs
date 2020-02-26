using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SerieGuru.Controllers;
using SerieGuru.TraktAuthentication;
using TraktApiSharp;

namespace SerieGuru_v2.Controllers
{
    [Route("api/authentication")]
    [ApiController]
    public class AuthenticationController : ControllerBase, IAuthenticationController
    {
        private ITraktAuthentication _traktAuthentication;
        private TraktClient _client; 

        public AuthenticationController(ITraktAuthentication traktAuthentication)
        {
            _traktAuthentication = traktAuthentication;
            _client = _traktAuthentication.Client;
        }

        public TraktClient Client { get { return _client; } }

        [HttpGet("createUrl")]
        public ActionResult CreateAuthUrl()
        {
            
            var url = _traktAuthentication.CreateAuthorizationUrl();
            var ps = new ProcessStartInfo(url)
            {
                UseShellExecute = true,
                Verb = "open"
            };
            Process.Start(ps);
            return Ok();
        }

        [HttpGet("PIN/{pin}")]
        public ActionResult AddAuthorization(string pin)
        {
            _client.Authorization = _traktAuthentication.TryToAuthenticate(pin).Result;
            return Redirect("~/");
        }

        [HttpGet("refresh/authentication")]
        public ActionResult RefreshAuthorization()
        {
            _client.Authorization = _traktAuthentication.TryToRefreshAuthentication().Result;
            return RedirectToAction("GetPopularSeries", "SerieController");
        }
    }
}