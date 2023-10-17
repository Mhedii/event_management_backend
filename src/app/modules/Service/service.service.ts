import { Service } from '@prisma/client';
import prisma from '../../shared/prisma';

const createService = async (data: Service): Promise<Service> => {
  const result = await prisma.service.create({
    data,
    include: { category: true },
  });
  return result;
};
const getServices = async (
  page: number,
  size: number,
  sortBy: string,
  sortOrder: 'asc' | 'desc',
  searchTerm: string,
  minPrice: number,
  maxPrice: number,
  filtersData: Record<string, unknown>,
): Promise<Service[] | any> => {
  const result = await prisma.service.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              title: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          ],
        },
        {
          categoryId: {
            equals: filtersData.category as string,
            mode: 'insensitive',
          },
        },
        {
          price: {
            gte: minPrice,
            lte: maxPrice,
          },
        },
      ],
    },

    take: size,
    skip: (page - 1) * size,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  const total = await prisma.service.count();

  const totalPage = await (Math.floor(total / size) | 1);
  return {
    meta: {
      page,
      size,
      total,
      totalPage,
    },
    result,
  };
};
const getSingleService = async (id: string): Promise<Service | null> => {
  const result = await prisma.service.findUnique({
    where: { id },
  });

  return result;
};
const getServiceByCategory = async (
  id: string,
  page: number,
  size: number,
): Promise<Service[] | any> => {
  const result = await prisma.service.findMany({
    where: {
      categoryId: id,
    },
    take: size,
    skip: (page - 1) * size,
  });

  const total = await prisma.service.count({
    where: {
      categoryId: id,
    },
  });

  const totalPage = await (Math.floor(total / size) | 1);

  return {
    meta: {
      page,
      size,
      total,
      totalPage,
    },
    result,
  };
};
const updateService = async (
  id: string,
  payload: Partial<Service>,
): Promise<Partial<Service>> => {
  const result = await prisma.service.update({
    where: { id },
    data: payload,
  });
  return result;
};
const deleteService = async (id: string) => {
  const result = await prisma.service.delete({
    where: { id },
  });
  return result;
};
export const ServiceService = {
  createService,
  getServices,
  getSingleService,
  updateService,
  deleteService,
  getServiceByCategory,
};
