const nodemailer = require('nodemailer')
let smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
})

const sendMail = (to, from, filename, filesize, filetype, downloadLink) => {
    var mailOptions = {
        from,
        to,
        subject: `Dowload Link From FileShare App`,
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ShareFile App Email Service</title>
        <style>
                h2,h3 {
                    text-align:center;
                    color:green;
                }
                span{
                    font:normal 1rem Roboto;
                    color:darkgrey;
                    text-decoration:underline;
                }
                a:hover:focus:active {
                    color:white;
                    background:green;
                    transform:scale(1.1);
                }
                p{
                    color:teal;
                }
            </style>
        </head>
        <body>
            <div style=" 
                    width:80vw;
                    height:80vh;
                    color:darkgrey;
                    border-radius:1rem;
                    padding:2rem;
                    text-align:center">
                    <h2>Hello, from fileshare</h2>
                    <h3>Here is the File Details-</h3>
            <div style=" border-radius:0.5rem;
                    box-shadow:0px 0px 10px 1px #ccc;
                    background:#fce7;
                    width:fit-content;
                    height:fit-content;
                    padding:0.5rem;
                    flex-wrap:wrap;">
            <span>Name :<h5 style="color:tomato;">${filename}</h5></span>
            <span>Type :<h5 style="color:tomato;">${filetype}</h5></span>
            <span>Size :<h5 style="color:tomato;">${filesize}</h5></span>
            </div>
            <a href=${downloadLink} style="color:teal;padding:1rem;margin:1rem;background:lightgrey;border-radius:0.4rem;border:1px solid #333;text-align:center;display:block">Go to Download page</a>
            </div>
        </body>
        </html>
        
       `,
    }
    smtpTransport.sendMail(mailOptions, (err, info) => {
        if (err) throw new Error('Could not Send Email')
    })
}
module.exports = sendMail
