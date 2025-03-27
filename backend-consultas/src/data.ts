import { randomBytes, pbkdf2Sync } from 'crypto';
import { CreateScheduleDto } from './schedule/dto/CreateScheduleDto';
import { CreateReviewDto } from './review/dto/CreateReviewDto';
import { CreateDoctorDto } from './doctor/dto/CreateDoctorDto';
import { CreateUserDto } from './user/dto/CreateUserDto';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateCPF(): string {
  const n1 = getRandomInt(0, 9);
  const n2 = getRandomInt(0, 9);
  const n3 = getRandomInt(0, 9);
  const n4 = getRandomInt(0, 9);
  const n5 = getRandomInt(0, 9);
  const n6 = getRandomInt(0, 9);
  const n7 = getRandomInt(0, 9);
  const n8 = getRandomInt(0, 9);
  const n9 = getRandomInt(0, 9);

  return `${n1}${n2}${n3}.${n4}${n5}${n6}.${n7}${n8}${n9}-${getRandomInt(0, 9)}${getRandomInt(0, 9)}`;
}

function generateCRM(): string {
  return `${getRandomInt(10000, 99999)}/${['SP', 'RJ', 'MG', 'BA', 'RS'][getRandomInt(0, 4)]}`;
}

function generatePhone(): string {
  return `(${getRandomInt(10, 99)}) ${getRandomInt(90000, 99999)}-${getRandomInt(1000, 9999)}`;
}

// Generate 50 users
export const users: CreateUserDto[] = Array.from({ length: 50 }, (_, i) => ({
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  cpf: generateCPF(),
  phone: generatePhone(),
  password: 'password123',
}));

// Generate 50 doctors
const specialties = [
  'Cardiologia',
  'Dermatologia',
  'Neurologia',
  'Pediatria',
  'Ortopedia',
  'Ginecologia',
  'Urologia',
  'Psiquiatria',
  'Oftalmologia',
  'Otorrinolaringologia',
];

const clinics = [
  'Hospital São Lucas',
  'Clínica Saúde',
  'Instituto do Coração',
  'Centro Médico Paulista',
  'Hospital Sírio-Libanês',
  'Hospital Albert Einstein',
  'Hospital Santa Catarina',
  'Clínica Medicina Avançada',
  'Centro de Saúde Vida',
  'Hospital das Clínicas',
];

export const doctors: CreateDoctorDto[] = Array.from({ length: 50 }, (_, i) => ({
  name: `Dr. ${['Maria', 'João', 'Ana', 'Carlos', 'Paulo', 'Mariana', 'Rafael', 'Fernanda', 'Ricardo', 'Juliana'][i % 10]} ${['Silva', 'Santos', 'Oliveira', 'Souza', 'Lima', 'Costa', 'Pereira', 'Rodrigues', 'Almeida', 'Ferreira'][getRandomInt(0, 9)]}`,
  crm: generateCRM(),
  phone: generatePhone(),
  email: `doctor${i + 1}@example.com`,
  clinica: clinics[i % clinics.length],
  especialidade: specialties[i % specialties.length],
  sobre: `Médico especialista em ${specialties[i % specialties.length]} com mais de ${getRandomInt(5, 20)} anos de experiência.`,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

// Generate 10 reviews for each doctor (500 total)
export const reviews: CreateReviewDto[] = [];

doctors.forEach((doctor) => {
  for (let i = 0; i < 10; i++) {
    reviews.push({
      doctorId: getRandomInt(1, 50), // Random doctor from the 50 doctors
      userId: getRandomInt(1, 50), // Random user from the 50 users
      rating: getRandomInt(3, 5), // Most reviews are positive (3-5 stars)
      comment: [
        'Excelente atendimento, muito atencioso.',
        'Médico muito competente, recomendo.',
        'Ótimo profissional, me ajudou bastante.',
        'Atendimento rápido e eficiente.',
        'Muito dedicado e atencioso com os pacientes.',
        'Explicou tudo detalhadamente, muito bom.',
        'Diagnóstico preciso e tratamento eficaz.',
        'Profissional muito humano e acolhedor.',
        'Clínica bem organizada e médico pontual.',
        'Fiquei muito satisfeito com a consulta.',
      ][i],
    });
  }
});

// Generate 10 schedule slots per day for 20 days for each doctor (10,000 total)
export const schedules: CreateScheduleDto[] = [];

const hours = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
];
const today = new Date();

doctors.forEach((doctor) => {
  for (let day = 0; day < 20; day++) {
    // Cria uma nova data baseada em hoje e adiciona o número de dias
    const scheduleDate = new Date();
    scheduleDate.setDate(today.getDate() + day);

    // Formata a data para o formato dd/mm/aaaa
    const formattedDate = `${String(scheduleDate.getDate()).padStart(2, '0')}/${String(
      scheduleDate.getMonth() + 1,
    ).padStart(2, '0')}/${scheduleDate.getFullYear()}`;

    for (const hour of hours) {
      // 30% of slots are already booked
      const isBooked = Math.random() < 0.3;
      schedules.push({
        doctorId: getRandomInt(1, 50), // Random doctor from the 50 doctors
        userId: isBooked ? getRandomInt(1, 50) : null, // If booked, assign to random user
        day: formattedDate,
        hour,
      });
    }
  }
});

// Export counts for verification
export const counts = {
  users: users.length,
  doctors: doctors.length,
  reviews: reviews.length,
  schedules: schedules.length,
  bookedSchedules: schedules.filter((s) => s.userId !== null).length,
};
