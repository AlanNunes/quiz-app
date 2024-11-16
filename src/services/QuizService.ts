import { Answer, Question } from "../models/Question";

export class QuizService {
    static GetNextQuestion(seen_questions: number[]): Question {
        let questions = this.GetAllQuestions();
        let available = questions.filter(q => !seen_questions.includes(q.id));
    
        return available[Math.floor(Math.random() * available.length)];
    }
    
    static ConfirmAnswer(question: Question, answer_id: number): number{
        let answered = question.answers.find(a => a.id == answer_id);
        if (answered?.isCorrect){
            return 100;
        }
        return 0;
    }
    
    static GetAllQuestions(): Question[] {
      let questions: Question[] = [
        new Question(1, "O que é um banco de dados em memória?", [
          new Answer(1, "Um banco de dados que armazena dados no HD"),
          new Answer(2, "SQL Server pode ser considerável um BD em memória"),
          new Answer(
            3,
            "É um banco de dados que tem seu armazenamento principal na Memória RAM",
            true
          ),
          new Answer(
            4,
            "É um banco de dados lento, por utilizar principalmente a Memória RAM"
          ),
        ]),
        new Question(2, "O que é um banco de dados relacional?", [
          new Answer(
            1,
            "Um banco de dados que utiliza tabelas para representar e armazenar dados",
            true
          ),
          new Answer(2, "Um banco de dados que armazena dados em grafos"),
          new Answer(3, "Um banco de dados que armazena dados em documentos JSON"),
          new Answer(4, "Um banco de dados que armazena dados em memória cache"),
        ]),
        new Question(
          3,
          "Qual a linguagem de consulta padrão para bancos de dados relacionais?",
          [
            new Answer(1, "JavaScript"),
            new Answer(2, "Python"),
            new Answer(3, "SQL", true),
            new Answer(4, "HTML"),
          ]
        ),
        new Question(4, "O que é normalização de banco de dados?", [
          new Answer(1, "Processo de reduzir a redundância de dados", true),
          new Answer(2, "Processo de replicar dados em múltiplos servidores"),
          new Answer(3, "Processo de criar backups de dados"),
          new Answer(4, "Processo de criptografar dados"),
        ]),
        new Question(5, "O que é uma chave primária em um banco de dados?", [
          new Answer(
            1,
            "Um campo que identifica de forma única um registro na tabela",
            true
          ),
          new Answer(2, "Um campo que pode ter valores repetidos"),
          new Answer(3, "Um campo que armazena valores únicos em toda a base"),
          new Answer(4, "Um campo que armazena chaves estrangeiras"),
        ]),
        new Question(6, "Qual o papel de um SGBD?", [
          new Answer(1, "Gerenciar e manipular banco de dados", true),
          new Answer(2, "Criar interfaces de usuário"),
          new Answer(3, "Desenvolver aplicações de software"),
          new Answer(4, "Manter servidores web"),
        ]),
        new Question(7, "O que é um banco de dados NoSQL?", [
          new Answer(1, "Um banco de dados não relacional", true),
          new Answer(2, "Um banco de dados que só armazena dados em memória"),
          new Answer(3, "Um banco de dados que só pode ser consultado com SQL"),
          new Answer(4, "Um banco de dados que armazena dados em planilhas"),
        ]),
        new Question(8, "O que significa ACID em bancos de dados?", [
          new Answer(
            1,
            "Atomicidade, Consistência, Isolamento, Durabilidade",
            true
          ),
          new Answer(2, "Automaticidade, Controle, Isolamento, Durabilidade"),
          new Answer(3, "Atomicidade, Consistência, Integração, Durabilidade"),
          new Answer(4, "Assincronia, Consistência, Isolamento, Durabilidade"),
        ]),
        new Question(9, "O que é uma chave estrangeira?", [
          new Answer(
            1,
            "Um campo que cria um relacionamento entre duas tabelas",
            true
          ),
          new Answer(2, "Um campo que armazena senhas de usuários"),
          new Answer(3, "Um campo que pode armazenar valores nulos"),
          new Answer(4, "Um campo usado para indexação de dados"),
        ]),
        new Question(10, "O que é um índice em um banco de dados?", [
          new Answer(
            1,
            "Uma estrutura que melhora a velocidade de recuperação de dados",
            true
          ),
          new Answer(2, "Um campo que armazena apenas valores únicos"),
          new Answer(3, "Uma função que ordena dados de uma tabela"),
          new Answer(4, "Um processo de backup de dados"),
        ]),
      ];
    
      return questions;
    }
}
