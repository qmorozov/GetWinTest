import { http } from './http-common';

class CreateService {
  createUser(email: string, password: string, ref: string) {
    return http.post('/v2.0/profile/profileCreate/', {
      email,
      password,
      ref,
    });
  }

  login(email: string, password: string) {
    return http.post('/v2.0/profile/loginUser/', {
      email,
      password,
    });
  }
}

export default new CreateService();
