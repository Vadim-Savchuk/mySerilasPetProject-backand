import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

// Register user
export const register = async (req, res) => {
    try {
        const { username, password, useremail } = req.body;

        const isUsed = await User.findOne({ useremail });

        if (isUsed) {
            return res.json({
                message: 'This user already exists'
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            avatar: 'https://img.freepik.com/free-vector/cute-shiba-inu-dog-drink-milk-tea-boba-cartoon_138676-2438.jpg?w=826&t=st=1690383708~exp=1690384308~hmac=51578c4121f2ccf7dc2cc6fb1ea3a869b3b0a03fe1c86b870bf3f4bdd17f5f83',
            username,
            useremail,
            password: hash,
        });

        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        await newUser.save();

        res.json({
            token,
            newUser,
            message: 'Registration was successful'
        });
    } catch (error) {
        res.json({
            message: 'Error creating user'
        });
    }
}

// Login user
export const login = async (req, res) => {
    try {
        const { useremail, password } = req.body;

        const user = await User.findOne({ useremail });

        if (!user) {
            res.json({
                message: 'This user already exists'
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.json({
                message: 'The password is incorrect'
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.json({
            user,
            token,
            message: 'You are authorized'
        });
    } catch (error) {
        res.json({
            message: 'An error occurred during authorization'
        });
    }
}

// Get user
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.json({
                message: 'Тhis user already exists'
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.json({
            user,
            token,
        });
    } catch (error) {
        res.json({
            message: 'An error occurred while receiving user information'
        })
    }
}

// Update user
export const updateUser = async (req, res) => {
    try {
        const { username, avatar } = req.body;

        const user = await User.findByIdAndUpdate(req.userId, {
            username: username,
            avatar: avatar,
        }, { new: true });

        if (!user) {
            return res.json({ message: 'This user already exists' });
        }

        res.json({ user })
    } catch (error) {
        res.json({
            message: 'An error occurred while trying to edit user data'
        })
    }
}
