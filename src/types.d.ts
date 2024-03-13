export interface Query {
  price?: { $gte: number } | { $lte: number };
  name?: { $regex: string; $options: 'i' };
  brand?: { $regex: string; $options: 'i' };
  category?: { $regex: string; $options: 'i' };
  isActive?: boolean;
}
