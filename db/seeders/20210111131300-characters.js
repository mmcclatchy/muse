'use strict';


class Character {
  constructor(imgUrl, bio) {
    this.imageUrl = imgUrl;
    this.bio = bio;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Characters', [
      new Character('https://app-muse.s3.amazonaws.com/1611193193501character_img_1.jpg', `He's humble, daring, affectionate and perhaps a little too facetious. Which isn't out of the ordinary for someone with his position.`),
      new Character("https://app-muse.s3.amazonaws.com/1611202202832character_img_2.jpg", "Delphia can be naively annoying at times, but someone would be hard pressed to find a loyal and reliable friend."),
      new Character(`https://app-muse.s3.amazonaws.com/1611202226940character_img_3.jpg`, `The local muscle. His only loyalties are to the highest bidder.`),
      new Character(`https://app-muse.s3.amazonaws.com/1611197543738character_img_4.jpg`, `Everyone she's around loves her, despite the constant trouble she stirs up in the area`),
      new Character(`https://app-muse.s3.amazonaws.com/1611197613449character_img_5.jpg`, `She broke her order's code by taking a criminal's life. Now she wonders city to city, doing her best to live up to her ideals... all while she's being hunted by her former order`),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Characters', null, {});
  }
};
