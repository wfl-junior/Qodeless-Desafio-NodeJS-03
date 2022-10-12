/**
 * Required External Modules
 */

import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { ask } from "./ask";
import { extractNumberFromString } from "./extractNumberFromString";

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Server Activation
 */

interface Student {
  name: string;
  grade: number;
}

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);

  // CÓDIGO PARA ATENDER OS REQUERIMENTOS
  // R01, R02, R03, R04, R05

  // Imprimir mensagem perguntando quantidade de alunos
  // Ler e armazenar informação
  const studentCount = Math.floor(
    extractNumberFromString(await ask("Qual é a quantidade de alunos? ")),
  );

  if (studentCount <= 0) {
    return console.log("Sem alunos? Ok :(");
  }

  // Imprimir mensagem perguntando nome e nota de cada aluno
  const students: Student[] = [];

  for (let index = 0; index < studentCount; index++) {
    const iteration = index + 1;
    const name = await ask(`Qual é o nome do(a) aluno(a) ${iteration}? `);
    const grade = extractNumberFromString(
      await ask(`Qual é a nota do(a) aluno(a) ${name}? `),
    );

    students.push({
      name,
      grade,
    });
  }

  // Imprimir o aluno com a maior nota
  const highestGradeStudent = students.reduce<Student>(
    (currentStudent, student) => {
      if (student.grade > currentStudent.grade) {
        return student;
      }

      return currentStudent;
    },
    students[0],
  );

  console.log(
    `O aluno com a maior nota é ${highestGradeStudent.name}, com a nota de ${highestGradeStudent.grade}`,
  );
});
