const sharp = require("sharp");

const convertToWebp = async (files) => {
  if (files.image.length > 1) {
    const images = files.image;
    const filenames = await Promise.all(
      images.map(async (image) => {
        const filename = Date.now();

        await sharp(image.data)
          .webp()
          .toFile("uploads/" + filename + ".webp");

        return filename + ".webp";
      })
    );

    return filenames;
  }

  const filename = Date.now();

  await sharp(files.image.data)
    .webp()
    .toFile("uploads/" + filename + ".webp");

  return filename + ".webp";
};

module.exports = convertToWebp;
