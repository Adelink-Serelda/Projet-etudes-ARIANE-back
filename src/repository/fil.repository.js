import { sequelize } from "../config/database.js";

export async function getUserPALByMangaSQL(userId) {
  return sequelize.query("CALL getUserPAL(:userId)", {
    replacements: { userId },
  });
}

export async function countUserTomesPALSQL(userId) {
  return sequelize.query("CALL countUserTomesPAL(:userId)", {
    replacements: { userId },
  });
}

export async function countUserSeriesPALSQL(userId) {
  return sequelize.query("CALL countUserSeriesPAL(:userId)", {
    replacements: { userId },
  });
}
