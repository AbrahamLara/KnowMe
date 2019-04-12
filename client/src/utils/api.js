const api = 'http://localhost:3001';

const headers = {
  'Accept': 'application/json',
}

export const get = () =>
  fetch(`${api}`, { headers })
    .then(res => res.text())
    .then(data => ({ data }))
    .catch(err => ({ err }));