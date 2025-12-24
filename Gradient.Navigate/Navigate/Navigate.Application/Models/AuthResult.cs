namespace Navigate.Application.Models;

public sealed class AuthResult
{
    public string AccessToken { get; set; } = string.Empty;
    public DateTime ExpiresAt { get; set; }
}
