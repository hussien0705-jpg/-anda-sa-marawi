export type Category = 
  | 'lahat'
  | 'pagkain'
  | 'damit'
  | 'motor'
  | 'groseriya'
  | 'serbisyo'
  | 'iba_pa';

export interface Store {
  id: string;
  name: string;
  sells: string; // What they sell / paninda
  barangay: string;
  category: Category;
  landmark?: string;
  contactNumber?: string;
  openingHours?: string;
  isHalalCertified?: boolean;
  isMuslimOwned?: boolean;
  notes?: string;
  createdAt: number;
  isCustom?: boolean; // added by user
}

export type SortOption = 'bago' | 'pangalan-az' | 'barangay';
