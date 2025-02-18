export default class AppError extends Error {
  public readonly statusCode: number;

  // O construtor agora chama o construtor da classe `Error`
  constructor(message: string, statusCode: number = 400) {
    super(message);  // Chama o construtor da classe `Error`
    this.statusCode = statusCode;

    // Define o nome da classe como nome do erro
    this.name = this.constructor.name;

    // Captura o stack trace para facilitar a depuração
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
