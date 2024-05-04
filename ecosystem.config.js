module.exports = {
    apps : [{
      name: "iokasti-backend",
      script: "npm",
      args: "start",
      cwd: "~/websites/iokasti/iokasti-backend",
      instances: "max",
      exec_mode: "cluster"
    }, {
      name: "iokasti-frontend",
      script: "npm",
      args: "start",
      cwd: "~/websites/iokasti/iokasti-client",
      instances: "max",
      exec_mode: "cluster"
    }]
  }