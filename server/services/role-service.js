const RoleModel = require("../models/role-model");
const UserModel = require("../models/user-model");

class RoleService {
  async initializeRoles() {
    const roles = [
      { name: "CLIENT", description: "Обычный пользователь" },
      { name: "ADMIN", description: "Администратор" },
      { name: "MODERATOR", description: "Модератор" },
    ];

    for (const role of roles) {
      await RoleModel.findOneAndUpdate({ name: role.name }, role, {
        upsert: true,
        new: true,
      });
    }
  }

  async getRoleByName(name) {
    return await RoleModel.findOne({ name });
  }

  async assignDefaultRole(userId) {
    const clientRole = await this.getRoleByName("CLIENT");
    if (clientRole) {
      await UserModel.findByIdAndUpdate(userId, {
        $addToSet: { roles: clientRole._id },
      });
    }
  }
}

module.exports = new RoleService();
