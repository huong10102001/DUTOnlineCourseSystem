// import { create } from 'apisauce';
	
// const request = create({
//   baseURL: 'http://5c2eb79a2fffe80014bd696b.mockapi.io/api/v1',
// });

// function login(username, password) {
//   console.log(`Request: ${username} ${password}`);
//   return request
//     .post('/sign_in')
//     .then(response => {
//       console.log('Request response', response);
//       return {
//         access_token: response.data.access_token,
//         refresh_token: response.data.refresh_token,
//       };
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

// export default {
//   login,
// };