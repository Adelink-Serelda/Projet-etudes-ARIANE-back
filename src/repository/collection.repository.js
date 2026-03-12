import { sequelize } from "../config/database.js";

export async function getUserCollectionByMangaSQL(userId) {
  console.log("call procédure stockée getCollec", userId);
  return sequelize.query("CALL getUserCollection(:userId)", {
    replacements: { userId },
  });
}
export async function countUserTomesCollectionSQL(userId) {
  return sequelize.query("CALL countUserTomesCollection(:userId)", {
    replacements: { userId },
  });
}
export async function countUserSeriesCollectionSQL(userId) {
  return sequelize.query("CALL countUserSeriesCollection(:userId)", {
    replacements: { userId },
  });
}
