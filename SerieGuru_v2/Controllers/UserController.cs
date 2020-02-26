using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SerieGuru_v2.Models;

namespace SerieGuru_v2.Controllers
{
    [Authorize]
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;

        public UserController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost("id")]
        public async Task<ActionResult<string>> GetUserID([FromBody]string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            return Ok(user);
        }
    }
}
