import request = require("request");
import { JSDOM } from "jsdom";
import { Image } from "../entity/Image";
import { Repository, getRepository } from "typeorm";

const imageUrl: string = process.env.IMAGE_SERVER_URL;

function loadImages() {
  request(
    imageUrl,
    {
      timeout: 3000
    },
    (error, response, body) => {
      if (error) {
        console.log(error);
        return;
      }
      const root = new JSDOM(body).window.document;
      root.querySelectorAll("li a").forEach(element => {
        if (element.hasAttribute("href")) {
          if (element.innerHTML.includes("Parent Directory")) {
            return;
          }
          var subUrl = element.getAttribute("href");
          var imageName = subUrl.replace("/", "").replace("%20", " ");
          console.log("Found image: " + imageName);
          createImage(imageUrl + subUrl, imageName);
        }
      });
    }
  );
}

/**
 * Create a new image.
 * @param url Url to the image folder
 * @param name Name of the image
 */
async function createImage(url: string, name: string) {
  await request(
    url,
    {
      timeout: 3000
    },
    (error, response, body) => {
      if (error) {
        console.log(error);
        return;
      }
      let image: Image = new Image();
      image.name = name;
      const root = new JSDOM(body).window.document;
      root.querySelectorAll("li a").forEach(element => {
        var href = element.getAttribute("href");
        var fullUrl = getUrl(url + href);
        if (href.startsWith("high")) {
          image.high = fullUrl;
        } else if (href.startsWith("medium")) {
          image.medium = fullUrl;
        } else if (href.startsWith("low")) {
          image.low = fullUrl;
        }
      });
      getRepository(Image)
        .save(image)
        .catch(error => console.log(error));
    }
  );
}

/**
 * Creates an accessible URL:
 * - replaces 'wolpertinger-apache' with 'localhost' so it can be accessed by the frontend
 * - replaces '%20' with Space
 */
function getUrl(url: string): string {
  return url.replace("wolpertinger-apache", "localhost").replace("%20", " ");
}

export default {
  loadImages
};
