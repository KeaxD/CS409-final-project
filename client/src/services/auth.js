import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  static signup(user) {
    return new Promise((resolve, reject) => {
      axios
        .post(API_URL + "/signup", {
          email: user.email,
          password: user.password,
        })
        .then((res) => {
          console.log("Service returned successfully");
          resolve(res.data.user);
        })
        .catch((err) => {
          console.log("Service failed");
          reject(err);
        });
    });
  }
}

export default AuthService;
