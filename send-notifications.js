const axios = require("axios");
const nodeMailer = require('nodemailer');
const striptags = require('striptags');
const moment = require('moment');
const API_KEY = '';
const DOMAIN = 'notifyke.kebs.org';
const mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : '5433',
    user : 'notifyke_auth',
    password : 'lmGxa1',
    database : 'notifykeauth'
  }
});

const url = "http://notifyke.kebs.org:8000/api/notifications/all";

let id = null;

let emailheader = '<table width="100%" style="border-spacing:0px">';
 emailheader += '<tbody>';
 emailheader += '<tr>';
 emailheader += '<th bgcolor="#B9202C">';
 emailheader += '<font color="white">Notifying Member(s)</font>';
 emailheader += '</th>';
 emailheader += '<th bgcolor="#E5594F">';
 emailheader += '<font color="white">Symbol, title and description of content</font>';
 emailheader += '</th>';
 emailheader += '<th bgcolor="#F5C53E">';
 emailheader += '<font color="white">Products</font>';
 emailheader += '</th>';
 emailheader += '<th bgcolor="#99C8CA">';
 emailheader += '<font color="white">Issue date</font>';
 emailheader += '</th>';
 emailheader += '<th bgcolor="#319FA2">';
 emailheader += '<font color="white">Comment deadline</font>';
 emailheader += '</th>';
 emailheader += '<th bgcolor="#DEB887">';
 emailheader += '<font color="white">links</font>'
 emailheader += '</th>';
 emailheader += '</tr>';

const getData = async url => {
  try {
    const response = await axios.get(url);
    notifications = response.data;
    notifications.map((values,i)=>{
    	recipient = notifications[i].send_email;
    	user_id = notifications[i].id;
    	name = recipient.substring(0, recipient.lastIndexOf("@"));
    	documents = notifications[i].notification.document;
    	let emailbody = `<p>Dear ${name},</p><p>You are receiving this email because you have subscribed to receive TBT Notifications `;
    	emailbody += 'from NotifyKenya TBT.</p>';
    	emailbody += emailheader;
    	documents.map((values,i)=>{
    		let hs_product = '';
    		let ics_product = '';
    		let full_text = '';
    		let covered_products = '';
    		notifying_member = documents[i].notifying_member;
    		notified_document_title = striptags(documents[i].notified_document_details.notified_document_title);
    		document_symbol = documents[i].document_symbol;
    		if (covered_products)
    			covered_products = documents[i].covered_products;
    		if (documents[i].products)
    			hs_product = '<strong>HS Product:</strong>&nbsp;' + documents[i].products.product.code + ' ' + documents[i].products.product.name + '<br /><br /> ';
    		if (documents[i].ics_products)
    			ics_product = '<strong>ICS Product:</strong>&nbsp;' + documents[i].ics_products.ics.code + ' ' + documents[i].ics_products.ics.name;
    		date_of_distribution = new Date(documents[i].date_of_distribution);
    		finaldate_for_comment = new Date(documents[i].finaldate_for_comment);
    		document_link_en = documents[i].document_online_links.url[0];
            document_link_fr = documents[i].document_online_links.url[1];
            document_link_es = documents[i].document_online_links.url[2];
            if (document_link_en !=null){ 
                english_document_link = document_link_en[Object.keys(document_link_en)[0]];
            } else {
                english_document_link = 'Download link not available';
            }
            if (document_link_fr !=null){
    		  french_document_link = document_link_fr[Object.keys(document_link_fr)[0]];
            } else {
             french_document_link = 'Download link not available';
            }
            if (document_link_es !=null){
    		  spanish_document_link = document_link_es[Object.keys(document_link_es)[0]];
            } else {
                spanish_document_link = 'Download link not available';
            }
    		emailbody += '<tr bgcolor="FFFFFF">';
    		emailbody +=  '<td width="10%" style="border:1px solid;word-wrap:break-word" align="center">';
    		emailbody += `${notifying_member}`;
    		emailbody += '</td>';
    		emailbody += '<td width="40%" style="border:1px solid; padding: 10px">';
    		emailbody += `${document_symbol} <br /> ${notified_document_title} <br />${covered_products}`;
    		emailbody += '</td>';
    		emailbody += '<td width="20%" style="border:1px solid; padding: 10px">';
    		emailbody +=`${hs_product} ${ics_product}`;
    		emailbody += '</td>';
    		emailbody += '<td width="10%" style="border:1px solid; padding: 10px" align="right">';
    		emailbody +=`${moment(date_of_distribution).format("DD/MM/YYYY")}`;
    		emailbody += '</td>';
    		emailbody += '<td width="10%" style="border:1px solid; padding: 10px" align="right">';
    		emailbody +=`${moment(finaldate_for_comment).format("DD/MM/YYYY")}`;
    		emailbody += '</td>';
    		emailbody += '<td width="10%" style="border:1px solid; padding: 10px" align="center">';
    		emailbody += `<a href="${english_document_link}">EN</a>&nbsp;`;
    		emailbody += `<a href="${french_document_link}">FR</a>&nbsp;`;
    		emailbody += `<a href="${spanish_document_link}">ES</a>&nbsp;`;
    		emailbody += '</td>';
    		emailbody += '</tr>';
    	});
    	emailbody += '</table>'
    	emailbody += '<p>To comment and/or get further details on the above notifications, login into <a href="http://notifyke.kebs.org/login">notifyke.kebs.org/login</a> then go to "My Notifications".</p>';
		emailbody += '<p>To change your preferences on the type of notifications you receive, or stop receiving them, please login in and go to "prefereces tab"  under "My Profile" tab and make the neccesary changes</p>';
    	emailbody += '<hr />';
    	emailbody += 'National Enquiry Point,<br />';
    	emailbody += 'Kenya Bureau of Standards,<br />'
		emailbody += 'Popo Road, Off Mombasa Road,<br />'
		emailbody += 'P.O. Box 54974 - 00200, Nairobi, Kenya. <br />'
		emailbody += 'Tel : + 254 (20) 694 8000 <br />'
		emailbody += 'Mobile : 0722 202 137 or 0734 600 471/2 <br />'
		emailbody += 'PVOC : 0724 255 242 <br />'
		emailbody += 'Email: wto.nep@kebs.org'

    	sendMail(emailbody,recipient,user_id);
    });
  } catch (error) {
    console.log(error);
  }
  
};

const sendMail = function(emailbody,recipient, user_id){
    const id = user_id;

    const data = {
      from: 'National Enquiry Point - Kenya <wto@notifyke.kebs.org>',
      to: recipient,
      subject: 'Hello',
      text: `${emailbody}`, // plain text body
      html: `${emailbody}` // html body
    };

    mailgun.messages().send(data, (error, body) => {
      if (error) {
            console.error(error);
            knex('profiles_usernotification')
            .where({ id: id })
            .update({ read_notification: 'e' })
        } else {
            knex('profiles_usernotification')
            .where({ id: id })
            .update({ read_notification: 'y' });
        }
   });
}

getData(url);
 
