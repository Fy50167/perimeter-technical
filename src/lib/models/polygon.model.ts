import mongoose from 'mongoose';

const polygonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    coordinates: {
        type: Array,
        required: true,
    },
});

const Polygon =
    mongoose.models.Polygon || mongoose.model('Polygon', polygonSchema);

export default Polygon;
