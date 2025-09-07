import nodemailer from "nodemailer";

export const sendEmail = async ({to,subject,text,html})=>{
    
 const transporter = nodemailer.createTransport({
  port: 465,
  secure: true,
  service:"gmail", 
  auth: {
    user: process.env.EMAIL,
    pass:process.env.PASS,
  },
});

  const info = await transporter.sendMail({
    from: `"lojy" ${process.env.EMAIL}`,
    to:to || "lojyibrahem7@gmail.com",
    subject: subject||"Hello ✔",
    text: text||"Hello world?", 
    html:html|| "<b>Hello world?</b>", 
  });
  if (info.accepted.length>0){
    return true
  }
  else{
    return false
  }

};

