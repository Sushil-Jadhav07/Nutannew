import { request } from "./request";

export const initRequest = () => {
  request.interceptors.request.use(
    function (config) {
      config.headers["Content-Type"] = "application/json";

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  request.interceptors.response.use(
    function (response) {
      return response.data;
    },
    async function (error) {
      console.log("error", error);
      // timeout
      if (error.code === "ECONNABORTED") {
        // ....
        return;
      }

      const status = error.response.status;

      // token expired
      if (status === 401) {
        try {
          const response = await request("/api/user/refresh-token", {
            data: {
              refresh_token: window.localStorage.getItem("refresh_token"),
            },
          });
          const access_token = response.data.access_token;
          window.localStorage.setItem("access_token", access_token);
          request.defaults.headers["x-auth-token"] = access_token;

          return request(error.config);
        } catch (err: any) {
          return Promise.reject(err.response?.data);
        }
      }

      // errors
      switch (status) {
        case 400: {
          // ....
          break;
        }
        case 503: {
          // ....
          break;
        }
        default: {
          // ...
          break;
        }
      }

      return Promise.reject(error.response.data);
    }
  );
};
