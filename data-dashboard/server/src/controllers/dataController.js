import { PrismaClient } from "@prisma/client";
import {
  filterQuerySchema,
  featureQuerySchema,
} from "../schemas/filterSchemas.js";

const prisma = new PrismaClient();

export const totalTimeSpent = async (req, res) => {
  const parsedData = filterQuerySchema.safeParse(req.query);
  if (!parsedData.success) {
    return res.status(400).json({ errors: parsedData.error.issues });
  }

  const { age, gender, startDate, endDate } = parsedData.data;

  try {
    const result = await prisma.data.aggregate({
      _sum: { a: true, b: true, c: true, d: true, e: true, f: true },
      where: {
        day: { gte: new Date(startDate), lte: new Date(endDate) },
        age,
        gender,
      },
    });

    res.status(200).json({ totalTimeSpent: result._sum });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving data", error });
  }
};

export const featureTimeTrend = async (req, res) => {
  const parsedData = featureQuerySchema.safeParse(req.query);
  if (!parsedData.success) {
    return res.status(400).json({ errors: parsedData.error.issues });
  }

  const { age, gender, startDate, endDate, feature } = parsedData.data;

  try {
    const result = await prisma.data.groupBy({
      by: ["day"],
      _sum: { [feature]: true },
      where: {
        day: { gte: new Date(startDate), lte: new Date(endDate) },
        age,
        gender,
      },
      orderBy: { day: "asc" },
    });

    res
      .status(200)
      .json(
        result.map((r) => ({
          day: r.day,
          total_time_spent: r._sum[feature] || 0,
        }))
      );
  } catch (error) {
    res.status(500).json({ message: "Error retrieving data", error });
  }
};
