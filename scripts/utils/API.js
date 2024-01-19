export default class API {
  static async getData (URL) {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('erreur lors de la récupération des donnés', error);
      throw error;
    }
  }
}
