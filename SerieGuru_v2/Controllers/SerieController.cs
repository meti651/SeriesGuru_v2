using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SerieGuru.Controllers;
using SerieGuru.TraktAuthentication;
using TheTvDbApi.Authentication;
using TraktApiSharp;
using TraktApiSharp.Enums;
using TraktApiSharp.Objects.Basic;
using TraktApiSharp.Objects.Get.Shows;
using TraktApiSharp.Objects.Get.Shows.Episodes;
using TraktApiSharp.Requests.Params;

namespace SerieGuru_v2.Controllers
{
    [Route("api/serie")]
    //[ApiController]
    public class SerieController : ControllerBase
    {
        private TraktClient _client;
        private IAuthenticationController _authenticationController;
        private ITheTvDbAuthentication _theTvDbAuthentication;

        public SerieController(IAuthenticationController authentication, ITheTvDbAuthentication theTvDbAuthentication)
        {
            _theTvDbAuthentication = theTvDbAuthentication;
            _authenticationController = authentication;
            _client = _authenticationController.Client;
        }

        [HttpGet("popularSeries")]
        public async Task<ActionResult<TraktPaginationListResult<TraktShow>>> GetPopularSeries()
        {
            var fullInfo = new TraktExtendedInfo().SetFull().SetImages();
            var series = await _client.Shows.GetPopularShowsAsync(fullInfo, null, 1, 12);

            return series;
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<TraktShow>> GetSerieById(string id)
        {
            var extendedInfo = new TraktExtendedInfo().SetFull().SetImages();

            var serie = await _client.Shows.GetShowAsync(id, extendedInfo);

            return serie;
        }

        [HttpGet("search/{stringInput}")]
        public async Task<ActionResult<TraktPaginationListResult<TraktSearchResult>>> GetSeriesBySearchString(string stringInput)
        {
            var series = await _client.Search.GetTextQueryResultsAsync(TraktSearchResultType.Show, stringInput);
            return series;
        }

        [HttpGet("{id}/lastEpisode")]
        public async Task<ActionResult<TraktEpisode>> GetLastEpisode(string id)
        {
            var extendedInfo = new TraktExtendedInfo().SetFull();
            var lastEpisode = await _client.Shows.GetShowLastEpisodeAsync(id, extendedInfo);
            return lastEpisode;
        }

        [HttpGet("image/token")]
        public async Task<ActionResult<string>> GetTokenForImages()
        {
            var token = await _theTvDbAuthentication.GetToken();
            if(token == null)
            {
                return BadRequest();
            }
            return Ok(token);
        } 

        
    }
}