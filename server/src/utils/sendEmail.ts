import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to: string, html: string) {
  // Создать тестовую учетную запись службы SMTP из ethereal.email
  // Требуется только в том случае, если у вас нет реальной учетной записи электронной почты для тестирования
  // let testAccount = await nodemailer.createTestAccount();
  // console.log("testAccount", testAccount);

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true для 465, false для других портов
    auth: {
      user: "mds43vi6nviwucqv@ethereal.email", // generated ethereal user
      pass: "xJsQzVAuFYKqx5xUR9", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: to, // list of receivers
    subject: "Поменять пароль", // Subject line
    html,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
