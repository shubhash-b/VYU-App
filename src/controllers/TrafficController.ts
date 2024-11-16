import { Request, Response } from 'express';
import mongoose, { Schema, Document } from 'mongoose';

// Defining the ITraffic interface
interface ITraffic extends Document {
  timestamp: Date;
  car: number;
  bike: number;
  bus: number;
  human: number;
  truck: number;
}

// Mongoose Schema creation for Traffic Data
const TrafficSchema: Schema = new Schema({
  timestamp: { type: Date, default: Date.now },
  car: { type: Number, required: true },
  bike: { type: Number, required: true },
  bus: { type: Number, required: true },
  human: { type: Number, required: true },
  truck: { type: Number, required: true },
});

const Traffic = mongoose.model<ITraffic>('Traffic', TrafficSchema);

// Controller to get all traffic data from the DB
export const getAllTrafficData = async (req: Request, res: Response) => {
  try {
    const allTrafficData = await Traffic.find({});
    res.status(200).json(allTrafficData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all traffic data', error });
  }
};

// Controller to get total traffic count (sum of all vehicles and humans)
export const getTotalTrafficCount = async (req: Request, res: Response) => {
  try {
    const totalCount = await Traffic.aggregate([
      {
        $group: {
          _id: null,
          totalCar: { $sum: '$car' },
          totalBike: { $sum: '$bike' },
          totalBus: { $sum: '$bus' },
          totalHuman: { $sum: '$human' },
          totalTruck: { $sum: '$truck' },
        },
      },
    ]);
    res.status(200).json(totalCount[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching total traffic count', error });
  }
};

// Controller to get recent traffic count based on the given number of days
export const getRecentTrafficCount = async (req: Request, res: Response) => {
  try {
    const recentDays = parseInt(req.query.days as string, 10) || 7; 
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - recentDays);

    const trafficData = await Traffic.aggregate([
      {
        $match: { timestamp: { $gte: startDate } },
      },
      {
        $group: {
          _id: null,
          totalCar: { $sum: '$car' },
          totalBike: { $sum: '$bike' },
          totalBus: { $sum: '$bus' },
          totalHuman: { $sum: '$human' },
          totalTruck: { $sum: '$truck' },
        },
      },
    ]);

    res.status(200).json(trafficData[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recent traffic count', error });
  }
};

// Controller to get filtered traffic count based on a specific vehicle type
export const getFilteredTrafficCount = async (req: Request, res: Response) => {
  try {
    const filter: { [key: string]: number } = {};

    if (req.query.car) {
      filter['car'] = parseInt(req.query.car as string, 10);
    }

    if (req.query.bike) {
      filter['bike'] = parseInt(req.query.bike as string, 10);
    }

    if (req.query.bus) {
      filter['bus'] = parseInt(req.query.bus as string, 10);
    }

    if (req.query.truck) {
      filter['truck'] = parseInt(req.query.truck as string, 10);
    }

    if (req.query.human) {
      filter['human'] = parseInt(req.query.human as string, 10);
    }

    const filteredTrafficData = await Traffic.find(filter);
    res.status(200).json(filteredTrafficData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching filtered traffic count', error });
  }
};

// Controller to get traffic data within a timestamp range
export const getTrafficByTimestampRange = async (req: Request, res: Response) => {
  try {
    const startTimestamp = new Date(req.query.start as string);
    const endTimestamp = new Date(req.query.end as string);

    const trafficDataInRange = await Traffic.find({
      timestamp: { $gte: startTimestamp, $lte: endTimestamp },
    });

    res.status(200).json(trafficDataInRange);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching traffic data by timestamp range', error });
  }
};







