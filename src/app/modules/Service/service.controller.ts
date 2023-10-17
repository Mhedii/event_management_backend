import { Request, Response } from 'express';
import { ServiceService } from './service.service';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponses';
import httpStatus from 'http-status';

const createService = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await ServiceService.createService(data);
    res.status(200).json({
      status: 200,
      message: 'Service Created Successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: error,
      message: 'Something went wrong',
      error,
    });
  }
};
const getServices = catchAsync(async (req: Request, res: Response) => {
  const {
    page = 1,
    size = 10,
    sortBy = 'price',
    sortOrder = 'asc',
    searchTerm = '',
    minPrice = 0,
    maxPrice = 50000,
    ...filtersData
  } = req.query;
  const result = await ServiceService.getServices(
    Number(page),
    Number(size),
    sortBy as string,
    sortOrder as 'asc' | 'desc',
    searchTerm as string,
    Number(minPrice),
    Number(maxPrice),
    filtersData as Record<string, unknown>,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services fetched successfully',
    meta: result.meta,
    data: result.result,
  });
});
const getSingleService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceService.getSingleService(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services fetched successfully',
    data: result,
  });
});
const getServiceByCategory = catchAsync(async (req: Request, res: Response) => {
  const { page = 1, size = 10 } = req.query;
  const { categoryId } = req.params;
  const result = await ServiceService.getServiceByCategory(
    categoryId,
    Number(page),
    Number(size),
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services with associated category data fetched successfully',
    meta: result.meta,
    data: result.result,
  });
});
const updateService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const { ...data } = req.body;
  const result = await ServiceService.updateService(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service updated successfully',
    data: result,
  });
});
const deleteService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ServiceService.deleteService(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service is deleted successfully',
    data: result,
  });
});

export const serviceController = {
  createService,
  getServices,
  getSingleService,
  updateService,
  deleteService,
  getServiceByCategory,
};
