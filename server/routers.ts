import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { 
  getGalleryImages, 
  addGalleryImage, 
  updateGalleryImage, 
  deleteGalleryImage,
  getAllCustomers,
  getCustomerByCardNumber,
  addCustomer,
  updateCustomer,
  getOrderByCardNumber,
  getAllOrders,
  addOrder,
  updateOrderStatus,
  getBusinessInfo,
  updateBusinessInfo,
  initializeBusinessInfo
} from "./db";


// Helper function to generate unique card number
function generateCardNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `TAJ-${timestamp}-${random}`;
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Gallery procedures
  gallery: router({
    list: publicProcedure.query(async () => {
      return await getGalleryImages();
    }),

    add: protectedProcedure
      .input(z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        imageUrl: z.string().url(),
        imageKey: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Only admins can add gallery images');
        }
        return await addGalleryImage(input);
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string().url().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Only admins can update gallery images');
        }
        const { id, ...data } = input;
        return await updateGalleryImage(id, data);
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Only admins can delete gallery images');
        }
        return await deleteGalleryImage(input.id);
      }),
  }),

  // Customer procedures
  customers: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== 'admin') {
        throw new Error('Only admins can view customers');
      }
      return await getAllCustomers();
    }),

    getByCardNumber: publicProcedure
      .input(z.object({ cardNumber: z.string() }))
      .query(async ({ input }) => {
        return await getCustomerByCardNumber(input.cardNumber);
      }),

    create: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        phone: z.string().min(1),
        email: z.string().email(),
        preferredVisitDate: z.date().optional(),
        preferredVisitTime: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const cardNumber = generateCardNumber();
        const result = await addCustomer({
          ...input,
          cardNumber,
        });
        return { cardNumber, ...input };
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().email().optional(),
        preferredVisitDate: z.date().optional(),
        preferredVisitTime: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Only admins can update customers');
        }
        const { id, ...data } = input;
        return await updateCustomer(id, data);
      }),
  }),

  // Order procedures
  orders: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== 'admin') {
        throw new Error('Only admins can view orders');
      }
      return await getAllOrders();
    }),

    getByCardNumber: publicProcedure
      .input(z.object({ cardNumber: z.string() }))
      .query(async ({ input }) => {
        return await getOrderByCardNumber(input.cardNumber);
      }),

    create: protectedProcedure
      .input(z.object({
        cardNumber: z.string(),
        customerId: z.number(),
        description: z.string().optional(),
        estimatedDeliveryDate: z.date().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Only admins can create orders');
        }
        return await addOrder({
          ...input,
          status: 'Pending',
        });
      }),

    updateStatus: protectedProcedure
      .input(z.object({
        cardNumber: z.string(),
        status: z.enum(['Pending', 'In Progress', 'Ready']),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Only admins can update order status');
        }
        return await updateOrderStatus(input.cardNumber, input.status);
      }),
  }),

  // Business info procedures
  businessInfo: router({
    get: publicProcedure.query(async () => {
      let info = await getBusinessInfo();
      if (!info) {
        await initializeBusinessInfo();
        info = await getBusinessInfo();
      }
      return info;
    }),

    update: protectedProcedure
      .input(z.object({
        shopName: z.string().optional(),
        shopPhone: z.string().optional(),
        shopEmail: z.string().email().optional(),
        shopAddress: z.string().optional(),
        shopCity: z.string().optional(),
        shopCountry: z.string().optional(),
        latitude: z.string().optional(),
        longitude: z.string().optional(),
        openingHours: z.string().optional(),
        socialLinks: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Only admins can update business info');
        }
        const info = await getBusinessInfo();
        if (!info) {
          throw new Error('Business info not found');
        }
        return await updateBusinessInfo(info.id, input);
      }),
  }),
});

export type AppRouter = typeof appRouter;
