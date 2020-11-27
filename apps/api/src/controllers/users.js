/* eslint-disable no-else-return */
/* eslint-disable no-negated-condition */
/* eslint-disable object-property-newline */
/* eslint-disable no-process-env */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable require-await */
/* eslint-disable no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-requires */
/* eslint-disable global-require */
module.exports = app => {
    require('dotenv-safe').config();
    const jwt = require('jsonwebtoken');
    const { models, connectDb } = require('../../config/db'),
     controller = {};

    /* Autenticação login */
    controller.login = async (req, res) => {
        connectDb().then(async() => {
            const { email, password } = req.body,
            user = await models.User.findOne({ email, password });

            if (!user) {
                return res.status(400).send({ 'error': 'E-mail e/ou senha inválidos' });
            } else {
                const token = jwt.sign({ email }, process.env.SECRET, {
                    'expiresIn': 300
                });

                return res.json({ 'auth': true,
                token });
            }
        });
    };

    return controller;
};