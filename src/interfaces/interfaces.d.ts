interface Circles {
  circles: Circle[];
}

interface Circle {
  id: string;
  color: string;
  name: string;
  memberCount: string;
  createdAt: string,
  members: Member[] | null;
}

interface Member {
  firstName: string;
  lastName: string;
  location: Location;
  avatar: string;
}

interface Location {
  latitude: string;
  longitude: string;
  name: string | null;
  address1: string;
  address2: string;
  speed: number;
  isDriving: string;
  battery: string;
  charge: string;
}
