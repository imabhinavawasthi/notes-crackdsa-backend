import otpSend from "../../models/otpVerification.js"
import user from "../../models/user.js";
import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'
import dotenv from 'dotenv'

dotenv.config();

let { EMAIL_AUTH, PASS_AUTH } = process.env;

//nodemailer
let transporter = nodemailer.createTransport(smtpTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: EMAIL_AUTH,
        pass: PASS_AUTH
    }
}))

const verifyOtp = async (req, res) => {
    try {
        let {email,OTP}=req.body;
        const otpVerificationRecords=await otpSend.findOne({
            email
        })
        if(!otpVerificationRecords){
            res.json({message:"no otp record"});
        }
        else{
            // res.send(otpVerificationRecords)
            const recordOTP=otpVerificationRecords.otp;
            if(recordOTP==OTP){
                const curruser=await user.findOne({email});
                if(curruser?.verified==false){
                    let mailOptions = {
                        from: process.env.EMAIL_AUTH,
                        to: `${email}`,
                        subject: "Welcome to crackDSA.com",
                        // text: `hello registered`
                        html:'<!doctype html><html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>  <title> Welcome to crackDSA </title>  <!--[if !mso]><!-- -->  <meta http-equiv="X-UA-Compatible" content="IE=edge">  <!--<![endif]-->  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">  <meta name="viewport" content="width=device-width, initial-scale=1">  <style type="text/css">    #outlook a {      padding: 0;    }    body {      margin: 0;      padding: 0;      -webkit-text-size-adjust: 100%;      -ms-text-size-adjust: 100%;    }    table,    td {      border-collapse: collapse;      mso-table-lspace: 0pt;      mso-table-rspace: 0pt;    }    img {      border: 0;      height: auto;      line-height: 100%;      outline: none;      text-decoration: none;      -ms-interpolation-mode: bicubic;    }    p {      display: block;      margin: 13px 0;    }  </style>  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap" rel="stylesheet" type="text/css">  <style type="text/css">    @import url(https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap);  </style>  <!--<![endif]-->  <style type="text/css">    @media only screen and (min-width:480px) {      .mj-column-per-100 {        width: 100% !important;        max-width: 100%;      }    }  </style>  <style type="text/css">    @media only screen and (max-width:480px) {      table.mj-full-width-mobile {        width: 100% !important;      }      td.mj-full-width-mobile {        width: auto !important;      }    }  </style>  <style type="text/css">    a,    span,    td,    th {      -webkit-font-smoothing: antialiased !important;      -moz-osx-font-smoothing: grayscale !important;    }  </style></head><body style="background-color:#f3f3f5;">  <div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;"> Welcome to crackDSA </div>  <div style="background-color:#fff;">    <!--[if mso | IE]>      <table         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"      >        <tr>          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">      <![endif]-->    <div style="margin:0px auto;max-width:600px;">      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">        <tbody>          <tr>            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">              <!--[if mso | IE]>                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">                        <tr>                  <td               class="" style="vertical-align:top;width:600px;"            >          <![endif]-->              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">                  <tr>                    <td style="font-size:0px;word-break:break-word;">                      <!--[if mso | IE]>            <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td height="20" style="vertical-align:top;height:20px;">          <![endif]-->                      <div style="height:20px;"> &nbsp; </div>                      <!--[if mso | IE]>            </td></tr></table>          <![endif]-->                    </td>                  </tr>                </table>              </div>              <!--[if mso | IE]>            </td>                  </tr>                        </table>                <![endif]-->            </td>          </tr>        </tbody>      </table>    </div>    <!--[if mso | IE]>          </td>        </tr>      </table>            <table         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"      >        <tr>          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">              <v:rect  style="width:600px;" xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">        <v:fill  origin="0.5, 0" position="0.5, 0" src="https://www.transparenttextures.com/patterns/brushed-alum.png" color="#00AD55" type="tile" />        <v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">      <![endif]-->    <div style="background:#00AD55 url(https://www.transparenttextures.com/patterns/brushed-alum.png) top center / auto repeat;margin:0px auto;border-radius:4px 4px 0 0;max-width:600px;">      <div style="line-height:0;font-size:0;">        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#00AD55 url(https://www.transparenttextures.com/patterns/brushed-alum.png) top center / auto repeat;width:100%;border-radius:4px 4px 0 0;">          <tbody>            <tr>              <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">                <!--[if mso | IE]>                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">                        <tr>                  <td               class="" style="vertical-align:top;width:600px;"            >          <![endif]-->                <!--[if mso | IE]>            </td>                  </tr>                        </table>                <![endif]-->              </td>            </tr>          </tbody>        </table>      </div>    </div>    <!--[if mso | IE]>        </v:textbox>      </v:rect>              </td>        </tr>      </table>            <table         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"      >        <tr>          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">      <![endif]-->    <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;border-radius:0 0 4px 4px;max-width:600px;">      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;border-radius:0 0 4px 4px;">        <tbody>          <tr>            <td style="direction:ltr;font-size:0px;padding:20px 10px;text-align:center;">              <!--[if mso | IE]>                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">                        <tr>                  <td               class="" style="vertical-align:top;width:580px;"            >          <![endif]-->              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">                  <tr>                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">                      <div style="font-family:Poppins, Helvetica, Arial, sans-serif;font-size:20px;font-weight:300;line-height:30px;text-align:left;color:#003366;">                        <h1 style="margin: 0; font-size: 32px; line-height: 50px; font-weight: 400;"> Welcome to crackDSA.com</h1>                      </div>                    </td>                  </tr>                  <tr>                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">                      <div style="font-family:Poppins, Helvetica, Arial, sans-serif;font-size:18px;font-weight:300;line-height:30px;text-align:left;color:#003366;">Hi <strong>'+`${curruser?.name}`+'</strong>, My name is <strong>Abhinav Awasthi</strong> (Builder, crackDSA.com) and I am very happy to welcome you to crackDSA!<p style="font-size:15px;">We are still in beta and your support and feedback is very important for us!</p></div>                    </td>                  </tr>                  <tr>                    <td align="left" vertical-align="middle" style="font-size:0px;padding:10px 25px;word-break:break-word;">                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">                        <tr>                          <td align="center" bgcolor="#043768" role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#043768;" valign="middle">                            <a href="https://crackdsa.com" style="display: inline-block; background: #5469d4; color: white; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: normal; line-height: 30px; margin: 0; text-decoration: none; text-transform: none; padding: 10px 25px; mso-padding-alt: 0px; border-radius: 3px;" target="_blank"> Visit crackDSA.com </a>                          </td>                        </tr>                      </table>                    </td>                  </tr>                </table>              </div>              <!--[if mso | IE]>            </td>                  </tr>                        </table>                <![endif]-->            </td>          </tr>        </tbody>      </table>    </div>    <!--[if mso | IE]>          </td>        </tr>      </table>            <table         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"      >        <tr>          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">      <![endif]-->    <div style="background:#d5d5d5;background-color:#d5d5d5;margin:0px auto;max-width:600px;">      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#d5d5d5;background-color:#d5d5d5;width:100%;">        <tbody>          <tr>            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">              <!--[if mso | IE]>                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">                        <tr>                  <td               class="" style="vertical-align:top;width:600px;"            >          <![endif]-->              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">                  <tr>                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">                      <div style="font-family:Poppins, Helvetica, Arial, sans-serif;font-size:14px;font-weight:300;line-height:20px;text-align:left;color:#043768;">                        <p style="margin: 0;">If you have any questions simply reply to this email and we would be more than happy to reply. :)</p>                      </div>                    </td>                  </tr>                </table>              </div>              <!--[if mso | IE]>            </td>                  </tr>                        </table>                <![endif]-->            </td>          </tr>        </tbody>      </table>    </div>    <!--[if mso | IE]>          </td>        </tr>      </table>            <table         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"      >        <tr>          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">      <![endif]-->    <div style="background:#043768;background-color:#043768;margin:0px auto;max-width:600px;">      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#043768;background-color:#043768;width:100%;">        <tbody>          <tr>            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">              <!--[if mso | IE]>                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">                        <tr>                  <td               class="" style="vertical-align:top;width:600px;"            >          <![endif]-->              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">                  <tr>                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">                      <div style="font-family:Poppins, Helvetica, Arial, sans-serif;font-size:16px;font-weight:500;line-height:30px;text-align:left;color:#ffffff;">                        <p style="margin: 0;">  </p>                      </div>                    </td>                  </tr>                  <tr>                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">                      <div style="font-family:Poppins, Helvetica, Arial, sans-serif;font-size:16px;font-weight:500;line-height:30px;text-align:left;color:#ffffff;">                        <p style="margin: 0;"> Copyright © 2022 crackDSA.com<br> All rights reserved.</p>                      </div>                    </td>                  </tr>                </table>              </div>              <!--[if mso | IE]>            </td>                      <td               class="" style="vertical-align:top;width:600px;"            >          <![endif]-->              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">                  <tr>                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">                      <!--[if mso | IE]>      <table         align="left" border="0" cellpadding="0" cellspacing="0" role="presentation"      >        <tr>                    <td>            <![endif]-->                      <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">                        <tr>                          <td style="padding:4px;">                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:18px;">                              <tr>                                <td style="font-size:0;height:18px;vertical-align:middle;width:18px;">                                  <a href="https://wa.me/message/TPN76XLWVOWDB1" target="_blank" style="color: #00AD55;">                                    <img alt="whatsapp-logo" height="18" src="https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c543.png" style="border-radius:3px;display:block;" width="18">                                  </a>                                </td>                              </tr>                            </table>                          </td>                        </tr>                      </table>                      <!--[if mso | IE]>              </td>                          <td>            <![endif]-->                      <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">                        <tr>                          <td style="padding:4px;">                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:18px;">                              <tr>                                <td style="font-size:0;height:18px;vertical-align:middle;width:18px;">                     <a href="https://www.linkedin.com/company/crackdsa/" target="_blank" style="color: #00AD55;">                                    <img alt="linkedin-logo" height="18" src="https://cdn-icons-png.flaticon.com/512/174/174857.png" style="border-radius:3px;display:block;" width="18">                                  </a>                                </td>                              </tr>                            </table>                          </td>                        </tr>                      </table>                      <!--[if mso | IE]>              </td>                          <td>            <![endif]-->                      <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">                        <tr>                          <td style="padding:4px;">                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:18px;">                              <tr>                                <td style="font-size:0;height:18px;vertical-align:middle;width:18px;">                                  <a href="https://www.youtube.com/@AbhinavAwasthi" target="_blank" style="color: #00AD55;">                                    <img alt="youtube-logo" height="18" src="https://i.pinimg.com/originals/09/f4/72/09f4726125ab5fa8cbcf754b9ba07e7c.jpg" style="border-radius:3px;display:block;" width="18">                                  </a>                                </td>                              </tr>                            </table>                          </td>                        </tr>                      </table>                      <!--[if mso | IE]>              </td>                          <td>            <![endif]-->                      <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">                        <tr>                          <td style="padding:4px;">                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:18px;">                              <tr>                                <td style="font-size:0;height:18px;vertical-align:middle;width:18px;">                                                                                                                          </td>                              </tr>                            </table>                          </td>                        </tr>                      </table>                      <!--[if mso | IE]>              </td>                      </tr>        </table>      <![endif]-->                    </td>                  </tr>                  <tr>                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">                    </td>                  </tr>                </table>              </div>              <!--[if mso | IE]>            </td>                  </tr>                        </table>                <![endif]-->            </td>          </tr>        </tbody>      </table>    </div>    <!--[if mso | IE]>          </td>        </tr>      </table>            <table         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"      >        <tr>          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">      <![endif]-->    <div style="margin:0px auto;max-width:600px;">      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">        <tbody>          <tr>            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">              <!--[if mso | IE]>                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">                        <tr>                  <td               class="" style="vertical-align:top;width:600px;"            >          <![endif]-->              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">                  <tr>                    <td style="font-size:0px;word-break:break-word;">                      <!--[if mso | IE]>            <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td height="1" style="vertical-align:top;height:1px;">          <![endif]-->                      <div style="height:1px;"> &nbsp; </div>                      <!--[if mso | IE]>            </td></tr></table>          <![endif]-->                    </td>                  </tr>                </table>              </div>              <!--[if mso | IE]>            </td>                  </tr>                        </table>                <![endif]-->            </td>          </tr>        </tbody>      </table>    </div>    <!--[if mso | IE]>          </td>        </tr>      </table>      <![endif]-->  </div></body></html>'
                    }
                    await transporter.sendMail(mailOptions,function  (err, data) {
                    })
                }
                await user.updateOne({email:email},{verified:true});
                await otpSend.deleteMany({email});
                res.json({message:"otp verified"});
            }
            else{
                res.json({message:"wrong otp"});
            }
        }
    } catch (error) {
        res.json({message:error.message})
    }
}

export default verifyOtp




// <!doctype html>
// <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

// <head>
//   <title> Welcome to crackDSA </title>
//   <!--[if !mso]><!-- -->
//   <meta http-equiv="X-UA-Compatible" content="IE=edge">
//   <!--<![endif]-->
//   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1">
//   <style type="text/css">
//     #outlook a {
//       padding: 0;
//     }

//     body {
//       margin: 0;
//       padding: 0;
//       -webkit-text-size-adjust: 100%;
//       -ms-text-size-adjust: 100%;
//     }

//     table,
//     td {
//       border-collapse: collapse;
//       mso-table-lspace: 0pt;
//       mso-table-rspace: 0pt;
//     }

//     img {
//       border: 0;
//       height: auto;
//       line-height: 100%;
//       outline: none;
//       text-decoration: none;
//       -ms-interpolation-mode: bicubic;
//     }

//     p {
//       display: block;
//       margin: 13px 0;
//     }
//   </style>
//   <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap" rel="stylesheet" type="text/css">
//   <style type="text/css">
//     @import url(https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap);
//   </style>
//   <!--<![endif]-->
//   <style type="text/css">
//     @media only screen and (min-width:480px) {
//       .mj-column-per-100 {
//         width: 100% !important;
//         max-width: 100%;
//       }
//     }
//   </style>
//   <style type="text/css">
//     @media only screen and (max-width:480px) {
//       table.mj-full-width-mobile {
//         width: 100% !important;
//       }

//       td.mj-full-width-mobile {
//         width: auto !important;
//       }
//     }
//   </style>
//   <style type="text/css">
//     a,
//     span,
//     td,
//     th {
//       -webkit-font-smoothing: antialiased !important;
//       -moz-osx-font-smoothing: grayscale !important;
//     }
//   </style>
// </head>

// <body style="background-color:#f3f3f5;">
//   <div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;"> Welcome to crackDSA </div>
//   <div style="background-color:#5469d4;">
//     <!--[if mso | IE]>
//       <table
//          align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
//       >
//         <tr>
//           <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
//       <![endif]-->
//     <div style="margin:0px auto;max-width:600px;">
//       <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
//         <tbody>
//           <tr>
//             <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
//               <!--[if mso | IE]>
//                   <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
//         <tr>
      
//             <td
//                class="" style="vertical-align:top;width:600px;"
//             >
//           <![endif]-->
//               <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
//                 <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
//                   <tr>
//                     <td style="font-size:0px;word-break:break-word;">
//                       <!--[if mso | IE]>
    
//         <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td height="20" style="vertical-align:top;height:20px;">
      
//     <![endif]-->
//                       <div style="height:20px;"> &nbsp; </div>
//                       <!--[if mso | IE]>
    
//         </td></tr></table>
      
//     <![endif]-->
//                     </td>
//                   </tr>
//                 </table>
//               </div>
//               <!--[if mso | IE]>
//             </td>
          
//         </tr>
      
//                   </table>
//                 <![endif]-->
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//     <!--[if mso | IE]>
//           </td>
//         </tr>
//       </table>
      
//       <table
//          align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
//       >
//         <tr>
//           <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      
//         <v:rect  style="width:600px;" xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
//         <v:fill  origin="0.5, 0" position="0.5, 0" src="https://www.transparenttextures.com/patterns/brushed-alum.png" color="#00AD55" type="tile" />
//         <v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
//       <![endif]-->
//     <div style="background:#00AD55 url(https://www.transparenttextures.com/patterns/brushed-alum.png) top center / auto repeat;margin:0px auto;border-radius:4px 4px 0 0;max-width:600px;">
//       <div style="line-height:0;font-size:0;">
//         <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#00AD55 url(https://www.transparenttextures.com/patterns/brushed-alum.png) top center / auto repeat;width:100%;border-radius:4px 4px 0 0;">
//           <tbody>
//             <tr>
//               <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
//                 <!--[if mso | IE]>
//                   <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
//         <tr>
      
//             <td
//                class="" style="vertical-align:top;width:600px;"
//             >
//           <![endif]-->
//                 <!--[if mso | IE]>
//             </td>
          
//         </tr>
      
//                   </table>
//                 <![endif]-->
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//     <!--[if mso | IE]>
//         </v:textbox>
//       </v:rect>
    
//           </td>
//         </tr>
//       </table>
      
//       <table
//          align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
//       >
//         <tr>
//           <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
//       <![endif]-->
//     <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;border-radius:0 0 4px 4px;max-width:600px;">
//       <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;border-radius:0 0 4px 4px;">
//         <tbody>
//           <tr>
//             <td style="direction:ltr;font-size:0px;padding:20px 10px;text-align:center;">
//               <!--[if mso | IE]>
//                   <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
//         <tr>
      
//             <td
//                class="" style="vertical-align:top;width:580px;"
//             >
//           <![endif]-->
//               <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
//                 <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
//                   <tr>
//                     <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
//                       <div style="font-family:Poppins, Helvetica, Arial, sans-serif;font-size:20px;font-weight:300;line-height:30px;text-align:left;color:#003366;">
//                         <h1 style="margin: 0; font-size: 32px; line-height: 50px; font-weight: 400;"> Welcome to crackDSA.com</h1>
//                       </div>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
//                       <div style="font-family:Poppins, Helvetica, Arial, sans-serif;font-size:18px;font-weight:300;line-height:30px;text-align:left;color:#003366;">Hi <strong>NAME</strong>, 
// My name is <strong>Abhinav Awasthi</strong> (Founder, crackDSA.com) and I am very happy to welcome you to crackDSA!

// <p style="font-size:15px;">We are still in beta and your support and feedback is very important for us!</p>
// </div>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td align="left" vertical-align="middle" style="font-size:0px;padding:10px 25px;word-break:break-word;">
//                       <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
//                         <tr>
//                           <td align="center" bgcolor="#043768" role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#043768;" valign="middle">
//                             <a href="https://crackdsa.com" style="display: inline-block; background: #5469d4; color: white; font-family: Poppins, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: normal; line-height: 30px; margin: 0; text-decoration: none; text-transform: none; padding: 10px 25px; mso-padding-alt: 0px; border-radius: 3px;" target="_blank"> Visit crackDSA.com </a>
//                           </td>
//                         </tr>
//                       </table>
//                     </td>
//                   </tr>
//                 </table>
//               </div>
//               <!--[if mso | IE]>
//             </td>
          
//         </tr>
      
//                   </table>
//                 <![endif]-->
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//     <!--[if mso | IE]>
//           </td>
//         </tr>
//       </table>
      
//       <table
//          align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
//       >
//         <tr>
//           <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
//       <![endif]-->
//     <div style="background:#d5d5d5;background-color:#d5d5d5;margin:0px auto;max-width:600px;">
//       <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#d5d5d5;background-color:#d5d5d5;width:100%;">
//         <tbody>
//           <tr>
//             <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
//               <!--[if mso | IE]>
//                   <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
//         <tr>
      
//             <td
//                class="" style="vertical-align:top;width:600px;"
//             >
//           <![endif]-->
//               <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
//                 <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
//                   <tr>
//                     <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
//                       <div style="font-family:Poppins, Helvetica, Arial, sans-serif;font-size:14px;font-weight:300;line-height:20px;text-align:left;color:#043768;">
//                         <p style="margin: 0;">If you have any questions simply reply to this email and we would be more than happy to reply. :)</p>
//                       </div>
//                     </td>
//                   </tr>
//                 </table>
//               </div>
//               <!--[if mso | IE]>
//             </td>
          
//         </tr>
      
//                   </table>
//                 <![endif]-->
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//     <!--[if mso | IE]>
//           </td>
//         </tr>
//       </table>
      
//       <table
//          align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
//       >
//         <tr>
//           <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
//       <![endif]-->
//     <div style="background:#043768;background-color:#043768;margin:0px auto;max-width:600px;">
//       <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#043768;background-color:#043768;width:100%;">
//         <tbody>
//           <tr>
//             <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
//               <!--[if mso | IE]>
//                   <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
//         <tr>
      
//             <td
//                class="" style="vertical-align:top;width:600px;"
//             >
//           <![endif]-->
//               <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
//                 <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
//                   <tr>
//                     <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
//                       <div style="font-family:Poppins, Helvetica, Arial, sans-serif;font-size:16px;font-weight:500;line-height:30px;text-align:left;color:#ffffff;">
//                         <p style="margin: 0;">  </p>
//                       </div>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
//                       <div style="font-family:Poppins, Helvetica, Arial, sans-serif;font-size:16px;font-weight:500;line-height:30px;text-align:left;color:#ffffff;">
//                         <p style="margin: 0;"> Copyright © 2022 crackDSA.com<br> All rights reserved.</p>
//                       </div>
//                     </td>
//                   </tr>
//                 </table>
//               </div>
//               <!--[if mso | IE]>
//             </td>
          
//             <td
//                class="" style="vertical-align:top;width:600px;"
//             >
//           <![endif]-->
//               <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
//                 <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
//                   <tr>
//                     <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
//                       <!--[if mso | IE]>
//       <table
//          align="left" border="0" cellpadding="0" cellspacing="0" role="presentation"
//       >
//         <tr>
      
//               <td>
//             <![endif]-->
//                       <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
//                         <tr>
//                           <td style="padding:4px;">
//                             <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:18px;">
//                               <tr>
//                                 <td style="font-size:0;height:18px;vertical-align:middle;width:18px;">
//                                   <a href="#" target="_blank" style="color: #00AD55;">
//                                     <img alt="whatsapp-logo" height="18" src="https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c543.png" style="border-radius:3px;display:block;" width="18">
//                                   </a>
//                                 </td>
//                               </tr>
//                             </table>
//                           </td>
//                         </tr>
//                       </table>
//                       <!--[if mso | IE]>
//               </td>
            
//               <td>
//             <![endif]-->
//                       <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
//                         <tr>
//                           <td style="padding:4px;">
//                             <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:18px;">
//                               <tr>
//                                 <td style="font-size:0;height:18px;vertical-align:middle;width:18px;">
//                                   <a href="#" target="_blank" style="color: #00AD55;">
//                                     <img alt="linkedin-logo" height="18" src="https://cdn-icons-png.flaticon.com/512/174/174857.png" style="border-radius:3px;display:block;" width="18">
//                                   </a>
//                                 </td>
//                               </tr>
//                             </table>
//                           </td>
//                         </tr>
//                       </table>
//                       <!--[if mso | IE]>
//               </td>
            
//               <td>
//             <![endif]-->
//                       <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
//                         <tr>
//                           <td style="padding:4px;">
//                             <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:18px;">
//                               <tr>
//                                 <td style="font-size:0;height:18px;vertical-align:middle;width:18px;">
//                                   <a href="#" target="_blank" style="color: #00AD55;">
//                                     <img alt="youtube-logo" height="18" src="https://i.pinimg.com/originals/09/f4/72/09f4726125ab5fa8cbcf754b9ba07e7c.jpg" style="border-radius:3px;display:block;" width="18">
//                                   </a>
//                                 </td>
//                               </tr>
//                             </table>
//                           </td>
//                         </tr>
//                       </table>
//                       <!--[if mso | IE]>
//               </td>
            
//               <td>
//             <![endif]-->
//                       <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
//                         <tr>
//                           <td style="padding:4px;">
//                             <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:18px;">
//                               <tr>
//                                 <td style="font-size:0;height:18px;vertical-align:middle;width:18px;">
//                                   <a href="#" target="_blank" style="color: #00AD55;">
//                                     <img alt="insta-logo" height="18" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/640px-Instagram_icon.png" style="border-radius:3px;display:block;" width="18">
//                                   </a>
//                                 </td>
//                               </tr>
//                             </table>
//                           </td>
//                         </tr>
//                       </table>
//                       <!--[if mso | IE]>
//               </td>
            
//           </tr>
//         </table>
//       <![endif]-->
//                     </td>
//                   </tr>
//                   <tr>
//                     <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
//                     </td>
//                   </tr>
//                 </table>
//               </div>
//               <!--[if mso | IE]>
//             </td>
          
//         </tr>
      
//                   </table>
//                 <![endif]-->
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//     <!--[if mso | IE]>
//           </td>
//         </tr>
//       </table>
      
//       <table
//          align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
//       >
//         <tr>
//           <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
//       <![endif]-->
//     <div style="margin:0px auto;max-width:600px;">
//       <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
//         <tbody>
//           <tr>
//             <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
//               <!--[if mso | IE]>
//                   <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                
//         <tr>
      
//             <td
//                class="" style="vertical-align:top;width:600px;"
//             >
//           <![endif]-->
//               <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
//                 <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
//                   <tr>
//                     <td style="font-size:0px;word-break:break-word;">
//                       <!--[if mso | IE]>
    
//         <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td height="1" style="vertical-align:top;height:1px;">
      
//     <![endif]-->
//                       <div style="height:1px;"> &nbsp; </div>
//                       <!--[if mso | IE]>
    
//         </td></tr></table>
      
//     <![endif]-->
//                     </td>
//                   </tr>
//                 </table>
//               </div>
//               <!--[if mso | IE]>
//             </td>
          
//         </tr>
      
//                   </table>
//                 <![endif]-->
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//     <!--[if mso | IE]>
//           </td>
//         </tr>
//       </table>
//       <![endif]-->
//   </div>
// </body>

// </html>