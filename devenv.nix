# Debenv configuration
# See full reference at https://devenv.sh/reference/options/

{
  pkgs,
  config,
  lib,
  ...
}:
{
  cachix.enable = false;

  packages = with pkgs; [
    docker
    nixd
    nixfmt-rfc-style
  ];

  devcontainer = {
    enable = true;
    settings = {
      image = "ghcr.io/cachix/devenv:v1.4";
      updateContentCommand = "devenv test -v";

      containerEnv = {
        COREPACK_ENABLE_DOWNLOAD_PROMPT = "0";
      };

      customizations.vscode.extensions = [
        "biomejs.biome"
        "editorconfig.editorconfig"
        "github.vscode-github-actions"
        "redhat.vscode-yaml"
        "pinage404.nix-extension-pack"
        "bradlc.vscode-tailwindcss"
      ];
    };
  };

  dotenv = {
    enable = true;
    filename = [
      ".env.development.local"
      ".env.local"
    ];
  };

  languages.javascript = {
    enable = true;
    package = pkgs.nodejs-slim_24;
    corepack.enable = true;
  };

  services = {
    mysql = {
      enable = true;
      settings.mysqld = {
        port = lib.toInt config.env.DB_PORT;
        bind_address = "127.0.0.1";
      };

      initialDatabases = [ { name = config.env.DB_NAME; } ];

      ensureUsers = [
        {
          name = config.env.DB_USER;
          password = config.env.DB_PASSWORD;
          ensurePermissions = {
            "${config.env.DB_NAME}.*" = "ALL PRIVILEGES";
          };
        }
      ];
    };

    caddy = {
      enable = true;
      email = config.env.DEVENV_CADDY_EMAIL;
      virtualHosts."eri.localhost" = {
        serverAliases = [ "www.eri.localhost" ];
        extraConfig = ''
          reverse_proxy localhost:3000
        '';
      };
    };
  };

  processes = {
    server = {
      exec = "pnpm dev";
      process-compose = {
        depends_on.mysql.condition = "process_healthy";
        availability = {
          restart = "on_failure";
          max_restarts = 10;
        };
        readiness_probe = {
          exec.command = "curl -sf http://localhost:3000/health";
          initial_delay_seconds = 2;
          period_seconds = 10;
          success_threshold = 1;
          failure_threshold = 5;
        };
      };
    };

    mysql.process-compose.readiness_probe = {
      exec.command = "${config.services.mysql.package}/bin/mysqladmin ping -u root";
      initial_delay_seconds = 2;
      period_seconds = 10;
      success_threshold = 1;
      failure_threshold = 5;
    };

    caddy.process-compose.depends_on.server.condition = "process_healthy";
  };

  tasks = {
    "pnpm:install" = {
      exec = "pnpm install --frozen-lockfile";
      before = [ "devenv:enterShell" ];
    };

    "db:migrations:up" = {
      exec = "pnpm mikro-orm-esm migration:up";
      before = [ "devenv:processes:server" ];
    };
  };

  enterTest = "
    wait_for_port 3000
    curl -sf http://localhost:3000/health
  ";
}
