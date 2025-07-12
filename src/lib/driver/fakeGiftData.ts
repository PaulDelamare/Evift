import type { Gift, List } from "$lib/models/gift.model";
import type { User } from "$lib/models/user.model";

const fakeUsers: User[] = [
     {
          id: "fakeuuid1",
          email: 'alice@example.com',
          firstname: 'Alice',
          lastname: 'Wonderland',
     },
     {
          id: "fakeuuid2",
          email: 'bob@example.com',
          firstname: 'Bob',
          lastname: 'Smith',
     },
];

export const fakeGifts: Gift[] = [
     {
          id: "fakeuuid3",
          id_list: "fakeuuid6",
          id_user: "fakeuuid1",
          taken: false,
          id_userTaken: null,
          name: "Wireless Headphones",
          quantity: 1,
          url: "https://example.com/wireless-headphones",
          createdAt: new Date("2024-05-01T10:10:00Z"),
          updatedAt: new Date("2024-06-01T12:10:00Z"),
     },
     {
          id: "fakeuuid4",
          id_list: "fakeuuid6",
          id_user: "fakeuuid1",
          taken: true,
          id_userTaken: "fakeuuid2",
          name: "Coffee Mug",
          quantity: 2,
          url: "https://example.com/coffee-mug",
          createdAt: new Date("2024-05-01T10:20:00Z"),
          updatedAt: new Date("2024-06-01T12:20:00Z"),
     },
     {
          id: "fakeuuid5",
          id_list: "fakeuuid7",
          id_user: "fakeuuid2",
          taken: false,
          id_userTaken: null,
          name: "Bluetooth Speaker",
          quantity: 1,
          url: "https://example.com/bluetooth-speaker",
          createdAt: new Date("2024-05-15T09:40:00Z"),
          updatedAt: new Date("2024-06-02T14:40:00Z"),
     },
];

export const fakeLists: List[] = [
     {
          id: "fakelist",
          name: 'Birthday Gifts',
          id_user: fakeUsers[0].id,
          createdAt: new Date('2024-05-01T10:00:00Z'),
          updatedAt: new Date('2024-06-01T12:00:00Z'),
          gifts: [fakeGifts[0], fakeGifts[1]],
          user: fakeUsers[0],
     }
];