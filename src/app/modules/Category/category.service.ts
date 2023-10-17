import { Category } from '@prisma/client';
import prisma from '../../shared/prisma';

const createCategory = async (data: Category, token: string) => {
  if (!token) {
    throw new Error('Token is required');
  }

  const result = await prisma.category.create({
    data,
  });
  return result;
};
const getCategories = async (): Promise<Category[] | null> => {
  const result = await prisma.category.findMany({});
  return result;
};
const getSingleCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: { id },
    include: { Service: true },
  });
  return result;
};
const updateCategory = async (
  id: string,
  payload: Partial<Category>,
): Promise<Partial<Category>> => {
  const result = await prisma.category.update({
    where: { id },
    data: payload,
  });
  return result;
};
const deleteCategory = async (id: string) => {
  await prisma.service.deleteMany({
    where: {
      categoryId: id,
    },
  });
  const result = await prisma.category.delete({
    where: { id },
  });

  return result;
};
export const categoryService = {
  createCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
