export type ServiceCategoryResponse = {
  id: string;
  name: string;
  icon: string;
};

export type ServiceResponse = {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  basePrice: number;
  unit: string;
  category: ServiceCategoryResponse;
};
