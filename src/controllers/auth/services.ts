import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { HydratedUserDocument } from "../../models/User";
import { OperationalError } from "../../utils/helper/errorInstances";

export const login = async ({ email, password }) => {
  const findUser = await User.findOne({ email }).lean().exec();

  if (!findUser) throw new OperationalError(404, "User not found");

  const comparePassword = await bcrypt.compare(password, findUser.password);

  if (!comparePassword) {
    throw new OperationalError(404, "Email or password is invalid");
  }

  const userObj = {
    _id: findUser._id,
    username: findUser.username,
    email: findUser.email,
    roles: findUser.roles,
    isActive: findUser.isActive,
  };

  const accessToken = jwt.sign(
    { user: userObj },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  const refreshToken = jwt.sign(
    { user: userObj },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  return { accessToken, refreshToken };
};

export const refresh = async ({
  refreshToken,
}): Promise<{ accessToken: string }> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async function (err: Error, decoded: HydratedUserDocument) {
        if (err) {
          reject(new OperationalError(403, err.message));
          return;
        }

        const user = await User.findOne({
          _id: decoded._id,
        })
          .lean()
          .exec();

        if (!user) {
          reject(new OperationalError(404, "Unauthorized"));
          return;
        }

        const userObj = {
          _id: user._id,
          username: user.username,
          email: user.email,
          roles: user.roles,
          isActive: user.isActive,
        };
        const accessToken = jwt.sign(
          { user: userObj },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1d" }
        );
        resolve({ accessToken });
      }
    );
  });
};
