using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SerieGuru_v2.Models
{
    public class ApplicationUser : IdentityUser
    {
        public List<Serie> Series { get; set; }
    }
}
