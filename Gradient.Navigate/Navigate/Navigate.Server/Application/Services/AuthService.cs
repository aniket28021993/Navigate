using Microsoft.AspNetCore.Identity;
using Navigate.Server.Application.Interfaces;
using Navigate.Server.Application.Models;
using Navigate.Server.Domain.Entities;

namespace Navigate.Server.Application.Services;

public sealed class AuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher<User> _passwordHasher;
    private readonly IJwtTokenService _jwtTokenService;

    public AuthService(
        IUserRepository userRepository,
        IPasswordHasher<User> passwordHasher,
        IJwtTokenService jwtTokenService)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
        _jwtTokenService = jwtTokenService;
    }

    public async Task<AuthResult> RegisterAsync(RegisterRequest request, CancellationToken cancellationToken)
    {
        var existingUser = await _userRepository.GetByEmailAsync(request.Email, cancellationToken);
        if (existingUser is not null)
        {
            throw new InvalidOperationException("Email is already registered.");
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = request.Email,
            FullName = request.FullName
        };

        var passwordHash = _passwordHasher.HashPassword(user, request.Password);
        var createdUser = await _userRepository.CreateAsync(user, passwordHash, cancellationToken);
        var (token, expiresAt) = _jwtTokenService.GenerateToken(createdUser);

        return new AuthResult
        {
            AccessToken = token,
            ExpiresAt = expiresAt
        };
    }

    public async Task<AuthResult> LoginAsync(LoginRequest request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByEmailAsync(request.Email, cancellationToken);
        if (user is null)
        {
            throw new UnauthorizedAccessException("Invalid credentials.");
        }

        var verification = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);
        if (verification == PasswordVerificationResult.Failed)
        {
            throw new UnauthorizedAccessException("Invalid credentials.");
        }

        var (token, expiresAt) = _jwtTokenService.GenerateToken(user);
        return new AuthResult
        {
            AccessToken = token,
            ExpiresAt = expiresAt
        };
    }
}
