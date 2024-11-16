import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Widget from '../models/Widget';

// Create a new widget
export const createWidget = async (req: Request, res: Response) => {
  const { dataSource, userSelections } = req.body;

  try {
    const widgetID = uuidv4();
    const newWidget = new Widget({ widgetID, dataSource, userSelections });
    await newWidget.save();

    res.status(201).json({ message: 'Widget created successfully', widgetID });
  } catch (error) {
    res.status(500).json({ message: 'Error creating widget', error });
  }
};

// Fetch all widgets
export const getWidgets = async (req: Request, res: Response) => {
  try {
    const widgets = await Widget.find();
    res.status(200).json(widgets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching widgets', error });
  }
};
