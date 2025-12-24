using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Navigate.Application.Interfaces;
using Navigate.Infrastructure.Data;
using Navigate.Infrastructure.Repositories;
using Navigate.Infrastructure.Security;

namespace Navigate.Infrastructure;

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
