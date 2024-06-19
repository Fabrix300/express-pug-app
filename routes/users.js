import express from "express";

const router = express.Router();

router.use(usersLogger);

const USERS = [{ name: "Kyle" }, { name: "Sally" }];

router.get("/", (req, res) => {
  const userName = req.query.name;
  if (userName) {
    res.send(`User Name: ${userName}`);
  } else {
    res.send("User List");
  }
});

router.post("/", (req, res) => {
  const firstName = req.body.firstName;
  if (!firstName || firstName.length < 2) {
    console.log("Error");
    res.render("users/new", { firstName: firstName, error: "Name error" });
  }
  USERS.push({ name: firstName });
  res.redirect(`users/${USERS.length - 1}`);
});

router.get("/new", (req, res) => {
  res.render("users/new", { firstName: "Charles" });
});

router
  .route("/:userId")
  .get((req, res) => {
    console.log(req.user);
    const userId = req.params.userId;
    res.send(`Get user with id ${userId}`);
  })
  .put((req, res) => {
    const userId = req.params.userId;
    res.send(`Update user with id ${userId}`);
  })
  .delete((req, res) => {
    const userId = req.params.userId;
    res.send(`Delete user with id ${userId}`);
  });

// Param middleware executes before the route("/:userId") path and all its methods
router.param("userId", (req, res, next, id) => {
  req.user = USERS[id];
  next();
});

function usersLogger(req, res, next) {
  console.log("Users logger", req.originalUrl);
  next();
}

export default router;
