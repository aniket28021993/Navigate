using Navigate.Server.Domain.Entities;

namespace Navigate.Server.Application.Interfaces;

public interface IJwtTokenService
{
    (string token, DateTime expiresAt) GenerateToken(User user);
}
