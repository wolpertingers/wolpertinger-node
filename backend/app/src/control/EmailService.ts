import { Order } from "../entity/Order";
import fs = require("fs");
import nodemailer = require("nodemailer");
import { String } from "typescript-string-operations";
import { ImageReference } from "@/entity/ImageReference";

export default function sendEmail(order: Order) {
  const username: string = process.env.EMAIL_USERNAME;
  fs.readFile(__dirname + "/email.html", (err, data) => {
    if (err) {
      throw err;
    }
    const imageNames: string[] = getImageNames(order.images);
    const email: string = String.Format(
      data.toString(),
      order.orderer,
      order.token.value,
      order.url,
      imageNames[0],
      imageNames[1],
      imageNames[2],
      imageNames[3],
      imageNames[4],
      imageNames[5]
    );
    nodemailer.createTestAccount(() => {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: username,
          pass: process.env.EMAIL_PASSWORD
        }
      });
      let mailOptions = {
        from: `"Wolpertinger Support" <${username}@gmail.com>`,
        to: process.env.EMAIL_RECIPIENTS,
        subject: `New order from ${order.orderer} (${order.token.value})`,
        html: email
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          throw error;
        }
        console.log(
          `Sent mail for Order from ${order.orderer} (${order.token.value}).`
        );
      });
    });
  });
}

/**
 * Get image names sorted by level.
 */
function getImageNames(references: ImageReference[]): string[] {
  let names: string[] = new Array(references.length).fill("");
  references.forEach(reference => {
    names[reference.level - 1] = reference.image.name;
  });
  return names;
}
