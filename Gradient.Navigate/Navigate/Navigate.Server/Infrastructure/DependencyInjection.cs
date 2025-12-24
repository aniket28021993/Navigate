using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Navigate.Server.Application.Interfaces;
using Navigate.Server.Infrastructure.Data;
using Navigate.Server.Infrastructure.Repositories;
using Navigate.Server.Infrastructure.Security;

namespace Navigate.Server.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<JwtOptions>(configuration.GetSection("Jwt"));
        services.AddSingleton<SqlConnectionFactory>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IJwtTokenService, JwtTokenService>();

        return services;
    }
}
