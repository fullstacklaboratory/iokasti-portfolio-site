module.exports = {
  apps: [
    {
      name: "iokasti-backend",
      cwd: "./iokasti-backend",
      script: "npm",
      args: "start",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: "iokasti-frontend",
      cwd: "./iokasti-client",
      script: "npm",
      args: "start",
      instances: "max",
      exec_mode: "cluster",
    },
  ],
};
