export interface BringItem {
     id: string;
     eventId: string;
     name: string;
     requestedQuantity: number;
     takenQuantity?: number;
     isTaken: boolean;
     createdAt: string;
     createdById: string;
     takenAt?: string;
     takers: BringItemTake[];
}

export interface BringItemTake {
     id: string;
     bringItemId: string;
     userId: string;
     user: {
          id: string;
          email: string;
          firstname: string;
          lastname: string;
     };
     quantity: number;
     createdAt: string;
}
