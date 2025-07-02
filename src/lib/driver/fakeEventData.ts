import type { Event } from "$lib/models/event.model";

export const fakeUserEventRelation = {
     id: 'uer_12345',
     id_event: 'evt_67890',
     id_role: 'role_admin',
     id_user: 'usr_54321',
     idDriver: 'fakeevent',
     createdAt: new Date('2025-06-01T10:00:00Z'),
     updatedAt: new Date('2025-06-02T15:30:00Z'),
     user: {
          id: 'usr_54321',
          firstname: 'Jean',
          lastname: 'Dupont',
          email: 'jean.dupont@example.com',
          createdAt: new Date('2024-01-10T08:20:00Z'),
          updatedAt: new Date('2024-12-05T12:45:00Z')
     },
     event: {
          id: 'evt_67890',
          idDriver: 'fakeevent',
          name: 'Anniversaire de Jean',
          description: 'Une fête d\'anniversaire pour célébrer Jean.',
          address: 'Av. Gustave Eiffel, 75007 Paris',
          date: new Date('2025-07-15T09:00:00Z'),
          img: '',
          userId: 'usr_54321',
          createdAt: new Date('2024-11-20T14:00:00Z'),
          updatedAt: new Date('2025-05-30T11:15:00Z'),
          user: {
               id: 'usr_54321',
               firstname: 'Son',
               lastname: 'Goku',
               email: 'jean.dupont@example.com',
               createdAt: new Date('2024-01-10T08:20:00Z'),
               updatedAt: new Date('2024-12-05T12:45:00Z')
          },
          time: '09:00'
     } 
} as unknown as Event;