
import axios from "axios";
import dotenv from "dotenv";

dotenv.config({
  path: '.dev.vars'
})


// Cria a instância do Axios
const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 35000,
  withCredentials: true,
});

// Interceptor para adicionar os headers dinâmicos antes de cada requisição
// api.interceptors.request.use(
//   async (config) => {
//     try {
//       const formData = new FormData();
//       if (typeof window !== "undefined") {
//         formData.append("referer", window.location.href);
//         formData.append("origin", window.location.origin);
//       }

//       const hash = await generateHash(formData) as { timestamp: string, hash: string };

//       config.headers["x-timestamp"] = hash.timestamp;
//       config.headers["x-signature"] = hash.hash;
//     } catch (error) {
//       console.error("⚠️ Erro ao gerar assinatura:", error);
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default api;
