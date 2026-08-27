import base from "./app.json";

export default ({ config }) => {
  const profile = process.env.EAS_BUILD_PROFILE;

  // Start with the base config from app.json
  config = {
    ...base.expo,
  };

  // Development build overrides
  if (profile === "development") {
    config.name = "PowerLog Dev";
    config.slug = "powerlog-dev";

    config.android = {
      ...config.android,
      package: "com.miguel.powerlog.dev"
    };
  }

  // Production build overrides
  if (profile === "production") {
    config.name = "PowerLog";
    config.slug = "PowerLog";

    config.android = {
      ...config.android,
      package: "com.miguel.powerlog"
    };
  }

  return config;
};
