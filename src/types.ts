export interface Photo {
  id: number;
  title: string;
  url: string;
  category: string;
  description: string;
  traits: string[];
  favoriteSnack: string;
  funQuirk: string;
  energyLevel?: string;
  lifespan?: string;
}

export interface DogOfTheMonth {
  name: string;
  breed: string;
  age: string;
  month: string;
  badge: string;
  url: string;
  bio: string;
  favSnack: string;
  superpower: string;
  bestTrick: string;
  relatedDogId?: number;
}

export interface FunFact {
  id: number;
  fact: string;
  category: string;
  icon?: string;
}

export interface CareTip {
  id: number;
  title: string;
  category: string;
  tip: string;
  badge: string;
}

export interface DogQuote {
  id: number;
  quote: string;
  author: string;
}

