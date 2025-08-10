// Place this file at: netlify/functions/send-email.js

const brevo = require('@getbrevo/brevo');

// This is the main handler function that Netlify will run
exports.handler = async function (event, context) {
  // 1. Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    // 2. Get the form data from the request
    const data = JSON.parse(event.body);
    // Destructure all possible fields, including the new formType
    const { formType, fullname, email, phone, goal, notes, companyName, contactPerson } = data;

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Email is required.' }),
      };
    }

    // 3. Configure the Brevo API client
    const apiInstance = new brevo.TransactionalEmailsApi();
    const apiKey = apiInstance.authentications['apiKey'];
    // Your API key is now securely read from Netlify's environment variables
    apiKey.apiKey = process.env.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; ; 

    // 4. Create the email content
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    
    sendSmtpEmail.sender = { 
      name: 'PFS Contact Form', 
      email: 'events@profitsports.in' // IMPORTANT: Use a verified sender from Brevo
    };
    sendSmtpEmail.to = [{ 
      email: 'support@coachravinder.com', // IMPORTANT: Your receiving email
      name: 'PFS Admin'  
    }];

    // 5. Use a switch statement to handle different form types
    switch (formType) {
      case 'corporate':
        sendSmtpEmail.subject = `New Corporate Inquiry from ${companyName}`;
        sendSmtpEmail.htmlContent = `
          <html><body>
            <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
              <h1 style="color: #4F46E5;">New Corporate Inquiry!</h1>
              <p>A new corporate wellness inquiry has been submitted. Here are the details:</p>
              <ul>
                <li><strong>Company Name:</strong> ${companyName || 'Not provided'}</li>
                <li><strong>Contact Person:</strong> ${contactPerson || 'Not provided'}</li>
                <li><strong>Email:</strong> ${email || 'Not provided'}</li>
                <li><strong>Phone:</strong> ${phone || 'Not provided'}</li>
              </ul>
              <h2>Notes:</h2>
              <p>${notes || 'No notes provided.'}</p>
            </div>
          </body></html>
        `;
        break;

      case 'newsletter':
        sendSmtpEmail.subject = 'New Newsletter Subscriber!';
        sendSmtpEmail.htmlContent = `
          <h1>New Newsletter Subscriber</h1>
          <p>A new user has subscribed to your newsletter:</p>
          <ul><li><strong>Email:</strong> ${email}</li></ul>
        `;
        break;

      case 'application':
      default: // Default to the main application form
        sendSmtpEmail.subject = `New Fuel Lab Application from ${fullname}`;
        sendSmtpEmail.htmlContent = `
          <html><body>
            <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
              <h1 style="color: #EF4444;">New Fuel Lab Application!</h1>
              <p>You have received a new coaching application. Here are the details:</p>
              <ul>
                <li><strong>Name:</strong> ${fullname || 'Not provided'}</li>
                <li><strong>Email:</strong> ${email || 'Not provided'}</li>
                <li><strong>Phone:</strong> ${phone || 'Not provided'}</li>
                <li><strong>Primary Goal:</strong> ${goal || 'Not provided'}</li>
              </ul>
              <h2>Notes:</h2>
              <p>${notes || 'No notes provided.'}</p>
            </div>
          </body></html>
        `;
        break;
    }

    // 6. Send the email
    await apiInstance.sendTransacEmail(sendSmtpEmail);

    // 7. Return a success response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Your message has been sent successfully!' }),
    };

  } catch (error) {
    console.error('Brevo API Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email.' }),
    };
  }
};
