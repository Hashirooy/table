const userService = require("../services/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const RoleService = require("../services/role-service");
const { serializeUser, serializeUsers } = require("../utils/serialize-doc");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      res.json(["345", "345", "345"]);
    } catch (error) {
      next(error);
    }
  }

  async activate(req, res, next) {
    try {
      // TODO: Implement activation logic
      res.json({ message: "Activation endpoint - not implemented yet" });
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      // TODO: Implement token refresh logic
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async removeRole(req, res, next) {
    try {
      const { userId, roleName } = req.body;
      
      const user = await UserService.removeRoleFromUser(userId, roleName);
      
      return res.json({ user });
    } catch (error) {
      next(error);
    }
  }

  // Получить все доступные роли
  async getRoles(req, res, next) {
    try {
      const roles = await RoleService.getAllRoles();
      return res.json({ roles });
    } catch (error) {
      next(error);
    }
  }

  async getUserList(req, res, next) {
    try {
      const { email } = req.query;
      const userList = await userService.getUserList(email);
      return res.json(userList);
    } catch (error) {
      next(error);
    }
  }

  async listUsersResource(req, res, next) {
    try {
      const rows = await userService.getUserRecords();
      return res.json(serializeUsers(rows));
    } catch (error) {
      next(error);
    }
  }

  async getUserResourceById(req, res, next) {
    try {
      const row = await userService.getUserRecordById(req.params.id);
      return res.json(serializeUser(row));
    } catch (error) {
      next(error);
    }
  }

  async createUserResource(req, res, next) {
    try {
      const row = await userService.createUserRecord(req.body);
      return res.status(201).json(serializeUser(row));
    } catch (error) {
      next(error);
    }
  }

  async updateUserResource(req, res, next) {
    try {
      const row = await userService.updateUserRecord(req.params.id, req.body);
      return res.json(serializeUser(row));
    } catch (error) {
      next(error);
    }
  }

  async deleteUserResource(req, res, next) {
    try {
      const row = await userService.deleteUserRecord(req.params.id);
      return res.json(serializeUser(row));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
