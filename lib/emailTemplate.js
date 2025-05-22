export const welcomeEmail = (email, password, name) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Tapit.fr</title>
  <style type="text/css">
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      padding: 20px;
      margin: 0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 20px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      overflow: hidden;
    }
    
    .header {
      background: linear-gradient(135deg, #3AE09A 0%, #2dd4bf 100%);
      padding: 40px 30px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    
    .header::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
      background-size: 30px 30px;
      animation: float 20s ease-in-out infinite;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }
    
    .logo {
      width: 120px;
      height: auto;
      margin-bottom: 20px;
      position: relative;
      z-index: 2;
      filter: brightness(0) invert(1);
    }
    
    .welcome-title {
      color: #ffffff;
      font-size: 28px;
      font-weight: 700;
      margin: 0;
      position: relative;
      z-index: 2;
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .content {
      padding: 40px 30px;
    }
    
    .greeting {
      font-size: 20px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 20px;
      text-align: center;
    }
    
    .message {
      font-size: 16px;
      color: #4b5563;
      margin-bottom: 30px;
      text-align: center;
      line-height: 1.7;
    }
    
    .credentials-box {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border: 2px solid #e2e8f0;
      border-radius: 16px;
      padding: 25px;
      margin: 30px 0;
      position: relative;
    }
    
    .credentials-title {
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 20px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    
    .credentials-title::before {
      content: '🔐';
      font-size: 20px;
    }
    
    .credential-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #e2e8f0;
    }
    
    .credential-item:last-child {
      border-bottom: none;
    }
    
    .credential-label {
      font-weight: 600;
      color: #374151;
      font-size: 14px;
    }
    
    .credential-value {
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      background: #ffffff;
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid #d1d5db;
      font-size: 14px;
      color: #1f2937;
      max-width: 250px;
      word-break: break-all;
    }
    
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #3AE09A 0%, #2dd4bf 100%);
      color: #ffffff;
      padding: 16px 32px;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      text-align: center;
      margin: 30px auto;
      display: block;
      width: fit-content;
      box-shadow: 0 10px 15px -3px rgba(58, 224, 154, 0.3);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .cta-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s;
    }
    
    .cta-button:hover::before {
      left: 100%;
    }
    
    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 20px 25px -5px rgba(58, 224, 154, 0.4);
    }
    
    .features {
      margin: 30px 0;
    }
    
    .features-title {
      font-size: 18px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 20px;
      text-align: center;
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 16px;
      margin-top: 20px;
    }
    
    .feature-item {
      text-align: center;
      padding: 20px 15px;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      transition: all 0.3s ease;
    }
    
    .feature-item:hover {
      border-color: #3AE09A;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(58, 224, 154, 0.15);
    }
    
    .feature-icon {
      font-size: 24px;
      margin-bottom: 8px;
      display: block;
    }
    
    .feature-text {
      font-size: 14px;
      font-weight: 500;
      color: #374151;
    }
    
    .footer {
      background: #f8fafc;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    
    .footer-text {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 15px;
    }
    
    .social-links {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-top: 20px;
    }
    
    .social-link {
      display: inline-block;
      width: 40px;
      height: 40px;
      background: #3AE09A;
      border-radius: 50%;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      transition: all 0.3s ease;
    }
    
    .social-link:hover {
      transform: scale(1.1);
      background: #2dd4bf;
    }
    
    .disclaimer {
      background: #fef3c7;
      border: 1px solid #f59e0b;
      border-radius: 8px;
      padding: 15px;
      margin: 20px 0;
      font-size: 13px;
      color: #92400e;
      text-align: center;
    }
    
    @media only screen and (max-width: 600px) {
      .email-container {
        margin: 10px;
        border-radius: 16px;
      }
      
      .header, .content, .footer {
        padding: 25px 20px;
      }
      
      .welcome-title {
        font-size: 24px;
      }
      
      .features-grid {
        grid-template-columns: 1fr;
      }
      
      .credential-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
      
      .credential-value {
        max-width: 100%;
        width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <img src="https://linktree.sirv.com/Images/full-logo.svg" alt="Tapit.fr Logo" class="logo">
      <h1 class="welcome-title">Welcome to Tapit.fr! 🎉</h1>
    </div>
    
    <div class="content">
      <h2 class="greeting">Hello ${name}! 👋</h2>
      
      <p class="message">
        Welcome to <strong>Tapit.fr</strong> - your new home for creating beautiful, professional link-in-bio pages! 
        We're thrilled to have you join our community of creators, entrepreneurs, and innovators.
      </p>
      
      <div class="credentials-box">
        <h3 class="credentials-title">Your Login Credentials</h3>
        <div class="credential-item">
          <span class="credential-label">Email:</span>
          <span class="credential-value">${email}</span>
        </div>
        <div class="credential-item">
          <span class="credential-label">Password:</span>
          <span class="credential-value">${password}</span>
        </div>
      </div>
      
      <a href="https://www.tapit.fr/login" class="cta-button">
        Start Building Your Profile →
      </a>
      
      <div class="features">
        <h3 class="features-title">What you can do with Tapit.fr:</h3>
        <div class="features-grid">
          <div class="feature-item">
            <span class="feature-icon">🔗</span>
            <div class="feature-text">Unlimited Links</div>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🎨</span>
            <div class="feature-text">Custom Themes</div>
          </div>
          <div class="feature-item">
            <span class="feature-icon">📊</span>
            <div class="feature-text">Analytics</div>
          </div>
          <div class="feature-item">
            <span class="feature-icon">📱</span>
            <div class="feature-text">Mobile Optimized</div>
          </div>
        </div>
      </div>
      
      <div class="disclaimer">
        <strong>Security Note:</strong> Please change your password after your first login for better security.
      </div>
    </div>
    
    <div class="footer">
      <p class="footer-text">
        Need help? Contact us at <a href="mailto:support@tapit.fr" style="color: #3AE09A; text-decoration: none;">support@tapit.fr</a>
      </p>
      <p class="footer-text">
        Made with ❤️ by the Tapit.fr team
      </p>
      <div class="social-links">
        <a href="#" class="social-link">X</a>
        <a href="#" class="social-link">IG</a>
        <a href="#" class="social-link">LI</a>
      </div>
    </div>
  </div>
</body>
</html>
`;

export const resetPasswordEmail = (resetPasswordURL) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Tapit.fr Password</title>
  <style type="text/css">
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      padding: 20px;
      margin: 0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 20px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      overflow: hidden;
    }
    
    .header {
      background: linear-gradient(135deg, #3AE09A 0%, #2dd4bf 100%);
      padding: 40px 30px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    
    .header::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
      background-size: 25px 25px;
      animation: pulse 3s ease-in-out infinite;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 0.5; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.05); }
    }
    
    .logo {
      width: 100px;
      height: auto;
      margin-bottom: 20px;
      position: relative;
      z-index: 2;
      filter: brightness(0) invert(1);
    }
    
    .header-title {
      color: #ffffff;
      font-size: 26px;
      font-weight: 700;
      margin: 0;
      position: relative;
      z-index: 2;
      text-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    
    .header-subtitle {
      color: rgba(255, 255, 255, 0.9);
      font-size: 16px;
      margin-top: 8px;
      position: relative;
      z-index: 2;
    }
    
    .content {
      padding: 40px 30px;
    }
    
    .alert-box {
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      border-left: 4px solid #3AE09A;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 30px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }
    
    .alert-icon {
      font-size: 24px;
      margin-top: 2px;
    }
    
    .alert-content {
      flex: 1;
    }
    
    .alert-title {
      font-weight: 600;
      color: #0c4a6e;
      margin-bottom: 5px;
      font-size: 16px;
    }
    
    .alert-text {
      color: #075985;
      font-size: 14px;
      line-height: 1.5;
    }
    
    .message {
      font-size: 16px;
      color: #4b5563;
      margin-bottom: 30px;
      line-height: 1.7;
      text-align: center;
    }
    
    .reset-button {
      display: inline-block;
      background: linear-gradient(135deg, #3AE09A 0%, #2dd4bf 100%);
      color: #ffffff;
      padding: 18px 36px;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      text-align: center;
      margin: 20px auto;
      display: block;
      width: fit-content;
      box-shadow: 0 10px 15px -3px rgba(58, 224, 154, 0.3);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .reset-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s;
    }
    
    .reset-button:hover::before {
      left: 100%;
    }
    
    .reset-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 20px 25px -5px rgba(58, 224, 154, 0.4);
    }
    
    .security-tips {
      background: #f0f9ff;
      border: 1px solid #bae6fd;
      border-radius: 12px;
      padding: 25px;
      margin: 30px 0;
    }
    
    .security-tips-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      color: #0c4a6e;
      margin-bottom: 15px;
      font-size: 16px;
    }
    
    .security-tips-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .security-tips-list li {
      padding: 8px 0;
      color: #075985;
      font-size: 14px;
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }
    
    .security-tips-list li::before {
      content: '✓';
      color: #3AE09A;
      font-weight: bold;
      margin-top: 2px;
    }
    
    .expiry-notice {
      background: #f0f9ff;
      border: 1px solid #bae6fd;
      border-radius: 8px;
      padding: 15px;
      margin: 20px 0;
      text-align: center;
      font-size: 14px;
      color: #0c4a6e;
    }
    
    .expiry-notice strong {
      color: #075985;
    }
    
    .footer {
      background: #f8fafc;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    
    .footer-text {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 15px;
    }
    
    .footer-help {
      font-size: 13px;
      color: #9ca3af;
      line-height: 1.5;
    }
    
    .footer-help a {
      color: #3AE09A;
      text-decoration: none;
    }
    
    @media only screen and (max-width: 600px) {
      .email-container {
        margin: 10px;
        border-radius: 16px;
      }
      
      .header, .content, .footer {
        padding: 25px 20px;
      }
      
      .header-title {
        font-size: 22px;
      }
      
      .alert-box {
        flex-direction: column;
        text-align: center;
      }
      
      .reset-button {
        padding: 16px 24px;
        font-size: 15px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <img src="https://linktree.sirv.com/Images/full-logo.svg" alt="Tapit.fr Logo" class="logo">
      <h1 class="header-title">Password Reset Request 🔒</h1>
      <p class="header-subtitle">Secure your account with a new password</p>
    </div>
    
    <div class="content">
      <div class="alert-box">
        <span class="alert-icon">🔐</span>
        <div class="alert-content">
          <div class="alert-title">Password Reset Requested</div>
          <div class="alert-text">
            Someone (hopefully you) has requested a password reset for your Tapit.fr account.
          </div>
        </div>
      </div>
      
      <p class="message">
        Click the button below to create a new password for your account. This link is secure and will expire in 1 hour for your protection.
      </p>
      
      <a href="${resetPasswordURL}" class="reset-button">
        🔑 Reset My Password
      </a>
      
      <div class="expiry-notice">
        <strong>⏰ Important:</strong> This reset link will expire in 1 hour for security reasons.
      </div>
      
      <div class="security-tips">
        <div class="security-tips-title">
          🛡️ Security Tips
        </div>
        <ul class="security-tips-list">
          <li>Choose a strong password with at least 8 characters</li>
          <li>Include uppercase, lowercase, numbers, and special characters</li>
          <li>Don't reuse passwords from other accounts</li>
          <li>Consider using a password manager</li>
        </ul>
      </div>
      
      <p class="message" style="font-size: 14px; color: #6b7280; margin-top: 30px;">
        If you didn't request this password reset, you can safely ignore this email. 
        Your account remains secure and no changes have been made.
      </p>
    </div>
    
    <div class="footer">
      <p class="footer-text">
        This is an automated security email from Tapit.fr
      </p>
      <div class="footer-help">
        Having trouble? Contact our support team at 
        <a href="mailto:security@tapit.fr">security@tapit.fr</a><br>
        or visit our <a href="https://www.tapit.fr/help">Help Center</a>
      </div>
    </div>
  </div>
</body>
</html>
`;