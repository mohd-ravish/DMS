const userService = require('../services/userService');
const authService = require('../services/authService');

exports.fetchUsers = async (req, res) => {
    try {
        const users = await userService.fetchUsers();
        return res.status(200).json({ status: 'success', data: users });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

exports.changeUserRole = async (req, res) => {
    const { userId, newRoleId } = req.body;
    try {
        await userService.changeUserRole(userId, newRoleId);
        await authService.logActivity(req.id, `User: ${req.email} changed the role of user with [ID: ${userId}]`);
        return res.status(200).json({ status: 'success', message: 'User role updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Failed to change role' });
    }
};

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        await userService.deleteUser(userId);
        await authService.logActivity(req.id, `User: ${req.email} deleted the account of user with [ID: ${userId}]`);
        return res.status(200).json({ status: 'success', message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Failed to delete user' });
    }
};

exports.getControlAccessInfo = async (req, res) => {
    const userId = req.id;
    try {
        const results = await userService.getControlAccessInfo();
        if (results[0].has_access.includes(userId)) {
            return res.status(200).json({ status: 'success', data: 'yes' });
        }
        return res.status(200).json({ status: 'success', data: 'no' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Database query error' });
    }
};

exports.fetchControlAccessUsers = async (req, res) => {
    try {
        const users = await userService.fetchControlAccessUsers();
        return res.status(200).json({ status: 'success', data: users });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

exports.updateUserControlAccess = async (req, res) => {
    const userId = req.params.id;
    try {
        const results = await userService.getControlAccessInfo();
        let hasAccess = results[0].has_access ? results[0].has_access.split(',') : [];

        if (hasAccess.includes(userId)) {
            hasAccess = hasAccess.filter(id => id !== userId); // Remove the userId from hasAccess array
        } else {
            hasAccess.push(userId); // Add the userId to hasAccess array
        }
        const newHasAccess = hasAccess.join(',');
        await userService.updateUserControlAccess(newHasAccess);
        await authService.logActivity(req.id, `User: ${req.email} updated access control of user with [ID: ${userId}]`);

        return res.json({ status: 'success', message: 'User access updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

exports.fetchUserActivity = async (req, res) => {
    const { userId, period } = req.body;
    try {
        const results = await userService.fetchUserActivity(userId, period);
        await authService.logActivity(req.id, `User: ${req.email} searched for activities [by user: ${userId}] in last ${period} days`);
        return res.status(200).json({ status: 'success', data: results });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Database query error' });
    }
};