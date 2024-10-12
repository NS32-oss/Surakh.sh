# 🤝 Authenticate Me: A Universal Authentication Service

The Authenticate Me service is a robust, secure, and flexible authentication backend that can be integrated with any mobile, web, or desktop application. It supports multiple authentication methods, including 2-factor authentication via email, Telegram, GitHub, Google, and more. The service is built with security best practices, ensuring protection against common vulnerabilities and offering innovative features for enhanced security.

## 🌟 Features Implemented

1. **Email Verification with OTP (Two-Factor Authentication)**
   - Upon login, an OTP is sent to the user's registered email.
   - OTP is verified to complete the login process, adding an extra layer of security.
  
2. **Telegram OTP Verification**
   - Users can verify their identity through Telegram by receiving a unique OTP.

3. **Federated Login**
   - Integrated GitHub and Google authentication for seamless user sign-in.

4. **Private Key Generation for Users**
   - A unique private key is generated for each user to access the services, ensuring high security.
   - The private key is encrypted using bcrypt to maintain data integrity and confidentiality.

5. **Security Measures**
   - **XSS and CSRF Attack Prevention**: Input sanitization and secure cookie handling.
   - **Brute Force Protection**: Rate limiting for wrong password attempts per user IP.
   - **Clickjacking Prevention**: X-Frame-Options to protect against clickjacking.
   - **SQL Injection Protection**: ORM and prepared statements in database interactions.
     
![Google authentication](images/images/google_auth.png)


## 📚 How to Use the API

- **Authentication**: Send a POST request to `/api/v1/auth/login` with the user’s credentials.
- **Federated Login**: Use OAuth endpoints for Google and GitHub login.
- **Two-Factor Authentication**: After login, verify the OTP sent to the email or Telegram account.
- **Rate Limiting**: Ensure your application respects rate limits of X requests per minute.

## 🤝 Contributing

Feel free to submit issues or pull requests. Contributions are welcome!

## 📄 License

This project is licensed under the MIT License.
