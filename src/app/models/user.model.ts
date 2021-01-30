// ?-------------------------------------------------------------------------
export interface User {
  id: number;
  name: string;
  picture: string;
}

// ?-------------------------------------------------------------------------
export function userComparator(u1: User, u2: User): number {
  const diff = u1.id - u2.id;
  // prettier-ignore
  return (diff > 0) ? 1 : ((diff < 0) ? -1 : 0);
}
