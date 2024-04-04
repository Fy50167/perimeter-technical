import mongoose from 'mongoose';

const polygonSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    coordinates: {
        type: Array,
    },
});

const Polygon =
    mongoose.models.Polygon || mongoose.model('Polygon', polygonSchema);

export default Polygon;
