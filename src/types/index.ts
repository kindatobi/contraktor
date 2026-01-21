export type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  completedDate: string;
  category?: string;
};

export type Artisan = {
  id: string;
  name: string;
  trade: string;
  location: string;
  rating: number;
  hourlyRate: number;
  avatar: string;
  bio: string;
  portfolio: PortfolioItem[];
  availability: "available" | "busy" | "unavailable";
};

export type FilterParams = {
  search?: string;
  trade?: string;
  location?: string;
  minRating?: number;
  availability?: Artisan["availability"];
};

export type SortOption = "rating" | "hourlyRate" | "name";
export type SortDirection = "asc" | "desc";

export type ServiceRequest = {
  artisanId: string;
  artisanName: string;
  serviceType: string;
  preferredDate: string;
  description: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
};

export type ServiceRequestFormData = Omit<
  ServiceRequest,
  "artisanId" | "artisanName"
>;

export type RequestsByDay = {
  date: string;
  count: number;
};

export type RequestsByTrade = {
  trade: string;
  count: number;
};

export type RequestsByLocation = {
  location: string;
  count: number;
};

export type AnalyticsData = {
  requestsByDay: RequestsByDay[];
  requestsByTrade: RequestsByTrade[];
  requestsByLocation: RequestsByLocation[];
  totalRequests: number;
  activeArtisans: number;
  averageRating: number;
  totalRevenue: number;
};

// UI state types
export type LoadingState = "idle" | "loading" | "success" | "error";

export type ToastType = "success" | "error" | "info" | "warning";

export type Toast = {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
};

export type PaginationState = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
};

export type ApiResponse<T> = {
  data: T;
  error?: string;
};

export type ApiError = {
  message: string;
  code?: string;
};

export type StoredFilters = {
  search: string;
  trade: string;
  location: string;
  minRating: number;
  availability: string;
  lastUpdated: string;
};

export type ArtisanRouteParams = {
  id: string;
};

export type ArtisanCardProps = {
  artisan: Artisan;
  onClick?: (artisan: Artisan) => void;
};

export type FilterPanelProps = {
  filters: FilterParams;
  onFilterChange: (filters: FilterParams) => void;
  trades: string[];
  locations: string[];
};

export type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;
