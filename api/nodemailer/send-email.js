var nodemailer = require('nodemailer');

module.exports.send_email = function(userEmail, time){
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jemik243patel@gmail.com',
        pass: '********'
    }
    });

    var mailOptions = {
    from: 'jemik243patel@gmail.com',
    to: `${userEmail}`,
    subject: 'Sending email using nodemailer',
    text: `Hello sending this from nodemailer
                "To kaisea hai aap? 
                
                Your appointment is confirmed at ${time} `
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });
}
