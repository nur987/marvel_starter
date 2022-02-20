class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  // ЗДЕСЬ БУДЕТ ВАШ КЛЮЧ, ЭТОТ КЛЮЧ МОЖЕТ НЕ РАБОТАТЬ
  _apiKey = "apikey=41bc8770879260e8249c7742266e3e96";

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = async () => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
    );
    // get all superHero
    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    );
    // get one superHero
    return this._transformCharacter(res.data.results[0]);
  };

  // thumbnail- we'll get path with extension
  _transformCharacter = (char) => {
    return {
      name: char.name,
      ////!if not decription in the api(data) we will show not have description
      description: char.description
        ? `${char.description.slice(0, 210)}...`
        : "There is no description for this character",

      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
    };
  };
}

export default MarvelService;
