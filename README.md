# 🤝 Surakh.sh: A Universal Authentication Service

The Surakh.sh service is a robust, secure, and flexible authentication backend that can be integrated with any mobile, web, or desktop application. It supports multiple authentication methods, including 2-factor authentication via email, Telegram, GitHub, Google, and more. The service is built with security best practices, ensuring protection against common vulnerabilities and offering innovative 
features for enhanced security.

<img src="images/image.png" alt="OTP Sent - Step 1" height="300" />

## 🌟 Features Implemented

1. **Email Verification with OTP (Two-Factor Authentication)**
   - Upon login, an OTP is sent to the user's registered email.
   - OTP is verified to complete the login process, adding an extra layer of security.
  
   <img src="images/otp_sent_1.png" alt="OTP Sent - Step 1" height="300" />
   <img src="images/otp_sent_2.png" alt="OTP Sent - Step 2" height="300" />
   <img src="images/check_otp.png" alt="Check OTP" height="300" />
   <img src="images/login_success.png" alt="Login Success" height="300" />

2. **Telegram OTP Verification**
   - Users can verify their identity through Telegram by receiving a unique OTP.

3. **Federated Login**
   - Integrated GitHub and Google authentication for seamless user sign-in.

   <img src="images/google_auth.png" alt="Google Authentication" height="300" />

4. **Private Key Generation for Users**
   - A unique private key is generated for each user to access the services, ensuring high security.
   - The private key is encrypted using bcrypt to maintain data integrity and confidentiality.

   <img src="images/Secret_key.jpg" alt="Google Authentication" height="300" />

5. **Security Measures**
   - **XSS and CSRF Attack Prevention**: Input sanitization and secure cookie handling.
   - **Brute Force Protection**: Rate limiting for wrong password attempts per user IP.
   - **Clickjacking Prevention**: X-Frame-Options to protect against clickjacking.
   - **SQL Injection Protection**: ORM and prepared statements in database interactions.  

## 📚 How to Use the API

- **Authentication**: Send a POST request to `/api/v1/auth/login` with the user’s credentials.
- **Federated Login**: Use OAuth endpoints for Google and GitHub login.
- **Two-Factor Authentication**: After login, verify the OTP sent to the email or Telegram account.
- **Rate Limiting**: Ensure your application respects rate limits of X requests per minute.

## 🤝 Contributing

Feel free to submit issues or pull requests. Contributions are welcome!

## 📄 License

This project is licensed under the MIT License.
