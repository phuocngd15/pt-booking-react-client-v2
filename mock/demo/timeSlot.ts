import type { MockMethod } from 'vite-plugin-mock';

interface TimeSlots {
  id: string;
  key: string;
  start_time: string;
  end_time: string;
  status: string;
  description: string;
  classes: ClassRome[];
}

interface Trainer {
  id: string;
  key: string;
  name: string;
  phone: string;
}

interface Location {
  id: string;
  key: string;
  name: string;
  address: string;
}

interface ClassRome {
  id: string;
  key: string;
  name: string;
  description: string;
  max_students: number;
  price: number;
  trainer: Trainer;
  location: Location;
}

function generateTrainingSessions(times): TimeSlots[] {
  const sessions = [];
  const classes: ClassRome[] = [
    {
      id: 'abf84t1',
      key: 'abf84t1',
      name: 'Cardio Blast',
      description: 'A high-intensity cardio workout',
      max_students: 10,
      price: 15,
      trainer: {
        id: 'pfd35e8',
        key: 'pfd35e8',
        name: 'John Doe',
        phone: '123-456-7890',
      },
      location: {
        id: 'lmn64y3',
        key: 'lmn64y3',
        name: 'Fitness Center',
        address: '123 Main Street',
      },
    },
  ];

  for (let i = 0; i < times.length; i++) {
    const start = new Date(times[i].start_time);
    const end = new Date(times[i].end_time);

    while (start < end) {
      const session: TimeSlots = {
        id: uuidv4(),
        key: uuidv4(),
        start_time: start.toISOString(),
        end_time: new Date(start.getTime() + 60 * 60 * 1000).toISOString(),
        description: 'Morning cardio workout',
        status: 'available',
        classes: classes,
      };
      sessions.push(session);
      start.setMinutes(start.getMinutes() + 30);
    }
  }

  return sessions;
}

// Helper function to generate unique IDs
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default [
  {
    url: '/mock_api/getTimeSlots/detail',
    timeout: 1000,
    method: 'get',
    response: ({ body }: { body: Recordable }) => {
      const { username, password } = body;
      console.log(username);
      console.log(password);
      return {
        data: generateTrainingSessions(1)[0],
        code: 1,
        message: 'ok',
      };
    },
  },
  {
    url: '/mock_api/getTimeSlots',
    timeout: 1000,
    method: 'get',
    response: () => {
      return generateTrainingSessions([
        { start_time: '2023-04-01T09:00:00', end_time: '2023-04-01T10:00:00' },
        { start_time: '2023-04-02T11:00:00', end_time: '2023-04-02T12:00:00' },
      ]);
    },
  },
] as MockMethod[];
