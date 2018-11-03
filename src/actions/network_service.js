import config from 'react-native-config';

class NetworkService {
  createUser(data) {
    const url = `${config.API_URL}/users`;
    return this.postFetch(url, data);
  }

  loginUser(data) {
    const url = `${config.API_URL}/users/login`;
    return this.postFetch(url, data);
  }

  getEvents(day) {
    const url = `${config.API_URL}/events?day=${day}`;
    return this.getFetch(url);
  }

  async postFetch(url, data) {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(data),
    });
    if (response.ok) return response.json();
    throw new Error(response.status);
  }

  async getFetch(url) {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'get',
    });
    if (response.ok) return response.json();
    throw new Error(response.status);
  }
}

export default new NetworkService();
