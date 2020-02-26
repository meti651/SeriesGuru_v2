﻿using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using SerieGuru_v2.Data;
using SerieGuru_v2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SerieGuru_v2
{
    public class SeedDb
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetRequiredService<ApplicationDbContext>();
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            context.Database.EnsureCreated();
            if (!context.Users.Any())
            {
                ApplicationUser user = new ApplicationUser()
                {
                    Email = "ali@gmail.com",
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = "Ali"
                };
                userManager.CreateAsync(user, "Ali@123");
            }
        }
    }
}
