export function ValidaDebito(
  // Parametros para adicionar comportamento de Decorators:
  target: any, // Receber objeto com método decorado.
  propertyKey: string, // NomeDoMétodo.
  //   ------------------
  descriptor: PropertyDescriptor // Método Original.
) {
  // Guardar uma referência do método original recebido:
  const metodoOriginal = descriptor.value;

  // Substituir o método original por uma nova função:
  descriptor.value = function (valorDoDebito: number) {
    // lógica de validação (nesse caso, sendo para Validação do Débito)
    if (valorDoDebito <= 0) {
      throw new Error("O valor a ser debitado precisa ser maior que zero!");
    }
    if (valorDoDebito > this.saldo) {
      throw new Error("Saldo insuficiente para realizar a operação!");
    }

    // Retorna o descriptor modificado:
    return metodoOriginal.apply(this, [valorDoDebito]);
  };

  return descriptor;
}

// Repetição da mesma estrutura para validar o Deposito:
export function ValidaDeposito(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const metodoOriginal = descriptor.value;

  descriptor.value = function (valorDoDeposito: number) {
    if (valorDoDeposito <= 0) {
      throw new Error("O valor do deposito deve ser maior que zero!");
    }

    return metodoOriginal.apply(this, [valorDoDeposito]);
  };

  return descriptor;
}
