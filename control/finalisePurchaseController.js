const Item = require("../utils/items");
const nodeMailer = require('nodemailer');
const Pass = require("../utils/databasePass");
const User = require("../utils/user");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


module.exports = async(req,res) =>
{
    await Item.findById(req.params._id, async (err,item) =>
    {
      if(err)
        return res.send(err);
    
      if(item.amount == req.body.amount)
        Item.update({_id : req.params._id}, {$set: {availability: false }});

      Item.update({_id : req.params._id}, {$inc: {amount : (-1 * req.body.amount)}});   
    
      await User.find({username : item.publisher}, (err, user) =>
      { 
        let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'zemedeliePernik@gmail.com',
                pass: Pass.emailPass,
            }
        });
        var mailOptions = {
            to: user[0].email,
            subject: 'Направена е нова поръчка',
            html: `<h3>Поръчка от ${req.body.name}</h3>
                   <h5>Продукт: ${item.productType}</h5>
                   <h5>Aдрес: ${req.body.address}</h5>
                   <h5>Телефон: ${req.body.phone}</h5>
                   <h5>Количество: ${req.body.amount} кг.</h5>
                   <h5>Крайна цена: ${req.body.amount * item.price} лв.</h5
        `};
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });

        mailOptions = {
            to: req.body.email,
            subject: 'Обобщение на вашата поръчка',
            html: `<h3>Поръчка от ${req.body.name}</h3>
                <h5>Продукт: ${item.productType}</h5>
                <h5>Aдрес: ${req.body.address}</h5>
                <h5>Телефон: ${req.body.phone}</h5>
                <h5>Количество: ${req.body.amount}</h5>
                <h5>Крайна цена: ${req.body.amount * item.price}</h5
        `};
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });        
    res.end();
    })});
  
}