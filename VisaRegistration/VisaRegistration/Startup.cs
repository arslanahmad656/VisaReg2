using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(VisaRegistration.Startup))]
namespace VisaRegistration
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
