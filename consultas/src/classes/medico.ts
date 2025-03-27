export interface medicoData {
  id: number;
  nome: string;
  especialidade: string;
  imagem: string;
  crm: string;
  telefone: string;
  email: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  clinica: string;
  horario: string;
  sobre: string;
}

export class Medico {
  id: number;
  nome: string;
  especialidade: string;
  imagem: string;
  crm: string;
  telefone: string;
  email: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  clinica: string;
  horario: string;
  sobre: string

  constructor(medicoData: medicoData) {
    this.id = medicoData.id;
    this.nome = medicoData.nome;
    this.especialidade = medicoData.especialidade;
    this.imagem = medicoData.imagem;
    this.crm = medicoData.crm;
    this.telefone = medicoData.telefone;
    this.email = medicoData.email;
    this.endereco = medicoData.endereco;
    this.cidade = medicoData.cidade;
    this.estado = medicoData.estado;
    this.cep = medicoData.cep;
    this.clinica = medicoData.clinica;
    this.horario = medicoData.horario;
    this.sobre = medicoData.sobre;
  }
}