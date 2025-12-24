using Navigate.Domain.Entities;

namespace Navigate.Application.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string email, CancellationToken cancellationToken);
    Task<User> CreateAsync(User user, string passwordHash, CancellationToken cancellationToken);
}
