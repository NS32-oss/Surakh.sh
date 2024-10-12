
# Authenticate Me: A Universal Authentication Service

The Authenticate Me service is a robust, secure, and flexible authentication backend that can be integrated with any mobile, web, or desktop application. It supports multiple authentication methods, including 2-factor authentication via email, Telegram, GitHub, Google, and more. The service is built with security best practices, ensuring protection against common vulnerabilities and offering innovative features for enhanced security.

## Features Implemented

1. **Email Verification with OTP (Two-Factor Authentication)**  
   - Upon login, an OTP is sent to the user's registered email.  
   - OTP is verified to complete the login process, adding an extra layer of security.

2. **Telegram OTP Verification**  
   - Users can verify their identity through Telegram by receiving a unique OTP.

3. **GitHub & Google Verification**  
   - Federated login using GitHub and Google accounts for easy user authentication.

4. **Private Key Generation for Users**  
   - A unique private key is generated for each user to access the services.  
   - The private key is encrypted using bcrypt for security.

5. **Security Features (XSS, CSRF, SQL Injection Prevention, Brute Force, Clickjacking)**  
   - Implemented security best practices such as input sanitization, secure cookie handling, X-Frame-Options, rate limiting, and using ORM/prepared statements to prevent common vulnerabilities.

6. **Rate Limiting & Brute Force Protection**  
   - Restricted password attempts per user IP address for 12 hours to prevent brute force attacks.

## How to Use the API

1. **Authentication**: Send a POST request to `/api/v1/auth/login` with the user’s credentials.
2. **Federated Login**: Use OAuth endpoints for Google and GitHub login.
3. **Two-Factor Authentication**: After login, verify the OTP sent to the email or Telegram account.
4. **Rate Limiting**: Ensure your application respects rate limits (X requests per minute).

## Contributing
Feel free to submit issues or pull requests. Contributions are welcome!

## License
This project is licensed under the MIT License.
