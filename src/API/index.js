class Helper {
  static baseURL() {
    return "https://api.foursquare.com/v2/";
  }

  static auth() {
    const keys = {
      client_id: 'WDOAKYNGA1IJ0U3CUWLEVMRGN4EEONVBW1FI5OXJM331F45H',
      client_secret: 'VNNDYQSU1KMHKTQPKZ2NZZIBDCPKTV4NTXKMHLHBUAXASXDF',
      v: '20181010'
    };

    return Object.keys(keys)
      .map(key => `${key}=${keys[key]}`)
      .join("&")
  }

  static urlBuilder(urlParams){
    if(!urlParams){
      return ''
    }
    return Object.keys(urlParams)
      .map(key => `${key}=${urlParams[key]}`)
      .join("&")
  }

  static headers() {
    return {
      Accept: "application/json"
    };
  }

  static simpleFetch(endpoint, method, urlParams) {
    let requestData = {
      method,
      headers: Helper.headers()
    };

    return fetch(
      `${Helper.baseURL()}${endpoint}?${Helper.auth()}&${Helper.urlBuilder(
        urlParams
      )}`,
      requestData
      ).then(res => res.json());
  }
}

export default class SquareAPI {
  static search(urlParams) {
  return Helper.simpleFetch("/venues/search", "GET", urlParams);
}

static getVenueDetails(VENUE_ID) {
  return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET");
}

static getVenuePhotos(VENUE_ID) {
  return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");
  }
}