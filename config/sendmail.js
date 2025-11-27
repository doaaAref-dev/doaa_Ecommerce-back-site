import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  try {
    // 1- إعداد الـ transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // أو ممكن تستخدم SMTP خاص بأي خدمة
      auth: {
        user: process.env.EMAIL_USER, // الإيميل بتاعك
        pass: process.env.EMAIL_PASS, // باسورد التطبيق (App password)
      },
    });

    // 2- محتوى الرسالة
    const mailOptions = {
      from: `"${process.env.APP_NAME || "MyApp"}" <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      html: options.message, // HTML محتوى الإيميل
    };

    // 3- إرسال الإيميل
    await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully to " + options.email);
  } catch (error) {
    console.error("❌ Email not sent:", error.message);
    throw new Error("Email could not be sent");
  }
};

export default sendEmail;
