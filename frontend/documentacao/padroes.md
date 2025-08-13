# Padrões e Princípios de Projeto - Adote Fácil

## 1. Princípios SOLID

### Single Responsibility

Cada classe/módulo deve ter **uma única responsabilidade**.

No `src/controllers/petController.ts`, o controller apenas lida com **requisições e respostas HTTP**, delegando a lógica ao `petService`.

```ts
// src/controllers/petController.ts
export async function createPet(req: Request, res: Response) {
  const pet = await petService.create(req.body);
  res.status(201).json(pet);
}

O controller não implementa regras de negócio nem acessa banco diretamente — cumpre apenas o papel de intermediário HTTP.

### Open Closed
O código deve estar aberto para extensão e fechado para modificação.

No src/services/petService.ts, é possível adicionar novas regras de criação sem modificar métodos existentes, apenas estendendo funções.

// src/services/petService.ts
export async function create(data: PetData) {
  return prisma.pet.create({ data });
}

Podemos criar novas funções, como createWithOwner(), sem alterar a implementação original de create().

### Liskov Substitution
Subclasses devem poder substituir suas superclasses sem quebrar o sistema.

Embora o projeto use mais funções do que classes, o uso de interfaces no TypeScript permite a substituição de implementações.

// src/interfaces/PetRepository.ts
export interface PetRepository {
  create(data: PetData): Promise<Pet>;
}

Qualquer implementação de PetRepository (Prisma, memória, API externa) pode ser usada sem alterar quem consome a interface.

### Interface Segregation
As interfaces devem ser específicas e não forçar a implementação de métodos desnecessários.

No projeto, interfaces como PetData e UserData são focadas apenas nos campos relevantes.

// src/interfaces/PetData.ts
export interface PetData {
  name: string;
  age: number;
  species: string;
}

Não há campos ou métodos obrigatórios que não façam sentido para o contexto do pet.

### Dependency Inversion
Depender de abstrações e não de implementações concretas.

Os services dependem de prisma (que pode ser substituído por outro repositório) sem conhecer detalhes de sua implementação.

// src/services/petService.ts
import { prisma } from '../lib/prisma';

Bastaria injetar outro repositório que siga o mesmo contrato para mudar a fonte de dados.

## 2. Padrões de Projeto

### Repository Pattern
Utilizado para encapsular o acesso ao banco de dados via Prisma, isolando a lógica de persistência.

Exemplo:

// backend/src/repositories/PetRepository.js
class PetRepository {
  async findAll() {
    return prisma.pet.findMany();
  }
}
Este padrão melhora a manutenibilidade e permite trocar a tecnologia de banco sem alterar a lógica de negócio.

Os services centralizam a lógica de negócio, deixando os controllers mais enxutos.

Exemplo:

// backend/src/services/AdocaoService.js
class AdocaoService {
  async adotarPet(petId, usuarioId) {
    // lógica de negócio
    return adocaoRepository.create({ petId, usuarioId });
  }
}
Este padrão facilita a reutilização e testes unitários.

### Factory Method
Poderia ser usado para criar instâncias de modelos ou serviços de forma flexível, evitando new espalhado no código.

Exemplo:

class PetFactory {
  static criarPet(data) {
    return {
      ...data,
      status: 'disponível',
      criadoEm: new Date()
    };
  }
}

