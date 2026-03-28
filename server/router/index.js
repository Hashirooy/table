const { Router } = require("express");
const { body } = require("express-validator");

const router = Router();

const userController = require("../controllers/user-controller");
const orderController = require("../controllers/order-controller");
const taskController = require("../controllers/task-controller");
const authMiddleware = require("../middleware/auth-middleware");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.registration,
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/auth/users", authMiddleware, userController.getUsers);
router.get("/userList", userController.getUserList);

/** Сущности users / orders / tasks (CRUD без авторизации) — users через общий User */
router.get("/users", userController.listUsersResource);
router.get("/users/:id", userController.getUserResourceById);
router.post("/users", userController.createUserResource);
router.put("/users/:id", userController.updateUserResource);
router.delete("/users/:id", userController.deleteUserResource);

router.get("/orders", orderController.list);
router.get("/orders/:id", orderController.getOne);
router.post("/orders", orderController.create);
router.put("/orders/:id", orderController.update);
router.delete("/orders/:id", orderController.remove);

router.get("/tasks", taskController.list);
router.get("/tasks/:id", taskController.getOne);
router.post("/tasks", taskController.create);
router.put("/tasks/:id", taskController.update);
router.delete("/tasks/:id", taskController.remove);

module.exports = router;
