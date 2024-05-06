module.exports = {
  apps: [
    {
      name: "iokasti-backend",
      cwd: "/home/mrcll/websites/iokasti/iokasti-backend",
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
      cwd: "/home/mrcll/websites/iokasti/iokasti-client",
      script: "npm",
      args: "start",
      instances: "max",
      exec_mode: "cluster",
    },
  ],
  
};
