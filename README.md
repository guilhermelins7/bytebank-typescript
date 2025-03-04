<div align="center"><img src="./dist/images/typescriptx.png" width="90%"></div>

# Introdução ao TypeScript:

TypeScript é um superset do JavaScript que adiciona tipagem estática e outros recursos avançados para facilitar o desenvolvimento seguro e escalável. Ele permite detectar erros em tempo de desenvolvimento, melhora a legibilidade do código e oferece suporte a recursos modernos da linguagem.

## Declaração de Tipos em TypeScript:

### Tipos Primitivos

TypeScript oferece os mesmos tipos primitivos do JavaScript, mas com tipagem explícita.

```tsx
let numero: number = 10;
let nome: string = "Exemplo";
let booleano: boolean = true;

// O tipo 'any' desativa a verificação de tipo:
let qualquer: any = "texto";
qualquer = 22; // permitido, mas não recomendado
```

### Conversão de Tipos

Para manipular elementos do DOM, a conversão de tipo (`as`) pode ser usada para evitar erros:

```tsx
const inputData = document.querySelector("#data") as HTMLInputElement;
```

---

### Arrays e Tipos Personalizados

### Arrays

Os arrays em TypeScript precisam ter um tipo definido.

```tsx
let listaNumerica: number[] = [];
listaNumerica.push(10, 23.2);
// listaNumerica.push("texto"); ❌ Erro, pois o array aceita apenas números
```

### Tipos Personalizados (Type Alias)

Permitem criar tipos reutilizáveis para melhor organização do código.

```tsx
type Transacao = {
  tipoTransacao: string;
  data: Date;
  valor: number;
};

const novaTransacao: Transacao = {
  tipoTransacao: "Depósito",
  data: new Date(),
  valor: 1000,
};
```

---

### Enumerações (`enum`)

`enum` define um conjunto fixo de valores possíveis para evitar erros com strings soltas.

```tsx
enum TipoTransacao {
  DEPOSITO = "Depósito",
  TRANSFERENCIA = "Transferência",
  PAGAMENTO_BOLETO = "Pagamento de Boleto",
}

type Transacao = {
  tipoTransacao: TipoTransacao;
  data: Date;
  valor: number;
};

const novaTransacao: Transacao = {
  tipoTransacao: TipoTransacao.DEPOSITO, // Garantia de um valor válido
  data: new Date(),
  valor: 500,
};
```

# Ajustando Data e Valor para Padrão Local (pt-BR)

Em aplicações que lidam com valores monetários e datas, é essencial exibi-los no formato correto para melhorar a experiência do usuário. O TypeScript permite a formatação de valores usando os métodos `.toLocaleString()` e `.toLocaleDateString()`.

---

### Formatação de Valores Monetários

O método `.toLocaleString()` pode ser utilizado para exibir valores numéricos no formato de moeda local:

```tsx
if (elementoSaldo != null)
  elementoSaldo.textContent = saldo.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL", // Define a moeda como Real brasileiro
  });
```

**Explicação:**

- `"pt-br"` → Define o idioma e a formatação para português do Brasil.
- `style: "currency"` → Indica que queremos formatar o número como moeda.
- `currency: "BRL"` → Define a moeda como Real (R$).

**Exemplo de saída:** `R$ 1.500,75`

---

### Formatação de Datas

O método `.toLocaleDateString()` formata objetos `Date` de acordo com a localidade escolhida:

```tsx
if (elementoDataAcesso != null) {
  const dataAcesso: Date = new Date();
  elementoDataAcesso.textContent = dataAcesso.toLocaleDateString("pt-br", {
    weekday: "long", // Nome completo do dia da semana
    day: "2-digit", // Dois dígitos para o dia
    month: "2-digit", // Dois dígitos para o mês
    year: "numeric", // Ano com quatro dígitos
  });
}
```

🔹 **Explicação:**

- `"pt-br"` → Formata a data para o padrão brasileiro.
- `weekday: "long"` → Retorna o nome completo do dia da semana (ex: "segunda-feira").
- `day: "2-digit"` → Exibe o dia com dois dígitos (ex: `05`).
- `month: "2-digit"` → Exibe o mês com dois dígitos (ex: `09`).
- `year: "numeric"` → Exibe o ano com quatro dígitos (ex: `2025`).

**Exemplo de saída:** `"segunda-feira, 05/09/2025"`

---

# Configurando `tsconfig.json`

O arquivo `tsconfig.json` é a configuração principal de um projeto TypeScript, permitindo definir como o código será compilado para JavaScript. Ele garante que o projeto siga padrões consistentes e melhora a compatibilidade com diferentes ambientes.

---

### Configurações Principais

```json
{
  "compilerOptions": {
    "target": "ES2022", // Define a versão do JavaScript gerado
    "outDir": "./dist/js", // Diretório onde os arquivos compilados serão armazenados
    "noEmitOnError": true // Impede a geração de arquivos caso haja erros na compilação
  },
  "include": ["./src/**/*"] // Define quais arquivos TypeScript serão compilados
}
```

**Explicação:**

- `"target": "ES2022"` → O TypeScript converterá o código para JavaScript compatível com a versão ES2022.
- `"outDir": "./dist/js"` → O JavaScript gerado será salvo na pasta `dist/js`.
- `"noEmitOnError": true` → Evita a geração de arquivos se houver erros na compilação.
- `"include": ["./src/**/*"]` → Compila todos os arquivos `.ts` dentro da pasta `src`.

---

## Monitorando Alterações com `tsc --watch`

Para evitar a necessidade de compilar manualmente sempre que o código for alterado, podemos ativar o **modo de observação**:

```bash
tsc --watch
```

Ou simplesmente:

```bash
tsc -w
```

**O que acontece?**

- O TypeScript entrará em modo de **watch**, compilando automaticamente qualquer mudança nos arquivos `.ts`.
- Útil para desenvolvimento contínuo, evitando recopilações manuais.

# Modularização ES6 em TypeScript

A modularização no ES6 permite organizar melhor o código, dividindo funcionalidades em arquivos separados. No TypeScript, podemos usar **export** e **import** para estruturar nossos projetos de forma eficiente.

---

## Exportando e Importando Módulos:

Em um projeto modular, cada funcionalidade específica pode ser separada em arquivos diferentes e importada apenas onde for necessária.

### Importando Módulos no `App.ts`

O arquivo principal do projeto (`App.ts`) pode importar os componentes necessários:

```tsx
import "./components/nova-transacao-component.js";
import "./components/saldo-component.js";
```

No HTML, apenas o arquivo `app.js` gerado pela compilação será referenciado:

```html
<script type="module" src="js/app.js" defer></script>
```

---

## Exportando Funções:

Funções reutilizáveis podem ser exportadas de um módulo para serem utilizadas em outros arquivos:

```tsx
export function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}

export function formatarData(data: Date): string {
  return data.toLocaleDateString("pt-br", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
```

**Para utilizar essas funções em outro arquivo:**

```tsx
import { formatarMoeda, formatarData } from "./utils/formatacao.js";

console.log(formatarMoeda(1000)); // Exibe: R$ 1.000,00
console.log(formatarData(new Date())); // Exibe: 27/02/2025
```

---

## Exportação Padrão (`export default`):

Quando um módulo tem um objeto principal, é comum exportá-lo como `default`. Isso facilita sua importação e indica que ele representa a funcionalidade principal do módulo.

**Criando um módulo `Conta.ts`:**

```tsx
import { Transacao } from "./Transacao.js";
import { TipoTransacao } from "./TipoTransacao.js";

const Conta = {
  saldo: 1000,
  depositar(valor: number) {
    this.saldo += valor;
  },
  sacar(valor: number) {
    this.saldo -= valor;
  },
};

export default Conta;
```

**Importando o módulo com `export default`:**

```tsx
import Conta from "../types/Conta.js";

Conta.depositar(500);
console.log(Conta.saldo); // Exibe: 1500
```

---

## Diferença entre `export default` e `export` comum

- **`export default`** → Apenas um item pode ser exportado por padrão no módulo.
- **`export` comum** → Permite exportar múltiplos elementos, exigindo chaves `{}` na importação.

---

## Organização dos Arquivos:

```bash
/src
│── /components
│   ├── nova-transacao-component.ts
│   ├── saldo-component.ts
│── /types
│   ├── Transacao.ts
│   ├── TipoTransacao.ts
│   ├── Conta.ts
│── /utils
│   ├── formatacao.ts
│── app.ts
```

Esse modelo modular torna o código mais organizado, reutilizável e fácil de manter.

# Lançamento e Captura de Erros (`try-catch`) em TypeScript:

O bloco `try-catch` permite tratar erros de forma controlada, evitando que o sistema quebre inesperadamente. No projeto, esse mecanismo é usado dentro do módulo `Conta.ts` para garantir que operações inválidas sejam detectadas e tratadas corretamente.

---

## Lançando Erros (`throw`)

A função `throw` permite interromper a execução do código e emitir um erro personalizado. No exemplo abaixo, ao tentar debitar um valor inválido ou superior ao saldo disponível, um erro será lançado:

**Exemplo em `Conta.ts`:**

```tsx
class Conta {
  private saldo: number = 1000;

  debitar(valor: number): void {
    if (valor <= 0) {
      throw new Error("O valor a ser debitado deve ser maior que zero.");
    }

    if (valor > this.saldo) {
      throw new Error("Saldo insuficiente.");
    }

    this.saldo -= valor;
  }

  depositar(valor: number): void {
    if (valor <= 0) {
      throw new Error("O valor a ser depositado deve ser maior que zero.");
    }

    this.saldo += valor;
  }

  getSaldo(): number {
    return this.saldo;
  }
}

export default new Conta();
```

---

## Capturando Erros (`try-catch`)

Para evitar que o sistema falhe, utilizamos `try-catch` ao chamar as funções de `Conta.ts`, capturando qualquer erro lançado e exibindo uma mensagem ao usuário.

**Exemplo no componente `nova-transacao-component.ts`:**

```tsx
elementoFormulario.addEventListener("submit", (event) => {
  event.preventDefault(); // Evita recarregar a página

  try {
    const valorTransacao = parseFloat(inputValor.value);

    Conta.debitar(valorTransacao);

    alert("Transação realizada com sucesso!");
  } catch (erro) {
    alert(erro.message); // Exibe a mensagem do erro capturado
  }
});
```

---

# Trabalhando com armazenamento em LocalStorage:

O **Application Local Storage**, ou simplesmente **Local Storage**, é um mecanismo de armazenamento no navegador que permite guardar dados de forma persistente, sem expiração automática, mesmo após o usuário fechar a aba ou o navegador.

```tsx
// capturando dados do local storage:
const transacoes: Transacao[] =
  JSON.parse(
    localStorage.getItem("transacoes"),
    (key: string, value: string) => {
      if (key === "data") {
        return new Date(value);
      }

      return value;
    }
  ) || [];

let saldo: number = JSON.parse(localStorage.getItem("saldo")) || 0;

//  Adicionando item no localstorage:
localStorage.setItem("transacoes", JSON.stringify(transacoes));
localStorage.setItem("saldo", saldo.toString());
```

## JSON.parse e JSON.stringify: serialização e deserialização JSON:

Em TypeScript, frequentemente trabalhamos com dados em formato JSON, especialmente ao fazer requisições a APIs ou ao manipular dados localmente, como no `localStorage`.

### **JSON.stringify():**

O método `JSON.stringify()` é usado para **serializar** um objeto JavaScript em uma string JSON. Isso é útil quando precisamos enviar dados em formato JSON para servidores ou armazená-los localmente.

```tsx
// Utilizando no Método statico:salvar para armazenamento em LocalStorage:

static salvar(chave: string, valor: any): void {
  const valorComoString = JSON.stringify(valor);
  localStorage.setItem(chave, valorComoString);
}
```

### **JSON.parse():**

O método `JSON.parse()` é usado para **deserializar** uma string JSON em um objeto JavaScript. Ele converte uma representação textual de um objeto ou array em uma estrutura de dados utilizável.

```tsx
// Recuperando e convertendo transações do localStorage

static obter<T>(
    chave: string,
    reviver?: (this: any, key: string, value: any) => any
  ): T | null {
    const valor = localStorage.getItem(chave);

    if (valor === null) {
      return null;
    }

    if (reviver) {
      return JSON.parse(valor, reviver) as T;
    }
    return JSON.parse(valor) as T;
  }
```

# TypeScript: Orientação a Objetos:

## Encapsulamento em TypeScript:

O encapsulamento em TypeScript é garantido pelos modificadores de acesso:

- **public**: Padrão, permite acesso de qualquer lugar.
- **private**: Restringe o acesso apenas à própria classe.
- **protected**: Permite acesso na própria classe e subclasses, mas não fora delas.

---

## Métodos estáticos

Métodos estáticos podem ser chamados sem instanciar a classe, úteis para funções utilitárias.

### Exemplo no ByteBank:

```tsx
export class Armazenador {
  private constructor() {}

  static salvar(chave: string, valor: any): void {
    localStorage.setItem(chave, JSON.stringify(valor));
  }

  static obter<T>(
    chave: string,
    reviver?: (this: any, key: string, value: any) => any
  ): T | null {
    const valor = localStorage.getItem(chave);
    return valor ? (JSON.parse(valor, reviver) as T) : null;
  }
}
```

---

## Tipos genéricos em TypeScript

Generics permitem criar código reutilizável e seguro, adaptável a diferentes tipos de dados. São declarados com `<T>` e podem ser restringidos com `extends`.

### Exemplo:

```tsx
interface Produto {
interface Produto {
	nome: string; preco: number; quantidade: number;
}

function calcularValorTotal<T>(produtos: T[]): number {
	let valorTotal = 0;
	for (let x = 0; x < produtos.length; x++) {
		valorTotal += produtos[x].preco * produtos[x].quantidade;
	}
	return valorTotal;
}
```

### Uso no ByteBank:

```tsx
// Na classe Armazenador, dfinimos o seguinte método estático:

static obter<Tipo>(
  chave: string,
  reviver?: (this: any, key: string, value: any) => any
): Tipo {
  const valor = localStorage.getItem(chave);

  if (valor === null) {
    return null;
  }

  if (reviver) {
    return JSON.parse(valor, reviver) as Tipo;
  }

  return JSON.parse(valor) as Tipo;
}

/*
Já na conta, onde utilizamos o método estático, definimos qual o tipo
que deve ser retornado.
*/

protected saldo: number = Armazenador.obter<number>("saldo") || 0;
private transacoes: Transacao[] = Armazenador.obter<Transacao[]>(
  "transacoes",
  (key, value: any) => {
    if (key === "data") {
      return new Date(value);
    }
  }
);
```

Generics são muito úteis para criar funções e classes mais genéricas e reutilizáveis, sem perder a segurança e a precisão dos tipos. Alternativa para quando se parece necessário o uso do “any”.

---

## Classe `Armazenador`:

### **Objetivo:**

Gerenciar o armazenamento de dados no `localStorage`, garantindo tipagem segura com generics.

### **Exemplo de uso:**

```tsx
// Classe para lindar com armazenamento no LocalStorage
export class Armazenador {
  private constructor() {}

  // Converter o valor para JSON e salvar no localStorage usando a chave fornecida.
  static salvar(chave: string, valor: any): void {
    const valorComoString = JSON.stringify(valor);
    localStorage.setItem(chave, valorComoString);
  }

  // Recuperar o valor do localStorage pela chave fornecida:
  static obter<Tipo>(
    chaveDoItem: string,
    reviver?: (this: any, key: string, value: any) => any
  ): Tipo {
    // Buscar o valor armazenado:
    const valor = localStorage.getItem(chaveDoItem);

    if (valor === null) {
      return null;
    }

    if (reviver) {
      return JSON.parse(valor, reviver) as Tipo;
    }

    return JSON.parse(valor) as Tipo;
  }
}
```

# Herança em TypeScript:

Herança é um princípio da programação orientada a objetos que permite que uma classe filha herde as propriedades e os métodos de uma classe pai, sem precisar redefinir as funções. Em Typescript, usamos a palavra-chave `extends` para indicar que uma classe é derivada de outra. A classe filha pode sobrescrever os métodos da classe pai se precisar de uma lógica diferente, ou adicionar novos métodos se precisar de mais funcionalidades. A classe filha também pode acessar o construtor ou métodos da classe pai usando a função `super`.

### Exemplo da implementação que utilizamos no ByteBank:

```tsx
export class ContaPremium extends Conta {
  // Declarando classe herdada.
  registrarTransacao(transacao: Transacao): void {
    if (transacao.tipoTransacao === TipoTransacao.DEPOSITO) {
      console.log("ganhou um bônus de 0.50 centavos.");
      transacao.valor += 0.5;
    }

    super.registrarTransacao(transacao); // Chamar método da classe Pai.
  }
}
```

## Utilizando Decorators para validações com TypeScript:

- **Decorators** são funções aplicadas a classes, métodos, propriedades ou parâmetros para modificar seu comportamento. São executados em **tempo de execução** e usados para **validações, logs, autenticação, entre outros**.
- Devem ser habilitados no **tsconfig.json** (`"experimentalDecorators": true`).
- A sintaxe usa `@NomeDoDecorator` antes da definição do método.

### Exemplo no ByteBank:

```tsx
// type/Decorators.ts

import SaldoComponent from "../components/saldo-component";
import { Armazenador } from "./Armazenador";

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
  const MetodoOriginal = descriptor.value;

  descriptor.value = function (valorDoDeposito: number) {
    if (valorDoDeposito <= 0) {
      throw new Error("O valor do deposito deve ser maior que zero!");
    }

    return MetodoOriginal.apply(this, [valorDoDeposito]);
  };

  return descriptor;
}
```

### Aplicação dos Decorators:

```tsx
// types/Conta.ts

// Importando os Decorators:
import { ValidaDebito, ValidaDeposito } from "./Decorators.js";

	// Aplicar o decorator "ValidaDebito" ao método "debitar":
  @ValidaDebito
  protected debitar(valor: number): void {
    this.saldo -= valor;
    Armazenador.salvar("saldo", this.saldo.toString());
  }

	// Aplicar o decorator "ValidaDeposito" ao método "depositar":
  @ValidaDeposito
  protected depositar(valor: number): void {
    this.saldo += valor;
    Armazenador.salvar("saldo", this.saldo.toString());
  }
```

### Habilitando uso do Decorators:

Para habilitar o uso do Decorators, é necessário fazer uma modificação no arquivo `tsconfig.ts`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "outDir": "./dist/js/",
    "noEmitOnError": true,
    "experimentalDecorators": true // adicionar essa opção.
  },
  "include": ["./src/**/*"]
}
```
