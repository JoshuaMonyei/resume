const nodemailer = require('nodemailer');

// contact form
exports.submit = async (req, res) => {
    // destructuring user details from req body
    const {name, email, message} = req.body;
    let errors = [];
    // check required fields
    if (!name || !email || !message) {
        errors.push({msg: "Please fill all required fields"});
    }
    if (errors.length > 0) {
        res.render('landing', {
            errors,
            name,
            email,
            message
        });

    }else {
        // SMTP transporter for nodemailer 
        const transporter = nodemailer.createTransport({
            service: "hotmail", // hostname
            auth: {
                user: process.env.MAIL,
                pass: process.env.MAILPASSWORD
            },
        })
        // Mail structure and contents.
        const mailOptions = {
            from: process.env.MAIL,
            to: process.env.MAIL,
            subject: "Resume - contact form",
            text: `
            Message from: ${name}
            Email: ${email}
            Text: ${message}`,

            html: `
            <h2>Message from: ${name}</h2>
            <P>Email: ${email}</P>
            <P>Message: ${message}</p> `
        }
        // Send mail to receiever
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                errors.push({ msg: 'Error with mail, please try again' });
                res.render('landing', {
                  errors,
                  name,
                  email,
                  message
                });
            } else{
                req.flash('success_msg', "Thanks for contacting me. I'll get back to you shortly.");
                return res.redirect('/');
            }    
        });
        

    }
}