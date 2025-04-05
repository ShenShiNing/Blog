import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 从请求中获取表单数据
    const { name, email, message } = await req.json();

    // 验证数据
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required" },
        { status: 400 }
      );
    }

    // 这里是发送邮件的逻辑
    // 在真实环境中，你可以使用Nodemailer, SendGrid, AWS SES或其他邮件服务

    // 模拟邮件发送延迟
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 模拟成功发送邮件
    console.log("Email sent:", { name, email, message });

    // 返回成功响应
    return NextResponse.json({ success: true });

    /* 
    使用真实邮件服务的示例代码 (需要添加相应的依赖)：
    
    // 使用Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Contact Form" <${process.env.CONTACT_EMAIL}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `New message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });
    */
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
