import mongoose, { Schema, Document } from 'mongoose';

interface IWidget extends Document {
  widgetID: string;
  dataSource: string;
  userSelections: any;
}

const widgetSchema = new Schema<IWidget>({
  widgetID: { type: String, required: true, unique: true },
  dataSource: { type: String, required: true },
  userSelections: { type: Schema.Types.Mixed, required: true },
});

const Widget = mongoose.model<IWidget>('Widget', widgetSchema);

export default Widget;