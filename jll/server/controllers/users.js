const User = require('../models/users')
exports.signup = (req, res) => {
    User.findOne({ email: req.body.email})
        .exec((error, user) => {
            if (user)
                return res.status(400).json({ message: 'User already existed.'});
            const {
                firstName,
                lastName,
                email,
                password
            } = req.body;
            const new_user = new User({
                firstName,
                lastName,
                email,
                password,
                username: Math.random().toString()
            });
            new_user.save((error, data) => {
                if (error) {
                    return res.status(400).json({ message: 'Error creating new User.'});
                }
                if (data) {
                    return res.status(201).json({ message: 'User created successfully.' });
                }
            });
        })

}

exports.login = (req, res) => {
    User.findOne({ email: req.body.email})
        .exec((error, user) => {
            if (error) {
                return res.status(400).json({error});
            }
            if (user) {
                if (user.authenticate(req.body.password)) {
                    const {_id, firstName, lastName, fullName, email, role} = user;
                    return res.status(200).json({ user: {_id, firstName, lastName, fullName, email, role}})
                }                
                else {
                    return res.status(400).json({ message: 'Invalid password.'});
                }
            }
            else {
                return res.status(400).json({ message: 'Invalid e-mail.'});
            }
        })
}