import type { EventInvitation } from "$lib/models/event.model";
import type { User } from "$lib/models/user.model";

const fakeUser: User = {
     id: 'user-1',
     email: 'alice@example.com',
     firstname: 'Alice',
     lastname: 'Smith',
};

const fakeOrganizer: User = {
     id: 'fakeOrganizer',
     email: 'bob@example.com',
     firstname: 'Bob',
     lastname: 'Johnson',
};

const fakeEventDetail = {
     id: 'event-1',
     name: 'Birthday Party',
     description: 'A fun birthday celebration.',
     address: '123 Main St, Cityville',
     date: new Date('2024-07-01'),
     userId: fakeOrganizer.id,
     createdAt: new Date('2024-06-01'),
     updatedAt: new Date('2024-06-10'),
     user: fakeOrganizer,
     time: '18:00',
     idDriver: 'fakeEventInvit',
};

export const fakeEventInvitations: EventInvitation[] = [
     {
          id: 'invite-1',
          id_event: fakeEventDetail.id,
          id_user: fakeUser.id,
          id_organizer: fakeOrganizer.id,
          idOrganizer: fakeOrganizer,
          event: fakeEventDetail,
     }
];