export class ApiPaths {
  public static BASE_URL = 'http://localhost:8080/api/v1';

  public static readonly auth = {
    login: `${this.BASE_URL}/auth`,
  };

  public static readonly users = {
    list: `${this.BASE_URL}/usuarios`,
    details: (userId: number) => `/api/v1/usuarios/${userId}`,
  };
}
