const { User } = require('../../db/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    signin: async (req, res, next) => {
        try{
            const {email, password} = req.body;
            const checkUser = await User.findOne({where: {email: email} });

            if (checkUser){
                const checkPassword = bcrypt.compareSync(password, checkUser.password);

                if (checkPassword){
                    const token = jwt.sign({
                        user : {
                            id: checkUser.id,
                            email: checkUser.email,
                            name : checkUser.name,
                        },
                    },'secret');
                    res.status(200).json({message: 'Sukses Login', data: token});
                } else {
                    res.status(403).json({message: 'Password Salah'});
                }
            } else {
                res.status(403).json({message: 'Email Salah'});
            }
        } catch (err) {
            console.log(err);
            next(err);
        }
    },

    signup: async (req, res, next) => {
        try {
            const {name, email, password, confirmPassword} = req.body;

            if (password !== confirmPassword) {
                res.status(403).json({message: 'Password dan Confirm Password tidak sama'});
            }

            const checkEmail = await User.findOne({where: {email: email}});

            if (checkEmail) {
                return res.status(403).json({message: 'Email sudah terdaftar'});
            }

            const user = await User.create({name , email, password: bcrypt.hashSync(password, 10), role: 'admin'});

            delete user.dataValues.password;

            res.status(201).json({message: 'Sukses Registrasi', data: user});
            
        } catch (error) {
            next(error);
        }
    },
};