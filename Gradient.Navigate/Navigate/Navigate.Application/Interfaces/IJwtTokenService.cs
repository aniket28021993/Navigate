using Navigate.Domain.Entities;

namespace Navigate.Application.Interfaces;

public interface IJwtTokenService
{
    (string token, DateTime expiresAt) GenerateToken(User user);
}
