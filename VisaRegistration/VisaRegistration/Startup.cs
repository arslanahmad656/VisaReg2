using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin;
using Owin;
using VisaRegistration.Models;

[assembly: OwinStartupAttribute(typeof(VisaRegistration.Startup))]
namespace VisaRegistration
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            CreateAdmin();
        }

        private void CreateAdmin()
        {
            ApplicationDbContext context = new ApplicationDbContext();

            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));
            var UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));

            if(!roleManager.RoleExists("admin"))
            {
                var role = new IdentityRole()
                {
                    Name = "admin"
                };
                roleManager.Create(role);

                var user = new ApplicationUser()
                {
                    UserName = "admin",
                    Email = "admin@admin.com"
                };
                string userPWD = "Updating@931";

                var chkUser = UserManager.Create(user, userPWD);

                //Add default User to Role Admin   
                if (chkUser.Succeeded)
                {
                    var result1 = UserManager.AddToRole(user.Id, "admin");

                }
            }
        }
    }
}
