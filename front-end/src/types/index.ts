export interface GetAllEntriesResponse {
  results: number;
  page: number;
  data: Entry[];
  totalPages: number;
}

export interface Entry {
  _id: string;
  title: string;
  type: "movie" | "tv_show";
  director: string;
  budget: string;
  location: string;
  duration: string;
  year: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
