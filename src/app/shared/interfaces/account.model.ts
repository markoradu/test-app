export interface IAccount {
  id?: number;
  login?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  activated?: boolean;
  langKey?: string;
  createdBy?: string;
  createdDate?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  dateOfBirth?: string;
  discordId?: string;
  authorities?: string[];
  favoriteTournaments?: string[];
  subscription?: boolean;
  genderName?: string;
  timeZone?: string;
  currency?: number;
  bio?: string;
  phone?: string;
  source?: string;
  coverPosition?: string;
  coverImageUrl?: string;
  imageUrl?: string;
  locked?: boolean;
  friendStatus?: string;
}
