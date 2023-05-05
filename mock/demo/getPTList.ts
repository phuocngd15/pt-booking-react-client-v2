import type { MockMethod, Recordable } from 'vite-plugin-mock';

interface DataType {
  key: string;
  personId: string;
  fullName: string;
  phone: string;
  birthDay: number;
  address: string;
  email: string;
  rate: number;
  certificate?: string[];
  skills?: string[];
}
function genID(length: number) {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
}
//personId: `${genID(13).toString()}`,

function generateRandomSkills(): string[] {
  const skills = [
    'Strength',
    'Yoga',
    'Functional',
    'Pilates',
    'Weight loss',
    'Dancing',
    'Nutrutiology',
    'Stretching',
    'Cardio',
    'Running',
  ];
  const randomSkills = [];

  while (randomSkills.length < 3) {
    const randomIndex = Math.floor(Math.random() * skills.length);
    const randomSkill = skills[randomIndex];

    if (!randomSkills.includes(randomSkill)) {
      randomSkills.push(randomSkill);
    }
  }

  return randomSkills;
}

function generateData(count: number): DataType[] {
  const data: DataType[] = [];

  for (let i = 0; i < count; i++) {
    const item: DataType = {
      key: `key_${genID(13).toString()}`,
      personId: `personId_${genID(13).toString()}`,
      fullName: `Full Name ${i}`,
      phone: `+1-555-555-${i}`,
      birthDay: Math.floor(Math.random() * 31) + 1,
      address: `Address ${i}`,
      email: `email_${i}@example.com`,
      rate: Math.floor(Math.random() * 5) + 1,
      certificate: [`Certificate ${i}_1`, `Certificate ${i}_2`],
      skills: generateRandomSkills(),
    };

    data.push(item);
  }

  return data;
}
export default [
  {
    url: '/mock_api/getTrainers/detail',
    timeout: 1000,
    method: 'get',
    response: ({ body }: { body: Recordable }) => {
      const { username, password } = body;
      console.log(username);
      console.log(password);
      return {
        data: generateData(1)[0],
        code: 1,
        message: 'ok',
      };
    },
  },
  {
    url: '/mock_api/getTrainers',
    timeout: 1000,
    method: 'get',
    response: ({ body }: { body: Recordable }) => {
      const { groupName, username, password } = body;
      console.log('username password groupName', username, password, groupName);
      if (groupName) {
        return generateData(10);
      }
      return generateData(100);
    },
  },
] as MockMethod[];
