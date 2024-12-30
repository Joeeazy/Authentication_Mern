import {MailtrapClient} from "mailtrap"
import dotenv from "dotenv"

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN
const ENDPOINT = process.env.MAILTRAP_ENDPOINT

const client = new MailtrapClient({ token: TOKEN, endpoint: ENDPOINT});

const sender = {
  email: "hello@demomailtrap.com",
  name: "Mwangi",
};

const recipients = [
  {
    email: "joseph@roadrimz.com",
  }
];

client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);


// const sender = {
//   email: "hello@demomailtrap.com",
//   name: "Mailtrap Test",
// };
// const recipients = [
//   {
//     email: "joeeazy34@gmail.com",
//   }
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);