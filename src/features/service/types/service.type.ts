export type ServiceCategoryResponse = {
  id: string;
  name: string;
  icon?: string;
};

export type ServiceResponse = {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  basePrice: number;
  unit: string;
  status: string;
  displayAs?: string;
  category: ServiceCategoryResponse;
};

export type ServiceStatsResponse = {
  total: number;
  active: number;
  inactive: number;
  revenue: number;
};
export type AdminServiceFilter = {
  search?: string;
  categoryId?: string;
  status?: string;
  pageNum?: number;
  pageSize?: number;
};
