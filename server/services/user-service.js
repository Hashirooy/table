const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");
const RoleService = require("./role-service");
const mongoose = require("mongoose");

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest("User already exists");
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const clientRole = await RoleService.getRoleByName("CLIENT");
    const user = await UserModel.create({ email, password: hashPassword,roles: clientRole ? [clientRole._id] : [] });
    if (clientRole) {
      await RoleService.assignDefaultRole(user._id);
    }
    const userDto = new UserDto(user);
    const tokens = await tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("User not found");
    }
    if (!user.password) {
      throw ApiError.BadRequest("This account has no password — use registration");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw ApiError.BadRequest("Invalid password");
    }
    const userDto = new UserDto(user);
    const tokens = await tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = await tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async addRoleToUser(userId, roleName) {
    const roleId = await RoleService.getRoleIdByName(roleName);
    if (!roleId) {
      throw ApiError.BadRequest(`Role ${roleName} not found`);
    }

    // $addToSet добавляет только если еще нет
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $addToSet: { roles: roleId } },
      { new: true }
    ).populate("roles");

    return user;
  }

  // Удалить роль у пользователя
  async removeRoleFromUser(userId, roleName) {
    const roleId = await RoleService.getRoleIdByName(roleName);
    if (!roleId) {
      throw ApiError.BadRequest(`Role ${roleName} not found`);
    }

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { roles: roleId } },
      { new: true }
    ).populate("roles");

    return user;
  }

  async getUsers(search) {
    const users = await UserModel.find({ email: { $regex: search, $options: "i" } });
    return users;
  }

  async getUserList(email) {
    const users = await UserModel.find({ email: { $regex: email, $options: "i" } });
    const usersDto = users.map((user) => new UserDto(user));
    return usersDto;
  }

  async getUserRecords() {
    return UserModel.find().sort({ date: -1 });
  }

  async getUserRecordById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw ApiError.BadRequest("Invalid id");
    }
    const doc = await UserModel.findById(id);
    if (!doc) throw ApiError.NotFound("User not found");
    return doc;
  }

  async createUserRecord(payload) {
    const { password: _p, roles: _roles, ...rest } = payload;
    const candidate = await UserModel.findOne({ email: rest.email });
    if (candidate) {
      throw ApiError.BadRequest("User with this email already exists");
    }
    return UserModel.create({ ...rest, roles: [] });
  }

  async updateUserRecord(id, payload) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw ApiError.BadRequest("Invalid id");
    }
    const { password: _p, roles: _roles, ...safe } = payload;
    const doc = await UserModel.findByIdAndUpdate(id, safe, {
      new: true,
      runValidators: true,
    });
    if (!doc) throw ApiError.NotFound("User not found");
    return doc;
  }

  async deleteUserRecord(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw ApiError.BadRequest("Invalid id");
    }
    const doc = await UserModel.findByIdAndDelete(id);
    if (!doc) throw ApiError.NotFound("User not found");
    return doc;
  }
}

module.exports = new UserService();
