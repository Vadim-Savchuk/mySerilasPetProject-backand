import Serial from '../models/Serial.js';
import User from '../models/User.js';

// Add serial
export const addSerial = async (req, res) => {
    try {
        const { title, season, series } = req.body;

        const newSerial = new Serial({
            title,
            series,
            season,
            watching: false,
            author: req.userId,
        });

        await newSerial.save();
        await User.findByIdAndUpdate(req.userId, {
            $push: { serials: newSerial }
        });

        return res.json({
            newSerial,
            message: 'New series successfully added'
        });
    } catch (error) {
        res.json({
            message: 'An error occurred while trying to add a new series'
        });
    }
}

// Get my serials
export const getMySerials = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        const list = await Promise.all(
            user.serials.map(serial => {
                return Serial.findById(serial._id);
            })
        );

        list.sort((a, b) => b.updatedAt - a.updatedAt);

        res.json(list);
    } catch (error) {
        res.json({
            message: 'An error occurred while receiving the list of series'
        });
    }
}

// Remove serials
export const removeSerial = async (req, res) => {
    try {
        const serial = await Serial.findByIdAndDelete(req.params.id)

        if (!serial) {
            res.json({
                message: 'An error occurred, such a series does not exist'
            });
        }

        await User.findByIdAndUpdate(req.userId, {
            $pull: { serials: req.params.id }
        });

        res.json({ message: 'The series was deleted' });
    } catch (error) {
        res.json({
            message: 'An error occurred while deleting the series'
        });
    }
}

// Edit serials
export const editSerial = async (req, res) => {
    try {
        const { title, season, series, watching, id } = req.body;

        const serial = await Serial.findById(id);

        serial.title = title
        serial.season = season
        serial.series = series
        serial.watching = watching

        await serial.save();

        res.json(serial);
    } catch (error) {
        res.json({
            message: 'An error occurred while editing the series'
        });
    }
}